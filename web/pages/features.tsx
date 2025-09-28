import Head from 'next/head'
import Link from 'next/link'

export default function FeaturesPage() {
  const features = [
    {
      category: 'AI Content Generation',
      icon: '🧠',
      description: 'Powered by the latest AI models for exceptional content quality',
      items: [
        {
          title: 'Blog Post Writer',
          description: 'Generate complete blog posts with SEO optimization, meta descriptions, and engaging content'
        },
        {
          title: 'Social Media Content',
          description: 'Create viral posts for Twitter, LinkedIn, Facebook, and Instagram with hashtag suggestions'
        },
        {
          title: 'Email Campaigns',
          description: 'Design compelling email sequences with subject lines that boost open rates'
        },
        {
          title: 'Ad Copy Generator',
          description: 'Create high-converting ads for Google, Facebook, and other platforms'
        },
        {
          title: 'Product Descriptions',
          description: 'Write compelling e-commerce product descriptions that sell'
        },
        {
          title: 'Video Scripts',
          description: 'Generate scripts for YouTube, TikTok, and other video platforms'
        }
      ]
    },
    {
      category: 'Smart Tools & Features',
      icon: '⚡',
      description: 'Advanced tools to streamline your content creation workflow',
      items: [
        {
          title: 'Brand Voice Customization',
          description: 'Train the AI to match your unique brand voice and tone'
        },
        {
          title: 'Content Repurposing',
          description: 'Transform one piece of content into multiple formats automatically'
        },
        {
          title: 'Bulk Generation',
          description: 'Generate multiple variations of content simultaneously'
        },
        {
          title: 'Grammar & Style Check',
          description: 'Built-in grammar checker and style suggestions'
        },
        {
          title: 'Plagiarism Detection',
          description: 'Ensure all content is 100% original and unique'
        },
        {
          title: 'Translation Support',
          description: 'Generate content in 30+ languages with native fluency'
        }
      ]
    },
    {
      category: 'Analytics & Optimization',
      icon: '📊',
      description: 'Data-driven insights to improve your content performance',
      items: [
        {
          title: 'Performance Analytics',
          description: 'Track engagement, conversions, and ROI for all your content'
        },
        {
          title: 'SEO Optimization',
          description: 'Built-in SEO tools with keyword research and optimization suggestions'
        },
        {
          title: 'A/B Testing',
          description: 'Test different content variations to find what works best'
        },
        {
          title: 'Sentiment Analysis',
          description: 'Understand how your audience feels about your content'
        },
        {
          title: 'Readability Scoring',
          description: 'Ensure your content is easy to read for your target audience'
        },
        {
          title: 'Content Calendar',
          description: 'Plan and schedule your content strategy months in advance'
        }
      ]
    },
    {
      category: 'Collaboration & Workflow',
      icon: '👥',
      description: 'Tools for teams to work together seamlessly',
      items: [
        {
          title: 'Team Workspaces',
          description: 'Organize projects and collaborate with your entire team'
        },
        {
          title: 'Role-Based Access',
          description: 'Control who can view, edit, and publish content'
        },
        {
          title: 'Approval Workflows',
          description: 'Set up review and approval processes for quality control'
        },
        {
          title: 'Comments & Feedback',
          description: 'Leave feedback and suggestions directly on content'
        },
        {
          title: 'Version History',
          description: 'Track all changes and revert to previous versions when needed'
        },
        {
          title: 'Real-time Collaboration',
          description: 'Work on content simultaneously with team members'
        }
      ]
    },
    {
      category: 'Integrations & API',
      icon: '🔌',
      description: 'Connect with your favorite tools and platforms',
      items: [
        {
          title: 'WordPress Plugin',
          description: 'Publish directly to your WordPress site with one click'
        },
        {
          title: 'Social Media Publishing',
          description: 'Schedule and post to all major social platforms'
        },
        {
          title: 'CRM Integration',
          description: 'Connect with Salesforce, HubSpot, and other CRMs'
        },
        {
          title: 'Zapier & Make',
          description: 'Automate workflows with 5000+ app integrations'
        },
        {
          title: 'REST API',
          description: 'Build custom integrations with our comprehensive API'
        },
        {
          title: 'Webhook Support',
          description: 'Get real-time notifications for content events'
        }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: '🔒',
      description: 'Enterprise-grade security for your peace of mind',
      items: [
        {
          title: 'End-to-End Encryption',
          description: 'All data is encrypted in transit and at rest'
        },
        {
          title: 'GDPR Compliant',
          description: 'Full compliance with European data protection regulations'
        },
        {
          title: 'SOC 2 Type II',
          description: 'Certified security controls and processes'
        },
        {
          title: 'Single Sign-On (SSO)',
          description: 'Integrate with your existing authentication systems'
        },
        {
          title: 'Data Backup',
          description: 'Automatic backups with instant recovery options'
        },
        {
          title: 'IP Whitelisting',
          description: 'Restrict access to specific IP addresses for added security'
        }
      ]
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Manager at TechCorp',
      image: '👩‍💼',
      quote: 'AI Content Assistant has revolutionized our content creation process. We&apos;re producing 10x more content with better quality than ever before.'
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director at StartupX',
      image: '👨‍💻',
      quote: 'The AI understands our brand voice perfectly. It&apos;s like having a team of expert copywriters available 24/7.'
    },
    {
      name: 'Emma Williams',
      role: 'Freelance Writer',
      image: '👩‍🎨',
      quote: 'This tool has tripled my productivity. I can now take on more clients and deliver better content faster.'
    }
  ]

  return (
    <>
      <Head>
        <title>Features - AI Content Assistant</title>
        <meta name="description" content="Explore all the powerful features of AI Content Assistant" />
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
                <Link href="/features" className="text-gray-900 font-medium">
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything You Need to Create Amazing Content
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover the powerful features that make AI Content Assistant the ultimate tool for content creators, marketers, and businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="px-8 py-3 bg-white text-blue-600 text-lg rounded-lg hover:bg-gray-100 transition-colors inline-block"
              >
                Start Free Trial
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3 border-2 border-white text-white text-lg rounded-lg hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        {features.map((category, categoryIndex) => (
          <section key={categoryIndex} className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{category.category}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Loved by Content Creators Worldwide
              </h2>
              <p className="text-xl text-gray-600">
                See what our users are saying about AI Content Assistant
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{testimonial.image}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Content Creation?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of content creators who are already using AI Content Assistant
            </p>
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-white text-blue-600 text-lg rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Start Your Free Trial
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}