import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function PricingPage() {
  const router = useRouter()
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const plans = [
    {
      name: 'Free',
      description: 'Get started with AI content creation',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        '10 AI generations per month',
        '3 content templates',
        'Basic text editor',
        'Community support',
        '1 user account',
        'Export to TXT'
      ],
      limitations: [
        'Limited generations',
        'Basic features only',
        'No priority support'
      ],
      popular: false,
      cta: 'Start Free'
    },
    {
      name: 'Starter',
      description: 'Perfect for individuals and freelancers',
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        '50 AI generations per month',
        '5 content templates',
        'Basic analytics',
        'Email support',
        '1 user account',
        'Export to PDF & Word',
        'Basic SEO optimization'
      ],
      limitations: [
        'No API access',
        'No custom templates',
        'No team collaboration'
      ],
      popular: false,
      cta: 'Start Now'
    },
    {
      name: 'Professional',
      description: 'Best for growing businesses and teams',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        '500 AI generations per month',
        '50+ content templates',
        'Advanced analytics & insights',
        'Priority support',
        'Up to 5 team members',
        'All export formats',
        'Advanced SEO tools',
        'Custom brand voice',
        'API access (1000 calls/month)',
        'Plagiarism checker',
        'Content calendar'
      ],
      limitations: [
        'Limited API calls',
        'No white-label option'
      ],
      popular: true,
      cta: 'Start Now'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations and teams',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: [
        'Unlimited AI generations',
        'Unlimited templates',
        'Custom AI model training',
        'Dedicated account manager',
        'Unlimited team members',
        'White-label option',
        'Advanced API access',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment option',
        'Advanced security features',
        'Custom workflows',
        'Training & onboarding'
      ],
      limitations: [],
      popular: false,
      cta: 'Start Now'
    }
  ]

  const faqs = [
    {
      icon: '🎯',
      question: 'Can I try before I buy?',
      answer: 'Absolutely! Every plan includes a risk-free 14-day trial period. Start creating amazing content immediately - no credit card required. Cancel anytime during the trial with zero charges.',
      highlight: true
    },
    {
      icon: '🤖',
      question: 'What AI models power your platform?',
      answer: 'We leverage the most advanced AI technology stack including GPT-4, Claude 3 Opus, Gemini Pro, and specialized models for different content types. Our smart routing system automatically selects the best model for each task, ensuring superior quality and relevance.'
    },
    {
      icon: '💳',
      question: 'How flexible is plan switching?',
      answer: 'Total flexibility guaranteed! Upgrade instantly to unlock more features, downgrade to save costs, or pause your subscription anytime. Changes take effect immediately for upgrades or at the next billing cycle for downgrades. No penalties, no questions asked.'
    },
    {
      icon: '💰',
      question: 'What about refunds?',
      answer: 'We stand behind our service with an industry-leading 30-day money-back guarantee. Not completely satisfied? Contact our support team for a full refund, no questions asked. We also offer prorated refunds for annual plans.',
      highlight: true
    },
    {
      icon: '🔒',
      question: 'How secure is my content and data?',
      answer: 'Bank-level security is our standard. All data is encrypted with AES-256 encryption, stored in SOC 2 compliant data centers, and protected by strict access controls. Your content is never used to train AI models, and you retain full ownership and copyright of everything you create.'
    },
    {
      icon: '⚡',
      question: 'What happens when I reach my limits?',
      answer: 'Never stop creating! When approaching your limit, we send proactive notifications at 80% and 90% usage. You can instantly purchase additional generation packs, upgrade to a higher plan with one click, or enable auto-upgrade to ensure uninterrupted service.'
    },
    {
      icon: '🌍',
      question: 'Do you support multiple languages?',
      answer: 'Go global with confidence! Our AI supports 95+ languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and more. Create localized content, translate existing work, or generate multilingual campaigns seamlessly.'
    },
    {
      icon: '🚀',
      question: 'How fast can I get started?',
      answer: 'Lightning fast! Sign up takes under 60 seconds, no downloads required. Access our web app instantly from any device, integrate with your favorite tools via API, or use our Chrome extension. Most users generate their first content within 2 minutes of signing up.',
      highlight: true
    }
  ]

  const handleSelectPlan = (planName: string) => {
    // Store selected plan in localStorage and go to signup for all plans
    localStorage.setItem('selectedPlan', planName)
    router.push('/auth/signup')
  }

  const handleEmailSupport = () => {
    // Try to open email client first
    const email = 'support@aicontentassistant.com'
    const subject = 'Support Request - AI Content Assistant'
    const body = `Hello Support Team,

I need help with:

[Please describe your issue here]

Best regards,
[Your name]`

    // Check if we can open mailto (this will work on most desktop browsers)
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Try to open email client
    const link = document.createElement('a')
    link.href = mailtoLink
    link.click()

    // Also show the form as a fallback after a short delay
    setTimeout(() => {
      setShowEmailForm(true)
    }, 1000)
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to your backend
    alert(`Email sent!\n\nFrom: ${emailForm.name} (${emailForm.email})\nSubject: ${emailForm.subject}\nMessage: ${emailForm.message}`)
    setShowEmailForm(false)
    setEmailForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <Head>
        <title>Pricing - AI Content Assistant</title>
        <meta name="description" content="Choose the perfect plan for your content creation needs" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">Content Assistant</span>
              </Link>
              <nav className="flex items-center space-x-8">
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
                <Link href="/pricing" className="text-gray-900 font-medium">
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

        {/* Pricing Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Choose the perfect plan for your content creation needs
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    billingPeriod === 'yearly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  Yearly (Save 20%)
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`bg-white rounded-lg p-6 ${
                    plan.popular
                      ? 'ring-2 ring-blue-600 shadow-xl relative'
                      : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-sm py-1 px-4 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">
                        ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{billingPeriod === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingPeriod === 'yearly' && (
                      <p className="text-sm text-green-600 mt-1">
                        Save ${(plan.monthlyPrice * 12 - plan.yearlyPrice)} per year
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors mb-6 ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {plan.cta}
                  </button>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-900">Everything included:</p>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5">✓</span>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-0.5">✗</span>
                        <span className="text-sm text-gray-400">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Money Back Guarantee */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <span className="text-2xl">🛡️</span>
                <span>30-day money-back guarantee • No questions asked</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Know
              </h2>
              <p className="text-xl text-gray-600">
                Got questions? We have answers to help you get started
              </p>
            </div>

            <div className="grid gap-4">
              {faqs.map((faq: any, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden ${
                    faq.highlight ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex items-start gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0 text-2xl mt-0.5">
                      {faq.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                        {faq.question}
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedFaq === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </h3>
                      <div
                        className={`mt-3 text-gray-600 leading-relaxed transition-all duration-200 ${
                          expandedFaq === index ? 'block' : 'hidden'
                        }`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  </button>
                  {faq.highlight && expandedFaq !== index && (
                    <div className="px-6 pb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Popular Question
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Still have questions? We're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleEmailSupport}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="mr-2">📧</span>
                  Email Support
                </button>
                <button
                  onClick={() => window.dispatchEvent(new Event('openLiveChat'))}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <span className="mr-2">💬</span>
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Creating Amazing Content Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of content creators who are already using AI Content Assistant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-8 py-3 bg-white text-blue-600 text-lg rounded-lg hover:bg-gray-100 transition-colors inline-block"
              >
                Start Free Trial
              </Link>
              <Link
                href="/features"
                className="px-8 py-3 border-2 border-white text-white text-lg rounded-lg hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Email Support Form Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
              <button
                onClick={() => setShowEmailForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={emailForm.email}
                  onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Help with pricing plans"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe how we can help you..."
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> We typically respond within 2-4 hours during business hours (Mon-Fri, 9am-5pm EST).
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}