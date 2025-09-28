'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Content Assistant</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <Link href="/auth/login">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Sign In</button>
              </Link>
              <Link href="/auth/register">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Get Started
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
            Create Amazing <span className="text-blue-600">AI Content</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your content creation process with AI-powered tools. Generate, optimize, and publish content that engages your audience and drives results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors">
                Start Free Trial →
              </button>
            </Link>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 text-lg rounded-lg hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Content Creators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and optimize your content with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Content Generation',
                description: 'Create high-quality content in seconds with advanced AI models.',
                icon: '🧠'
              },
              {
                title: 'Multi-Format Support',
                description: 'Generate blog posts, social media content, emails, and ads.',
                icon: '⚡'
              },
              {
                title: 'Performance Analytics',
                description: 'Track your content performance with detailed insights.',
                icon: '📊'
              },
              {
                title: 'Team Collaboration',
                description: 'Work together with your team on content creation.',
                icon: '👥'
              },
              {
                title: 'Multi-Platform Publishing',
                description: 'Publish directly to social media and other platforms.',
                icon: '🌐'
              },
              {
                title: 'Mobile App',
                description: 'Create and manage content on the go.',
                icon: '📱'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Start free and scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$29',
                description: 'Perfect for individuals',
                features: ['50 AI generations/month', 'Basic templates', '3 social platforms', 'Email support']
              },
              {
                name: 'Professional',
                price: '$99',
                description: 'Best for businesses',
                features: ['500 AI generations/month', 'Advanced features', 'Unlimited platforms', 'Priority support'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$299',
                description: 'For large organizations',
                features: ['Unlimited generations', 'Custom AI training', 'White-label options', 'Dedicated support']
              }
            ].map((plan, index) => (
              <div key={index} className={`p-8 bg-white rounded-lg border ${plan.popular ? 'ring-2 ring-blue-600' : ''}`}>
                {plan.popular && (
                  <div className="bg-blue-600 text-white text-sm py-1 px-3 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-medium ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Content Creation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using AI to create better content faster.
          </p>
          <Link href="/auth/register">
            <button className="px-8 py-3 bg-white text-blue-600 text-lg rounded-lg hover:bg-gray-100 transition-colors">
              Start Your Free Trial →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-blue-400 rounded"></div>
                <span className="text-xl font-bold">AI Content Assistant</span>
              </div>
              <p className="text-gray-400">
                Empowering creators with AI-powered content generation tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Content Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}