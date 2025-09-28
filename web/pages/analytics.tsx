import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useApp } from '../contexts/AppContext'
import DashboardLayout from '../components/DashboardLayout'

export default function AnalyticsPage() {
  const router = useRouter()
  const { user, generationHistory, isAuthenticated } = useApp()
  const [timeRange, setTimeRange] = useState('7days')
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Calculate analytics from history
    const history = JSON.parse(localStorage.getItem('contentHistory') || '[]')

    const now = new Date()
    const ranges = {
      '7days': 7,
      '30days': 30,
      '90days': 90,
      'all': 999999
    }

    const daysAgo = ranges[timeRange as keyof typeof ranges]
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000))

    const filteredHistory = history.filter((item: any) =>
      new Date(item.timestamp) >= cutoffDate
    )

    // Calculate metrics
    const contentByType: any = {}
    const contentByTone: any = {}
    const contentByDay: any = {}
    let totalWords = 0
    let totalChars = 0

    filteredHistory.forEach((item: any) => {
      // By type
      contentByType[item.type] = (contentByType[item.type] || 0) + 1

      // By tone
      contentByTone[item.tone] = (contentByTone[item.tone] || 0) + 1

      // By day
      const day = new Date(item.timestamp).toLocaleDateString()
      contentByDay[day] = (contentByDay[day] || 0) + 1

      // Word/char count
      const words = item.content.split(/\s+/).length
      const chars = item.content.length
      totalWords += words
      totalChars += chars
    })

    // Generate chart data for the last 7 days
    const chartData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000))
      const dateStr = date.toLocaleDateString()
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
      chartData.push({
        day: dayName,
        count: contentByDay[dateStr] || 0
      })
    }

    setAnalytics({
      totalGenerations: filteredHistory.length,
      totalWords,
      totalChars,
      avgWords: filteredHistory.length > 0 ? Math.round(totalWords / filteredHistory.length) : 0,
      contentByType,
      contentByTone,
      chartData,
      topContent: filteredHistory.slice(0, 5)
    })
  }, [timeRange, generationHistory, isAuthenticated, router])

  const stats = [
    {
      label: 'Total Generations',
      value: analytics?.totalGenerations || 0,
      icon: '📊',
      change: '+12%',
      positive: true
    },
    {
      label: 'Total Words',
      value: analytics?.totalWords?.toLocaleString() || '0',
      icon: '✍️',
      change: '+8%',
      positive: true
    },
    {
      label: 'Avg Words/Content',
      value: analytics?.avgWords || 0,
      icon: '📈',
      change: '+15%',
      positive: true
    },
    {
      label: 'Usage Rate',
      value: `${user?.generationsUsed || 0}/${user?.generationsLimit || 10}`,
      icon: '⚡',
      change: '60%',
      positive: true
    }
  ]

  const contentTypes = [
    { type: 'blog', icon: '📝', color: 'bg-blue-500' },
    { type: 'social', icon: '📱', color: 'bg-green-500' },
    { type: 'email', icon: '✉️', color: 'bg-purple-500' },
    { type: 'ad', icon: '📢', color: 'bg-orange-500' },
    { type: 'product', icon: '🛍️', color: 'bg-pink-500' },
    { type: 'video', icon: '🎥', color: 'bg-red-500' },
  ]

  return (
    <DashboardLayout>
      <Head>
        <title>Analytics - AI Content Assistant</title>
        <meta name="description" content="View your content generation analytics" />
      </Head>

      <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
              <p className="text-gray-600">Track your content generation performance</p>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
              {['7days', '30days', '90days', 'all'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range === '7days' ? 'Last 7 Days' :
                   range === '30days' ? 'Last 30 Days' :
                   range === '90days' ? 'Last 90 Days' : 'All Time'}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <span className={`text-sm font-medium ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation Trend</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {analytics?.chartData?.map((day: any, index: number) => {
                  const height = day.count > 0 ? Math.max(20, (day.count / Math.max(...analytics.chartData.map((d: any) => d.count))) * 100) : 10
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-500 rounded-t" style={{ height: `${height}%` }}>
                        {day.count > 0 && (
                          <div className="text-xs text-white text-center pt-1">{day.count}</div>
                        )}
                      </div>
                      <span className="text-xs text-gray-600 mt-2">{day.day}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Content Type Breakdown */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Types</h3>
              <div className="space-y-3">
                {contentTypes.map((type) => {
                  const count = analytics?.contentByType?.[type.type] || 0
                  const total = analytics?.totalGenerations || 1
                  const percentage = Math.round((count / total) * 100) || 0

                  return (
                    <div key={type.type}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span>{type.icon}</span>
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {type.type}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${type.color} h-2 rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            {/* Tone Distribution */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tone Distribution</h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(analytics?.contentByTone || {}).map(([tone, count]: any) => (
                  <div key={tone} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{count}</div>
                    <div className="text-sm text-gray-600 capitalize">{tone}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Content</h3>
              <div className="space-y-3">
                {analytics?.topContent?.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.prompt}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href="/history"
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-blue-50 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Insights</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Most Used Type</p>
                <p className="font-semibold text-gray-900">
                  {Object.entries(analytics?.contentByType || {}).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'N/A'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Peak Day</p>
                <p className="font-semibold text-gray-900">
                  {analytics?.chartData?.reduce((max: any, day: any) =>
                    day.count > (max?.count || 0) ? day : max
                  , {})?.day || 'N/A'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Productivity Score</p>
                <p className="font-semibold text-gray-900">
                  {analytics?.totalGenerations > 10 ? 'High' :
                   analytics?.totalGenerations > 5 ? 'Medium' : 'Low'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}