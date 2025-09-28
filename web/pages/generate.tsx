import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function GeneratePage() {
  const router = useRouter()
  const [contentType, setContentType] = useState('blog')
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('medium')
  const [keywords, setKeywords] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [history, setHistory] = useState<any[]>([])
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const contentTypes = [
    { value: 'blog', label: 'Blog Post', icon: '📝' },
    { value: 'social', label: 'Social Media', icon: '📱' },
    { value: 'email', label: 'Email', icon: '✉️' },
    { value: 'ad', label: 'Ad Copy', icon: '📢' },
    { value: 'product', label: 'Product Description', icon: '🛍️' },
    { value: 'video', label: 'Video Script', icon: '🎥' },
    { value: 'website', label: 'Website Copy', icon: '🌐' },
    { value: 'press', label: 'Press Release', icon: '📰' },
  ]

  const tones = [
    'professional', 'casual', 'friendly', 'formal', 'humorous',
    'inspirational', 'educational', 'persuasive', 'storytelling'
  ]

  const lengths = {
    short: { label: 'Short', words: '50-150 words' },
    medium: { label: 'Medium', words: '150-500 words' },
    long: { label: 'Long', words: '500-1500 words' },
  }

  const templates = {
    blog: [
      'Write a comprehensive guide about [topic]',
      'Top 10 tips for [subject]',
      'How to [achieve goal] in [timeframe]',
      'The ultimate beginner&apos;s guide to [topic]',
      'Why [topic] is important for [audience]'
    ],
    social: [
      'Create a viral LinkedIn post about [topic]',
      'Write an engaging Twitter thread about [subject]',
      'Instagram caption for [product/service]',
      'Facebook post announcing [news/update]'
    ],
    email: [
      'Welcome email for new subscribers',
      'Product launch announcement',
      'Newsletter about [topic]',
      'Follow-up email after [event]',
      'Sales email for [product/service]'
    ]
  }

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('contentHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }

    // Handle content type from query parameter
    const { type } = router.query
    if (type && typeof type === 'string') {
      const validTypes = ['blog', 'social', 'email', 'ad', 'product', 'video', 'website', 'press']
      if (validTypes.includes(type)) {
        setContentType(type)
      }
    }
  }, [router.query])

  useEffect(() => {
    if (generatedContent) {
      const words = generatedContent.trim().split(/\s+/).length
      const chars = generatedContent.length
      setWordCount(words)
      setCharCount(chars)
    } else {
      setWordCount(0)
      setCharCount(0)
    }
  }, [generatedContent])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt')
      return
    }

    setIsGenerating(true)
    setGeneratedContent('')

    try {
      // Call API endpoint
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          contentType,
          tone,
          length,
          keywords,
          useAI: false // Set to true when you add real AI API keys
        })
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedContent(data.content)

        // Save to history
        const newHistoryItem = {
          id: Date.now(),
          type: contentType,
          prompt,
          content: data.content,
          tone,
          length,
          keywords,
          timestamp: new Date().toISOString()
        }

        const updatedHistory = [newHistoryItem, ...history].slice(0, 10)
        setHistory(updatedHistory)
        localStorage.setItem('contentHistory', JSON.stringify(updatedHistory))
      } else {
        alert(data.error || 'Failed to generate content')
      }
    } catch (err) {
      alert('An error occurred while generating content')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateMockContent = (type: string, prompt: string, tone: string, length: string) => {
    const lengthMap = { short: 100, medium: 300, long: 800 }
    const targetWords = lengthMap[length as keyof typeof lengthMap]

    let content = ''

    switch (type) {
      case 'blog':
        content = `# ${prompt}\n\n`
        content += `In today's digital landscape, understanding ${prompt.toLowerCase()} has become increasingly important. `
        content += `This comprehensive guide will walk you through everything you need to know.\n\n`
        content += `## Introduction\n\n`
        content += `${prompt} represents a significant opportunity for businesses and individuals alike. `
        content += `Whether you're a beginner or an experienced professional, mastering this topic can transform your approach.\n\n`
        content += `## Key Benefits\n\n`
        content += `1. **Enhanced Productivity**: Implementing these strategies can boost your efficiency by up to 40%.\n`
        content += `2. **Cost Reduction**: Smart approaches can reduce operational costs significantly.\n`
        content += `3. **Improved Results**: See measurable improvements in your key metrics.\n\n`
        content += `## Best Practices\n\n`
        content += `To get the most out of ${prompt.toLowerCase()}, consider these proven strategies:\n\n`
        content += `- Start with clear objectives and measurable goals\n`
        content += `- Implement gradually and monitor results\n`
        content += `- Continuously optimize based on data and feedback\n`
        content += `- Stay updated with industry trends and innovations\n\n`
        content += `## Conclusion\n\n`
        content += `${prompt} is more than just a trend—it's a fundamental shift in how we approach modern challenges. `
        content += `By following this guide, you're well on your way to mastering this essential skill.\n\n`
        content += `Remember: Success comes from consistent application and continuous learning. Start implementing these strategies today!`
        break

      case 'social':
        content = `🚀 ${prompt}\n\n`
        content += `Here's what nobody tells you about ${prompt.toLowerCase()}:\n\n`
        content += `✨ Key Insight #1: It's not about perfection, it's about progress\n`
        content += `💡 Key Insight #2: Small changes lead to massive results\n`
        content += `🎯 Key Insight #3: Consistency beats intensity every time\n\n`
        content += `The game-changer? Understanding that ${prompt.toLowerCase()} is a journey, not a destination.\n\n`
        content += `What's your experience with this? Drop a comment below! 👇\n\n`
        content += `#Innovation #Growth #Success #Learning`
        break

      case 'email':
        content = `Subject: ${prompt}\n\n`
        content += `Dear [Name],\n\n`
        content += `I hope this email finds you well.\n\n`
        content += `I wanted to reach out regarding ${prompt.toLowerCase()}. `
        content += `This is an exciting opportunity that I believe could benefit you greatly.\n\n`
        content += `Here's what makes this special:\n\n`
        content += `• Proven results with measurable impact\n`
        content += `• Easy implementation with full support\n`
        content += `• Flexible options to suit your needs\n\n`
        content += `I'd love to discuss how this could work for you. Are you available for a brief call this week?\n\n`
        content += `Looking forward to hearing from you.\n\n`
        content += `Best regards,\n[Your Name]`
        break

      default:
        content = `Generated content for: ${prompt}\n\n`
        content += `This is a sample ${type} content with a ${tone} tone.\n\n`
        content += `The content would be approximately ${targetWords} words in length.`
    }

    // Add keywords if provided
    if (keywords) {
      content += `\n\nKeywords: ${keywords}`
    }

    return content
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    alert('Content copied to clipboard!')
  }

  const handleExport = (format: string) => {
    const filename = `content_${Date.now()}.${format}`
    const blob = new Blob([generatedContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
  }

  const handleUseTemplate = (template: string) => {
    setPrompt(template)
  }

  return (
    <>
      <Head>
        <title>Generate Content - AI Content Assistant</title>
        <meta name="description" content="Generate AI-powered content for your business" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">Content Assistant</span>
              </Link>
              <nav className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/generate" className="text-gray-900 font-medium">
                  Generate
                </Link>
                <Link href="/history" className="text-gray-600 hover:text-gray-900">
                  History
                </Link>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upgrade Plan
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Input */}
            <div className="lg:col-span-1 space-y-6">
              {/* Content Type Selection */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {contentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setContentType(type.value)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        contentType === type.value
                          ? 'bg-blue-50 border-blue-600 text-blue-600'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="block text-xl mb-1">{type.icon}</span>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Prompt</h3>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to create..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                {/* Template Suggestions */}
                {templates[contentType as keyof typeof templates] && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Quick templates:</p>
                    <div className="space-y-2">
                      {templates[contentType as keyof typeof templates].slice(0, 3).map((template, index) => (
                        <button
                          key={index}
                          onClick={() => handleUseTemplate(template)}
                          className="text-left text-sm text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {template}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>

                {/* Tone Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {tones.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Length Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <div className="space-y-2">
                    {Object.entries(lengths).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="radio"
                          value={key}
                          checked={length === key}
                          onChange={(e) => setLength(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">
                          {value.label} ({value.words})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (optional)
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="SEO, marketing, growth..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isGenerating || !prompt.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⚡</span>
                    Generating...
                  </span>
                ) : (
                  'Generate Content'
                )}
              </button>
            </div>

            {/* Right Panel - Output */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm h-full">
                {/* Output Header */}
                <div className="border-b px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                    {generatedContent && (
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">
                          {wordCount} words • {charCount} characters
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleCopy}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                            title="Copy to clipboard"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => handleExport('txt')}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                            title="Export as TXT"
                          >
                            💾
                          </button>
                          <button
                            onClick={() => setGeneratedContent('')}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                            title="Clear"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Output Content */}
                <div className="p-6 min-h-[600px]">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-96">
                      <div className="text-6xl animate-pulse mb-4">🤖</div>
                      <p className="text-gray-600">AI is generating your content...</p>
                      <p className="text-sm text-gray-500 mt-2">This usually takes 5-10 seconds</p>
                    </div>
                  ) : generatedContent ? (
                    <div className="prose max-w-none">
                      <textarea
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        className="w-full h-[500px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                      <div className="text-6xl mb-4">✨</div>
                      <p>Your generated content will appear here</p>
                      <p className="text-sm mt-2">Enter a prompt and click generate to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent History */}
          {history.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Generations</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.slice(0, 6).map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">
                        {contentTypes.find(t => t.value === item.type)?.icon}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                      {item.prompt}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {item.content}
                    </p>
                    <button
                      onClick={() => {
                        setContentType(item.type)
                        setPrompt(item.prompt)
                        setTone(item.tone)
                        setLength(item.length)
                        setKeywords(item.keywords)
                        setGeneratedContent(item.content)
                        window.scrollTo(0, 0)
                      }}
                      className="text-xs text-blue-600 hover:text-blue-700 mt-2"
                    >
                      Use this →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}