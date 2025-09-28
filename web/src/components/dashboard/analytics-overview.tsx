'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

// Mock data for the chart
const chartData = [
  { name: 'Mon', views: 120, engagement: 8.2 },
  { name: 'Tue', views: 190, engagement: 9.1 },
  { name: 'Wed', views: 300, engagement: 7.8 },
  { name: 'Thu', views: 280, engagement: 8.9 },
  { name: 'Fri', views: 450, engagement: 12.3 },
  { name: 'Sat', views: 380, engagement: 10.1 },
  { name: 'Sun', views: 290, engagement: 9.5 }
]

export default function AnalyticsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>
          Your content performance over the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">2,010</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+12%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Engagement</p>
                  <p className="text-2xl font-bold">9.4%</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+5%</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Content Pieces</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+3</span>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Generations</p>
                  <p className="text-2xl font-bold">47</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">+8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Chart Representation */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Weekly Performance</h4>
            <div className="space-y-3">
              {chartData.map((day) => (
                <div key={day.name} className="flex items-center space-x-4">
                  <div className="w-12 text-sm text-gray-600">{day.name}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(day.views / 450) * 100}%` }}
                        />
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">{day.views} views</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Content */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Top Performing Content</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">AI Trends in Marketing</span>
                <span className="text-sm text-green-600">12.3% engagement</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Product Launch Campaign</span>
                <span className="text-sm text-green-600">10.1% engagement</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Newsletter Updates</span>
                <span className="text-sm text-green-600">9.5% engagement</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}