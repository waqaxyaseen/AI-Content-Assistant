'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HistoryPage() {
  const [filter, setFilter] = useState('all')
  const [dateRange, setDateRange] = useState('7days')
  const [searchTerm, setSearchTerm] = useState('')

  const historyItems = [
    {
      id: 1,
      title: 'AI-Powered Marketing Strategy Blog Post',
      type: 'Blog Post',
      action: 'Generated',
      timestamp: '2025-09-27 10:30:15',
      status: 'Published',
      wordCount: 1250,
      aiModel: 'GPT-4 Turbo',
      icon: '📝',
      performance: { views: '2.3k', engagement: '8.5%', shares: 145 }
    },
    {
      id: 2,
      title: 'Product Launch Social Media Campaign',
      type: 'Social Media',
      action: 'Created',
      timestamp: '2025-09-27 09:15:22',
      status: 'Scheduled',
      wordCount: 280,
      aiModel: 'Claude 3',
      icon: '📱',
      performance: { views: '-', engagement: '-', shares: 0 }
    },
    {
      id: 3,
      title: 'Customer Success Story Video Script',
      type: 'Video Script',
      action: 'Generated',
      timestamp: '2025-09-26 16:45:30',
      status: 'In Review',
      wordCount: 850,
      aiModel: 'GPT-4',
      icon: '🎬',
      performance: { views: '450', engagement: '12.3%', shares: 23 }
    },
    {
      id: 4,
      title: 'Email Newsletter - Tech Trends 2025',
      type: 'Email',
      action: 'Edited',
      timestamp: '2025-09-26 14:20:10',
      status: 'Sent',
      wordCount: 650,
      aiModel: 'Claude 3',
      icon: '📧',
      performance: { views: '5.2k', engagement: '22.1%', shares: 89 }
    },
    {
      id: 5,
      title: 'SEO-Optimized Landing Page Copy',
      type: 'Web Copy',
      action: 'Generated',
      timestamp: '2025-09-25 11:30:45',
      status: 'Live',
      wordCount: 450,
      aiModel: 'GPT-4',
      icon: '🌐',
      performance: { views: '8.7k', engagement: '15.4%', shares: 234 }
    },
    {
      id: 6,
      title: 'Instagram Carousel: AI Benefits',
      type: 'Social Media',
      action: 'Created',
      timestamp: '2025-09-25 09:10:20',
      status: 'Published',
      wordCount: 120,
      aiModel: 'DALL-E 3',
      icon: '🎨',
      performance: { views: '12.5k', engagement: '18.9%', shares: 567 }
    },
    {
      id: 7,
      title: 'Podcast Episode Outline',
      type: 'Podcast',
      action: 'Generated',
      timestamp: '2025-09-24 15:25:35',
      status: 'Draft',
      wordCount: 1500,
      aiModel: 'Claude 3',
      icon: '🎙️',
      performance: { views: '-', engagement: '-', shares: 0 }
    },
    {
      id: 8,
      title: 'Ad Copy for Google Ads Campaign',
      type: 'Advertisement',
      action: 'Optimized',
      timestamp: '2025-09-24 10:15:18',
      status: 'Running',
      wordCount: 90,
      aiModel: 'GPT-4',
      icon: '📢',
      performance: { views: '45.2k', engagement: '3.2%', shares: 12 }
    }
  ]

  const filteredHistory = historyItems.filter(item => {
    if (filter !== 'all' && item.type.toLowerCase() !== filter.toLowerCase()) return false
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content History</h1>
              <p className="text-sm text-gray-500">Track all your AI-generated content</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 px-4 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            </div>
            <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Export History
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Filters and Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Content Type Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Type:</span>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="blog post">Blog Posts</option>
                  <option value="social media">Social Media</option>
                  <option value="email">Emails</option>
                  <option value="video script">Video Scripts</option>
                  <option value="advertisement">Advertisements</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600">Period:</span>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{filteredHistory.length}</p>
                <p className="text-xs text-gray-500">Total Items</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-xs text-gray-500">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">12.5k</p>
                <p className="text-xs text-gray-500">Words Generated</p>
              </div>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Activity Timeline</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">{item.icon}</span>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center space-x-1">
                          <span>📝</span>
                          <span>{item.type}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span>🤖</span>
                          <span>{item.aiModel}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span>📊</span>
                          <span>{item.wordCount} words</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span>🕐</span>
                          <span>{item.timestamp}</span>
                        </span>
                      </div>

                      {/* Performance Metrics */}
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Views:</span>
                          <span className="text-sm font-semibold text-gray-900">{item.performance.views}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Engagement:</span>
                          <span className="text-sm font-semibold text-gray-900">{item.performance.engagement}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Shares:</span>
                          <span className="text-sm font-semibold text-gray-900">{item.performance.shares}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions and Status */}
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                      item.status === 'Published' || item.status === 'Live' || item.status === 'Sent'
                        ? 'bg-green-100 text-green-700'
                        : item.status === 'Scheduled' || item.status === 'Running'
                        ? 'bg-blue-100 text-blue-700'
                        : item.status === 'In Review'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>

                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="p-6 text-center border-t border-gray-100">
            <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
              Load More History
            </button>
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">📈</span>
              <span className="text-2xl font-bold">78%</span>
            </div>
            <h3 className="font-semibold mb-1">Average Engagement</h3>
            <p className="text-sm text-white/80">Across all content types</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">⚡</span>
              <span className="text-2xl font-bold">2.5x</span>
            </div>
            <h3 className="font-semibold mb-1">Productivity Boost</h3>
            <p className="text-sm text-white/80">Content created faster with AI</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🎯</span>
              <span className="text-2xl font-bold">92%</span>
            </div>
            <h3 className="font-semibold mb-1">Goal Achievement</h3>
            <p className="text-sm text-white/80">Content targets reached</p>
          </div>
        </div>
      </div>
    </div>
  )
}