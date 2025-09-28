'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AIStudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  const templates = [
    {
      id: 'blog-post',
      title: 'Blog Post',
      description: 'Create engaging blog posts with AI',
      icon: '📝',
      gradient: 'from-blue-500 to-cyan-400',
      fields: ['Title', 'Topic', 'Keywords', 'Target Audience']
    },
    {
      id: 'social-media',
      title: 'Social Media Post',
      description: 'Generate posts for all platforms',
      icon: '📱',
      gradient: 'from-purple-500 to-pink-400',
      fields: ['Platform', 'Message', 'Hashtags', 'Call to Action']
    },
    {
      id: 'email-campaign',
      title: 'Email Campaign',
      description: 'Create compelling email content',
      icon: '📧',
      gradient: 'from-green-500 to-emerald-400',
      fields: ['Subject Line', 'Purpose', 'Audience', 'CTA']
    },
    {
      id: 'product-description',
      title: 'Product Description',
      description: 'Write converting product descriptions',
      icon: '🛍️',
      gradient: 'from-orange-500 to-yellow-400',
      fields: ['Product Name', 'Features', 'Benefits', 'Target Market']
    },
    {
      id: 'video-script',
      title: 'Video Script',
      description: 'Generate scripts for video content',
      icon: '🎥',
      gradient: 'from-red-500 to-pink-400',
      fields: ['Video Type', 'Duration', 'Key Points', 'Audience']
    },
    {
      id: 'ad-copy',
      title: 'Ad Copy',
      description: 'Create high-converting advertisements',
      icon: '📢',
      gradient: 'from-indigo-500 to-purple-400',
      fields: ['Platform', 'Product/Service', 'Target Audience', 'Offer']
    }
  ]

  const toneOptions = [
    { value: 'professional', label: 'Professional', emoji: '💼' },
    { value: 'casual', label: 'Casual', emoji: '😊' },
    { value: 'friendly', label: 'Friendly', emoji: '🤝' },
    { value: 'authoritative', label: 'Authoritative', emoji: '👨‍💼' },
    { value: 'humorous', label: 'Humorous', emoji: '😄' },
    { value: 'empathetic', label: 'Empathetic', emoji: '❤️' }
  ]

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '50-150 words' },
    { value: 'medium', label: 'Medium', description: '150-500 words' },
    { value: 'long', label: 'Long', description: '500+ words' }
  ]

  const recentGenerations = [
    {
      id: 1,
      title: '10 AI Marketing Trends for 2024',
      type: 'Blog Post',
      date: '2 hours ago',
      status: 'Completed',
      words: 1250
    },
    {
      id: 2,
      title: 'Social Media Campaign - Product Launch',
      type: 'Social Media',
      date: '5 hours ago',
      status: 'Completed',
      words: 280
    },
    {
      id: 3,
      title: 'Welcome Email Series',
      type: 'Email Campaign',
      date: '1 day ago',
      status: 'Completed',
      words: 450
    }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      const sampleContent = `# Generated Content\n\nHere's your AI-generated content based on your prompt: "${prompt}"\n\nThis is a sample of what would be generated using AI technology. The content would be tailored to your specified tone (${tone}) and length (${length}).\n\n## Key Points:\n- Relevant to your topic\n- Optimized for engagement\n- Professional quality\n- Ready to use\n\nThe actual AI would analyze your prompt and generate high-quality, original content that matches your requirements perfectly.`

      setGeneratedContent(sampleContent)
      setIsGenerating(false)
    }, 3000)
  }

  const handleSaveContent = () => {
    // In a real app, this would save to the backend
    alert('Content saved to your library!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Studio</h1>
              <p className="text-sm text-gray-500">Create amazing content with artificial intelligence</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-xl">⚙️</span>
            </button>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold rounded-full">
              ✨ AI Pro
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Templates and Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all transform hover:scale-105 ${
                      selectedTemplate === template.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${template.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl filter drop-shadow-md">{template.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{template.title}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Settings</h3>

              {/* Tone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {toneOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTone(option.value)}
                      className={`p-3 rounded-lg text-left transition-colors ${
                        tone === option.value
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{option.emoji}</span>
                        <span className="text-sm font-medium">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Length</label>
                <div className="space-y-2">
                  {lengthOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setLength(option.value)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        length === option.value
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-sm text-gray-500">{option.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Generations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Generations</h3>
              <div className="space-y-3">
                {recentGenerations.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{item.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.words} words</span>
                          <span>•</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Generation Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Content Prompt</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>🤖</span>
                  <span>AI Ready</span>
                </div>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create... Be specific about your topic, audience, and goals."
                className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Template: {selectedTemplate || 'None selected'}</span>
                  <span>•</span>
                  <span>Tone: {tone}</span>
                  <span>•</span>
                  <span>Length: {length}</span>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    !prompt.trim() || isGenerating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>✨</span>
                      <span>Generate Content</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Content */}
            {(generatedContent || isGenerating) && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                    {generatedContent && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => navigator.clipboard.writeText(generatedContent)}
                          className="px-3 py-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          📋 Copy
                        </button>
                        <button
                          onClick={handleSaveContent}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          💾 Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {isGenerating ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">AI is crafting your content...</p>
                        <p className="text-sm text-gray-500 mt-1">This usually takes a few seconds</p>
                      </div>
                    </div>
                  ) : (
                    <div className="prose max-w-none">
                      <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                        {generatedContent}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Tips */}
            {!generatedContent && !isGenerating && (
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">💡</span>
                  <h3 className="text-xl font-semibold">Pro Tips for Better Results</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Be Specific</h4>
                    <p className="text-sm text-white/90">
                      Include details about your target audience, key points, and desired outcome.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Use Examples</h4>
                    <p className="text-sm text-white/90">
                      Reference similar content or provide examples of what you're looking for.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Set Context</h4>
                    <p className="text-sm text-white/90">
                      Explain the purpose, platform, and any constraints for your content.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Iterate</h4>
                    <p className="text-sm text-white/90">
                      Refine your prompts based on results to get exactly what you need.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}