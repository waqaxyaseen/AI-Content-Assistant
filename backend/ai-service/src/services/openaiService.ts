import OpenAI from 'openai';
import { logger } from '../utils/logger';

interface ContentGenerationRequest {
  type: 'blog' | 'social' | 'email' | 'ad' | 'product-description';
  prompt: string;
  tone?: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'humorous';
  length?: 'short' | 'medium' | 'long';
  keywords?: string[];
  targetAudience?: string;
  brandVoice?: string;
  context?: string;
}

interface GeneratedContent {
  content: string;
  title?: string;
  meta?: {
    description?: string;
    keywords?: string[];
    readingTime?: number;
    wordCount: number;
  };
}

class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
    try {
      const systemPrompt = this.buildSystemPrompt(request);
      const userPrompt = this.buildUserPrompt(request);

      logger.info('Generating content with OpenAI', { type: request.type, prompt: request.prompt.substring(0, 100) });

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4-1106-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: this.getMaxTokens(request.length),
      });

      const generatedText = completion.choices[0]?.message?.content;
      if (!generatedText) {
        throw new Error('No content generated');
      }

      return this.parseGeneratedContent(generatedText, request);
    } catch (error) {
      logger.error('OpenAI content generation failed:', error);
      throw new Error('Content generation failed');
    }
  }

  async generateImages(prompt: string, count: number = 1, size: '256x256' | '512x512' | '1024x1024' = '1024x1024'): Promise<string[]> {
    try {
      logger.info('Generating images with DALL-E', { prompt: prompt.substring(0, 100), count });

      const response = await this.client.images.generate({
        model: 'dall-e-3',
        prompt,
        n: Math.min(count, 4), // DALL-E 3 max is 1, DALL-E 2 max is 4
        size,
        quality: 'standard',
      });

      return response.data.map(image => image.url!);
    } catch (error) {
      logger.error('OpenAI image generation failed:', error);
      throw new Error('Image generation failed');
    }
  }

  async improveContent(content: string, instructions: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4-1106-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content editor. Improve the given content based on the provided instructions while maintaining the original intent and style.'
          },
          {
            role: 'user',
            content: `Content to improve:\n\n${content}\n\nInstructions:\n${instructions}`
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      return completion.choices[0]?.message?.content || content;
    } catch (error) {
      logger.error('Content improvement failed:', error);
      throw new Error('Content improvement failed');
    }
  }

  async generateSuggestions(content: string, type: 'improvements' | 'alternatives' | 'expansions'): Promise<string[]> {
    try {
      const systemPrompts = {
        improvements: 'Suggest specific improvements for this content to make it more engaging, clear, and effective.',
        alternatives: 'Provide alternative phrasings and approaches for this content.',
        expansions: 'Suggest ways to expand and elaborate on this content with additional points and details.'
      };

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4-1106-preview',
        messages: [
          { role: 'system', content: systemPrompts[type] + ' Provide 3-5 specific, actionable suggestions.' },
          { role: 'user', content: content }
        ],
        temperature: 0.8,
        max_tokens: 500,
      });

      const suggestions = completion.choices[0]?.message?.content || '';
      return suggestions.split('\n').filter(s => s.trim().length > 0).slice(0, 5);
    } catch (error) {
      logger.error('Suggestion generation failed:', error);
      return [];
    }
  }

  private buildSystemPrompt(request: ContentGenerationRequest): string {
    const basePrompt = `You are an expert content creator specializing in ${request.type} content. Create high-quality, engaging content that is optimized for the target platform and audience.`;

    const toneInstructions = {
      professional: 'Use a professional, authoritative tone suitable for business contexts.',
      casual: 'Use a casual, conversational tone that feels approachable and friendly.',
      friendly: 'Use a warm, friendly tone that builds connection with the audience.',
      authoritative: 'Use an authoritative, expert tone that demonstrates knowledge and credibility.',
      humorous: 'Use appropriate humor to make the content engaging and memorable.'
    };

    const lengthInstructions = {
      short: 'Keep the content concise and to the point (100-300 words).',
      medium: 'Create moderately detailed content (300-800 words).',
      long: 'Develop comprehensive, detailed content (800+ words).'
    };

    let prompt = basePrompt;

    if (request.tone) {
      prompt += `\n\n${toneInstructions[request.tone]}`;
    }

    if (request.length) {
      prompt += `\n\n${lengthInstructions[request.length]}`;
    }

    if (request.brandVoice) {
      prompt += `\n\nBrand voice guidelines: ${request.brandVoice}`;
    }

    if (request.targetAudience) {
      prompt += `\n\nTarget audience: ${request.targetAudience}`;
    }

    prompt += '\n\nFormat your response as JSON with the following structure:';
    prompt += '\n{"title": "Content Title", "content": "Main content", "meta_description": "SEO description", "keywords": ["keyword1", "keyword2"]}';

    return prompt;
  }

  private buildUserPrompt(request: ContentGenerationRequest): string {
    let prompt = `Create ${request.type} content for: ${request.prompt}`;

    if (request.keywords && request.keywords.length > 0) {
      prompt += `\n\nInclude these keywords naturally: ${request.keywords.join(', ')}`;
    }

    if (request.context) {
      prompt += `\n\nAdditional context: ${request.context}`;
    }

    return prompt;
  }

  private getMaxTokens(length?: string): number {
    switch (length) {
      case 'short': return 500;
      case 'long': return 2000;
      default: return 1000;
    }
  }

  private parseGeneratedContent(text: string, request: ContentGenerationRequest): GeneratedContent {
    try {
      const parsed = JSON.parse(text);
      const wordCount = parsed.content.split(' ').length;
      const readingTime = Math.ceil(wordCount / 200); // Assuming 200 WPM reading speed

      return {
        content: parsed.content,
        title: parsed.title,
        meta: {
          description: parsed.meta_description,
          keywords: parsed.keywords || [],
          readingTime,
          wordCount
        }
      };
    } catch (error) {
      // Fallback if JSON parsing fails
      const wordCount = text.split(' ').length;
      return {
        content: text,
        meta: {
          wordCount,
          readingTime: Math.ceil(wordCount / 200)
        }
      };
    }
  }
}

export default new OpenAIService();