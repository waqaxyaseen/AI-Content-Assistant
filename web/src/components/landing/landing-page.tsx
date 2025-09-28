'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Zap,
  BarChart3,
  Users,
  ArrowRight,
  Check,
  Star,
  Globe,
  Smartphone,
  Brain
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const features = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: 'AI-Powered Content Generation',
    description: 'Create high-quality content in seconds with advanced AI models including GPT-4 and Claude.'
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: 'Multi-Format Support',
    description: 'Generate blog posts, social media content, emails, ads, and product descriptions.'
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Performance Analytics',
    description: 'Track your content performance with detailed analytics and AI-powered insights.'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Team Collaboration',
    description: 'Work together with your team on content creation and approval workflows.'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Multi-Platform Publishing',
    description: 'Publish directly to social media, blogs, and other platforms from one dashboard.'
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: 'Mobile App',
    description: 'Create and manage content on the go with our iOS and Android apps.'
  }
]

const pricing = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for individuals and small businesses',
    features: [
      '50 AI-generated pieces per month',
      'Basic templates and brand voice',
      'Social media scheduling (3 platforms)',
      'Basic analytics',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'Best for growing businesses and agencies',
    features: [
      '500 AI-generated pieces per month',
      'Advanced content types and formats',
      'Unlimited social platforms',
      'Advanced analytics and insights',
      'Team collaboration (up to 5 users)',
      'Priority support'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$299',
    period: '/month',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited content generation',
      'Custom AI model training',
      'White-label options',
      'Advanced integrations',
      'Dedicated account manager',
      'Custom SLAs and support'
    ],
    popular: false
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
    content: 'AI Content Assistant has revolutionized our content creation process. We\'re now producing 10x more content with better engagement rates.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Freelance Writer',
    company: 'Independent',
    content: 'The AI suggestions are incredibly accurate and help me overcome writer\'s block. It\'s like having a writing partner that never sleeps.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Social Media Manager',
    company: 'Fashion Forward',
    content: 'The multi-platform publishing feature saves me hours every week. The analytics help me understand what content performs best.',
    rating: 5
  }
]

export default function LandingPage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">AI Content Assistant</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
                Create <span className="text-gradient">Amazing Content</span> with AI
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Transform your content creation process with AI-powered tools. Generate, optimize, and publish content that engages your audience and drives results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button size="lg" className="text-lg px-8 py-3">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
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
              Everything you need to create, manage, and optimize your content with the power of artificial intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-blue-600 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. All plans include our core AI content generation features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full ${plan.popular ? 'ring-2 ring-blue-600 shadow-lg' : ''}`}>
                  <CardContent className="p-8">
                    {plan.popular && (
                      <div className="bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded-full inline-block mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of content creators who are already using AI Content Assistant to transform their workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                      <div className="text-gray-500">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Content Creation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using AI to create better content faster.
            </p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">AI Content Assistant</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering creators with AI-powered content generation tools.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
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