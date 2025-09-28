import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useApp } from '../contexts/AppContext'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
  }, [isAuthenticated, router])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <>
      <Head>
        <title>Dashboard - AI Content Assistant</title>
        <meta name="description" content="AI Content Assistant Dashboard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Simple Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">AI</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">Content Assistant</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user?.firstName || 'User'}!</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {getGreeting()}, {user?.firstName || 'there'}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Welcome to your AI Content Assistant Dashboard
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Blog Post</h3>
                <p className="text-gray-600 text-sm">Create engaging blog content</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Social Media</h3>
                <p className="text-gray-600 text-sm">Generate social posts</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">✉️</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600 text-sm">Write compelling emails</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">📢</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Ad Copy</h3>
                <p className="text-gray-600 text-sm">Create persuasive ads</p>
              </div>
            </div>
          </div>

          {/* Get Started Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Amazing Content?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our AI-powered assistant is ready to help you generate high-quality content in seconds.
              Choose a content type above or click below to get started.
            </p>
            <Link href="/generate" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Start Creating Your First Content
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">📊</div>
                <div>
                  <p className="text-gray-500 text-sm">Total Content</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">⚡</div>
                <div>
                  <p className="text-gray-500 text-sm">Generations</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">📈</div>
                <div>
                  <p className="text-gray-500 text-sm">Engagement</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">👥</div>
                <div>
                  <p className="text-gray-500 text-sm">Team</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}