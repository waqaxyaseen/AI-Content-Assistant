import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <>
      <Head>
        <title>AI Content Assistant</title>
        <meta name="description" content="AI Content Creation Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">Content Assistant</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="/auth/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Get Started
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Create Amazing <span className="text-blue-600">AI Content</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your content creation process with AI-powered tools. Generate, optimize, and publish content that engages your audience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors inline-block">
                Start Free Trial
              </Link>
              <button
                onClick={() => setShowDemoModal(true)}
                className="px-8 py-3 border border-gray-300 text-gray-700 text-lg rounded-lg hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for Content Creators
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to create, manage, and optimize your content with AI.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Content Generation</h3>
                <p className="text-gray-600">Create high-quality content in seconds with advanced AI models.</p>
              </div>

              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Format Support</h3>
                <p className="text-gray-600">Generate blog posts, social media content, emails, and ads.</p>
              </div>

              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Analytics</h3>
                <p className="text-gray-600">Track your content performance with detailed insights.</p>
              </div>

              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                <p className="text-gray-600">Work together with your team on content creation.</p>
              </div>

              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Platform Publishing</h3>
                <p className="text-gray-600">Publish directly to social media and other platforms.</p>
              </div>

              <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile App</h3>
                <p className="text-gray-600">Create and manage content on the go.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
              <p className="text-xl text-gray-600">Start free and scale as you grow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-8 bg-white rounded-lg border">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">Perfect for individuals</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>50 AI generations/month</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Basic templates</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Email support</span>
                  </li>
                </ul>
                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Get Started
                </button>
              </div>

              <div className="p-8 bg-white rounded-lg border ring-2 ring-blue-600">
                <div className="bg-blue-600 text-white text-sm py-1 px-3 rounded-full inline-block mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">Best for businesses</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>500 AI generations/month</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Advanced features</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Get Started
                </button>
              </div>

              <div className="p-8 bg-white rounded-lg border">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">$299</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">For large organizations</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Unlimited generations</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Custom AI training</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-400 rounded"></div>
                <span className="text-xl font-bold">AI Content Assistant</span>
              </div>
              <p className="text-gray-400 mb-8">
                Empowering creators with AI-powered content generation tools.
              </p>
              <p className="text-gray-400">
                &copy; 2024 AI Content Assistant. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">AI Content Assistant Demo</h2>
              <button
                onClick={() => {
                  setShowDemoModal(false)
                  setIsPlaying(false)
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
              <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative">
                {!isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                      <p className="text-white text-lg mb-2">Demo Video</p>
                      <p className="text-gray-400">Click play to watch how AI Content Assistant works</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1"
                    title="AI Content Assistant Demo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">What You'll See in This Demo:</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">▸</span>
                      <span>How to generate blog posts, social media content, and emails in seconds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">▸</span>
                      <span>Our AI's ability to understand context and create relevant content</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">▸</span>
                      <span>Real-time editing and optimization features</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">▸</span>
                      <span>Analytics dashboard to track content performance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">▸</span>
                      <span>Team collaboration features and workflow management</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Ready to Get Started?</h4>
                  <p className="text-gray-600 mb-3">
                    Join thousands of content creators who are already using AI Content Assistant to save time and create better content.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href="/auth/signup"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Start Free Trial
                    </Link>
                    <button
                      onClick={() => {
                        setShowDemoModal(false)
                        setIsPlaying(false)
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Close Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}