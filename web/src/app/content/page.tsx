'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')

  const contentItems = [
    {
      id: 1,
      title: '10 AI Trends Shaping Marketing in 2025',
      type: 'Blog Post',
      status: 'Published',
      views: 12400,
      engagement: 8.5,
      date: '2024-01-15',
      author: 'AI Assistant',
      thumbnail: '🌟',
      tags: ['AI', 'Marketing', 'Trends'],
      wordCount: 2150,
      readTime: '8 min'
    },
    {
      id: 2,
      title: 'The Future of Content Creation',
      type: 'Article',
      status: 'Draft',
      views: 0,
      engagement: 0,
      date: '2024-01-14',
      author: 'John Doe',
      thumbnail: '🚀',
      tags: ['Content', 'Future', 'Technology'],
      wordCount: 1800,
      readTime: '7 min'
    },
    {
      id: 3,
      title: 'Social Media Campaign Q1 2024',
      type: 'Social Media',
      status: 'Scheduled',
      views: 0,
      engagement: 0,
      date: '2024-01-20',
      author: 'Marketing Team',
      thumbnail: '📱',
      tags: ['Social Media', 'Campaign', 'Q1'],
      wordCount: 450,
      readTime: '2 min'
    },
    {
      id: 4,
      title: 'Customer Success Stories Collection',
      type: 'Video Script',
      status: 'Processing',
      views: 0,
      engagement: 0,
      date: '2024-01-12',
      author: 'AI Assistant',
      thumbnail: '🎬',
      tags: ['Customer', 'Success', 'Stories'],
      wordCount: 900,
      readTime: '4 min'
    },
    {
      id: 5,
      title: 'Weekly Newsletter - Tech Updates',
      type: 'Email',
      status: 'Published',
      views: 5600,
      engagement: 6.2,
      date: '2024-01-10',
      author: 'Content Team',
      thumbnail: '📧',
      tags: ['Newsletter', 'Tech', 'Updates'],
      wordCount: 1200,
      readTime: '5 min'
    },
    {
      id: 6,
      title: 'Product Launch Announcement',
      type: 'Press Release',
      status: 'Review',
      views: 0,
      engagement: 0,
      date: '2024-01-18',
      author: 'PR Team',
      thumbnail: '📢',
      tags: ['Product', 'Launch', 'Announcement'],
      wordCount: 800,
      readTime: '3 min'
    }
  ]

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = filterType === 'all' || item.type.toLowerCase().includes(filterType.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'views':
        return b.views - a.views
      case 'engagement':
        return b.engagement - a.engagement
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-700'
      case 'Draft':
        return 'bg-gray-100 text-gray-700'
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'Review':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Content Hub</h1>
              <p className="text-sm text-gray-500">Manage all your AI-generated content</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              + New Content
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Filter by Type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="blog">Blog Post</option>
                <option value="article">Article</option>
                <option value="social">Social Media</option>
                <option value="email">Email</option>
                <option value="video">Video Script</option>
                <option value="press">Press Release</option>
              </select>

              {/* Sort by */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="views">Most Views</option>
                <option value="engagement">Best Engagement</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Content</p>
                <p className="text-3xl font-bold text-gray-900">{contentItems.length}</p>
              </div>
              <span className="text-3xl">📚</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-3xl font-bold text-green-600">
                  {contentItems.filter(item => item.status === 'Published').length}
                </p>
              </div>
              <span className="text-3xl">✅</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-blue-600">
                  {contentItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                </p>
              </div>
              <span className="text-3xl">👀</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Engagement</p>
                <p className="text-3xl font-bold text-purple-600">
                  {(contentItems.filter(item => item.engagement > 0).reduce((sum, item) => sum + item.engagement, 0) /
                    contentItems.filter(item => item.engagement > 0).length || 0).toFixed(1)}%
                </p>
              </div>
              <span className="text-3xl">📈</span>
            </div>
          </div>
        </div>

        {/* Content Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedContent.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{item.thumbnail}</span>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">{item.title}</h3>

                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                    <span>•</span>
                    <span>{item.wordCount} words</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By {item.author}</span>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>

                  {item.status === 'Published' && (
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center space-x-1">
                        <span>👀</span>
                        <span className="text-gray-600">{item.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>📈</span>
                        <span className="text-gray-600">{item.engagement}% engagement</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-100">
              {sortedContent.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">{item.thumbnail}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>By {item.author}</span>
                          <span>•</span>
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{item.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      {item.status === 'Published' && (
                        <>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{item.views.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">views</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{item.engagement}%</p>
                            <p className="text-xs text-gray-500">engagement</p>
                          </div>
                        </>
                      )}

                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>

                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sortedContent.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <span className="text-6xl mb-4 block">📝</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Create New Content
            </button>
          </div>
        )}
      </div>
    </div>
  )
}