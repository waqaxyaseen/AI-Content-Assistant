'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('views')

  // Mock data for charts
  const chartData = {
    views: [
      { date: '2024-01-08', value: 1200 },
      { date: '2024-01-09', value: 1450 },
      { date: '2024-01-10', value: 1300 },
      { date: '2024-01-11', value: 1600 },
      { date: '2024-01-12', value: 1850 },
      { date: '2024-01-13', value: 2100 },
      { date: '2024-01-14', value: 1950 }
    ],
    engagement: [
      { date: '2024-01-08', value: 6.2 },
      { date: '2024-01-09', value: 7.1 },
      { date: '2024-01-10', value: 5.8 },
      { date: '2024-01-11', value: 8.3 },
      { date: '2024-01-12', value: 9.1 },
      { date: '2024-01-13', value: 8.7 },
      { date: '2024-01-14', value: 9.5 }
    ]
  }

  const stats = [
    {
      title: 'Total Views',
      value: '47,239',
      change: '+23.5%',
      trend: 'up',
      icon: '👀',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Engagement Rate',
      value: '8.2%',
      change: '+1.2%',
      trend: 'up',
      icon: '📈',
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      title: 'Content Pieces',
      value: '247',
      change: '+18',
      trend: 'up',
      icon: '📝',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      title: 'Avg. Read Time',
      value: '4m 32s',
      change: '+0.8m',
      trend: 'up',
      icon: '⏱️',
      gradient: 'from-orange-500 to-yellow-400'
    }
  ]

  const topContent = [
    {
      title: '10 AI Trends Shaping Marketing in 2025',
      type: 'Blog Post',
      views: 12400,
      engagement: 9.2,
      shares: 342,
      publishDate: '2024-01-15'
    },
    {
      title: 'Complete Guide to Content Marketing',
      type: 'Guide',
      views: 8750,
      engagement: 7.8,
      shares: 256,
      publishDate: '2024-01-12'
    },
    {
      title: 'Social Media Strategy for 2024',
      type: 'Article',
      views: 6890,
      engagement: 8.5,
      shares: 189,
      publishDate: '2024-01-10'
    },
    {
      title: 'Email Marketing Best Practices',
      type: 'Blog Post',
      views: 5640,
      engagement: 6.9,
      shares: 143,
      publishDate: '2024-01-08'
    }
  ]

  const audienceData = [
    { segment: 'Marketing Professionals', percentage: 35, color: 'bg-blue-500' },
    { segment: 'Small Business Owners', percentage: 28, color: 'bg-green-500' },
    { segment: 'Content Creators', percentage: 22, color: 'bg-purple-500' },
    { segment: 'Agencies', percentage: 15, color: 'bg-orange-500' }
  ]

  const trafficSources = [
    { source: 'Organic Search', visitors: 15420, percentage: 42 },
    { source: 'Social Media', visitors: 9680, percentage: 26 },
    { source: 'Direct', visitors: 6890, percentage: 19 },
    { source: 'Email', visitors: 3450, percentage: 9 },
    { source: 'Referral', visitors: 1560, percentage: 4 }
  ]

  const SimpleChart = ({ data, type = 'line' }: { data: any[], type?: string }) => {
    const maxValue = Math.max(...data.map(d => d.value))
    const minValue = Math.min(...data.map(d => d.value))
    const range = maxValue - minValue || 1

    return (
      <div className="h-64 flex items-end justify-between space-x-1 px-4">
        {data.map((point, index) => {
          const height = ((point.value - minValue) / range) * 200 + 20
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                style={{ height: `${height}px` }}
                title={`${point.date}: ${point.value}`}
              />
              <span className="text-xs text-gray-500 mt-2">
                {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          )
        })}
      </div>
    )
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
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-sm text-gray-500">Track your content performance and audience insights</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>

            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              📊 Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
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
            </div>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Performance Overview</h3>
              <div className="flex space-x-2">
                {['views', 'engagement'].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      selectedMetric === metric
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <SimpleChart data={chartData[selectedMetric as keyof typeof chartData]} />
          </div>

          {/* Audience Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Audience Segments</h3>
            <div className="space-y-4">
              {audienceData.map((segment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                    <span className="text-gray-700 font-medium">{segment.segment}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${segment.color}`}
                        style={{ width: `${segment.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600 font-semibold w-8">{segment.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl">💡</span>
                <h4 className="font-semibold text-gray-900">Insight</h4>
              </div>
              <p className="text-sm text-gray-600">
                Marketing professionals are your largest audience segment. Consider creating more advanced, professional content.
              </p>
            </div>
          </div>
        </div>

        {/* Content Performance & Traffic Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Content */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Top Performing Content</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View all →
              </button>
            </div>

            <div className="space-y-4">
              {topContent.map((content, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1 truncate">{content.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{content.type}</span>
                        <span>•</span>
                        <span>{new Date(content.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-gray-900">{content.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <span className="text-green-600">📈</span>
                        <span className="text-gray-600">{content.engagement}% engagement</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-blue-600">🔄</span>
                        <span className="text-gray-600">{content.shares} shares</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Traffic Sources</h3>

            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{source.visitors.toLocaleString()}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-600 font-semibold text-sm w-8">{source.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl">🎯</span>
                <h4 className="font-semibold text-gray-900">Opportunity</h4>
              </div>
              <p className="text-sm text-gray-600">
                Your organic search traffic is strong. Consider improving your social media presence to balance traffic sources.
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-gray-900">Real-time Activity</h3>
              <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Live</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">127</div>
              <div className="text-sm text-gray-600">Active readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">34</div>
              <div className="text-sm text-gray-600">New subscribers today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <div className="text-sm text-gray-600">Content pieces shared</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Most Popular Right Now</h4>
                <p className="text-sm text-gray-600">"10 AI Trends Shaping Marketing in 2025" - 23 active readers</p>
              </div>
              <button className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}