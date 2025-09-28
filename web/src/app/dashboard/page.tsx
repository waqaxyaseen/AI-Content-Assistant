'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [greeting, setGreeting] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: 'Total Content',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: '📝',
      gradient: 'from-blue-500 to-cyan-400',
      sparkline: [20, 25, 30, 35, 32, 40, 45]
    },
    {
      title: 'AI Generations',
      value: '1,429',
      change: '+23%',
      trend: 'up',
      icon: '🤖',
      gradient: 'from-purple-500 to-pink-400',
      sparkline: [15, 20, 18, 25, 30, 35, 42]
    },
    {
      title: 'Engagement Rate',
      value: '8.2%',
      change: '+5.4%',
      trend: 'up',
      icon: '📈',
      gradient: 'from-green-500 to-emerald-400',
      sparkline: [30, 35, 32, 38, 40, 45, 48]
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: '👥',
      gradient: 'from-orange-500 to-yellow-400',
      sparkline: [10, 10, 10, 11, 11, 12, 12]
    }
  ]

  const recentContent = [
    {
      title: '10 AI Trends Shaping Marketing in 2025',
      type: 'Blog Post',
      status: 'Published',
      views: '1,240',
      engagement: '8.5%',
      date: '2 hours ago',
      author: 'AI Assistant',
      thumbnail: '🌟'
    },
    {
      title: 'Product Launch Campaign Q1',
      type: 'Social Media',
      status: 'Scheduled',
      views: '0',
      engagement: '-',
      date: '5 hours ago',
      author: 'Marketing Team',
      thumbnail: '🚀'
    },
    {
      title: 'Weekly Newsletter - Tech Updates',
      type: 'Email',
      status: 'Draft',
      views: '0',
      engagement: '-',
      date: '1 day ago',
      author: 'Content Team',
      thumbnail: '📧'
    },
    {
      title: 'Customer Success Story',
      type: 'Video',
      status: 'Processing',
      views: '0',
      engagement: '-',
      date: '2 days ago',
      author: 'AI Assistant',
      thumbnail: '🎬'
    }
  ]

  const notifications = [
    { id: 1, text: 'New AI model available: GPT-4 Turbo', type: 'info', time: '5m ago' },
    { id: 2, text: 'Your blog post reached 1k views!', type: 'success', time: '1h ago' },
    { id: 3, text: 'Team meeting in 30 minutes', type: 'warning', time: '2h ago' }
  ]

  const quickActions = [
    { title: 'Generate Blog', icon: '✍️', color: 'bg-gradient-to-br from-blue-500 to-blue-600', delay: '0' },
    { title: 'Social Post', icon: '📱', color: 'bg-gradient-to-br from-green-500 to-green-600', delay: '50' },
    { title: 'Email Campaign', icon: '📧', color: 'bg-gradient-to-br from-purple-500 to-purple-600', delay: '100' },
    { title: 'Video Script', icon: '🎥', color: 'bg-gradient-to-br from-orange-500 to-orange-600', delay: '150' },
    { title: 'Ad Copy', icon: '📢', color: 'bg-gradient-to-br from-pink-500 to-pink-600', delay: '200' },
    { title: 'SEO Content', icon: '🔍', color: 'bg-gradient-to-br from-indigo-500 to-indigo-600', delay: '250' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Modern Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo with Animation */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform transition-transform hover:scale-110 hover:rotate-3">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">AI Content</span>
                <p className="text-xs text-gray-500">Assistant Pro</p>
              </div>
            </div>
          </div>

          {/* Navigation with Icons */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {[
              { name: 'Dashboard', href: '/dashboard', icon: '🏠', active: true },
              { name: 'Content Hub', href: '/content', icon: '📚', badge: '12' },
              { name: 'History', href: '/history', icon: '📜' },
              { name: 'AI Studio', href: '/ai-studio', icon: '🎨', badge: 'NEW' },
              { name: 'Analytics', href: '/analytics', icon: '📊' },
              { name: 'Campaigns', href: '/campaigns', icon: '🚀' },
              { name: 'Team', href: '/team', icon: '👥' },
              { name: 'Automation', href: '/automation', icon: '⚡' },
              { name: 'Settings', href: '/settings', icon: '⚙️' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  item.active
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className={`${item.active ? 'font-semibold' : ''}`}>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    item.badge === 'NEW'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* AI Assistant Card */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">🤖</span>
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">PRO</span>
              </div>
              <h4 className="font-bold mb-1">AI Assistant Ready</h4>
              <p className="text-xs text-white/80 mb-3">Generate content 10x faster</p>
              <button className="w-full bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-white/90 transition-colors">
                Start Creating
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                ⚙️
              </button>
            </div>
            <Link href="/">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Sign out
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-72">
        {/* Top Navigation Bar */}
        <div className="bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search or ask AI..."
                  className="w-96 px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                <span className="absolute right-3 top-2 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-500 font-medium">⌘K</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Live Time */}
              <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
                <span>🕐</span>
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-xl">🔔</span>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notif => (
                        <div key={notif.id} className="p-4 hover:bg-gray-50 border-b border-gray-50">
                          <div className="flex items-start space-x-3">
                            <span className="text-lg">
                              {notif.type === 'success' ? '✅' : notif.type === 'warning' ? '⚠️' : 'ℹ️'}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{notif.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Credits/Plan */}
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <span className="text-sm text-gray-600">Credits:</span>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  ∞ Pro
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Section with Animation */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2 animate-fade-in">
                {greeting}, John! ✨
              </h1>
              <p className="text-white/90 text-lg">
                Your AI assistant has generated 42 pieces of content today. Ready to create more magic?
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-white/90 transition-all transform hover:scale-105">
                  Quick Generate
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all">
                  View Analytics
                </button>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -top-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Stats Cards with Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.title}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl filter drop-shadow-md">{stat.icon}</span>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <span className="text-xs font-bold">{stat.change}</span>
                      <span className="text-xs">{stat.trend === 'up' ? '↑' : '↓'}</span>
                    </div>
                  </div>

                  <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>

                  {/* Mini Chart */}
                  <div className="mt-4 flex items-end justify-between h-8">
                    {stat.sparkline.map((value, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-gradient-to-t ${stat.gradient} rounded-full opacity-50 group-hover:opacity-100 transition-all`}
                        style={{ height: `${value}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Grid */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-500">Start creating content with AI</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View all templates →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  className={`group relative p-6 ${action.color} rounded-xl text-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden`}
                  style={{ animationDelay: `${action.delay}ms` }}
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative">
                    <span className="text-3xl mb-3 block filter drop-shadow-lg">{action.icon}</span>
                    <p className="text-sm font-semibold">{action.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Performance Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Content List */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Recent Content</h3>
                    <p className="text-sm text-gray-500">Your latest AI-generated content</p>
                  </div>
                  <div className="flex space-x-2">
                    {['All', 'Published', 'Draft', 'Scheduled'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.toLowerCase()
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {recentContent.map((content, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">{content.thumbnail}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{content.title}</h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <span>📝</span>
                            <span>{content.type}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <span>👤</span>
                            <span>{content.author}</span>
                          </span>
                          <span>•</span>
                          <span>{content.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{content.views} views</p>
                        <p className="text-xs text-gray-500">{content.engagement} engagement</p>
                      </div>
                      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                        content.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : content.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : content.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {content.status}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Panel */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">AI Insights</h3>
                <span className="animate-pulse text-green-500">● Live</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">💡</span>
                    <h4 className="font-semibold text-gray-900">Trending Topics</h4>
                  </div>
                  <p className="text-sm text-gray-600">AI, Machine Learning, and ChatGPT are trending in your industry</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">📊</span>
                    <h4 className="font-semibold text-gray-900">Performance Tip</h4>
                  </div>
                  <p className="text-sm text-gray-600">Posts published at 9 AM get 43% more engagement</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">🎯</span>
                    <h4 className="font-semibold text-gray-900">Content Goal</h4>
                  </div>
                  <p className="text-sm text-gray-600">You're 73% toward your monthly content goal</p>
                  <div className="mt-2 bg-white rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                Generate AI Report
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Floating AI Assistant Button */}
      <button className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50">
        <span className="text-2xl animate-bounce">🤖</span>
      </button>
    </div>
  )
}