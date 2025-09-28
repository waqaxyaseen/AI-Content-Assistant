'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('active')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const campaigns = [
    {
      id: 1,
      name: 'Q1 Product Launch Campaign',
      type: 'Product Launch',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-03-31',
      budget: 15000,
      spent: 8500,
      reach: 125000,
      engagement: 8.2,
      conversions: 342,
      platforms: ['LinkedIn', 'Twitter', 'Email'],
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 2,
      name: 'Content Marketing Series',
      type: 'Content Marketing',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      budget: 25000,
      spent: 12300,
      reach: 89000,
      engagement: 9.1,
      conversions: 156,
      platforms: ['Blog', 'Social Media', 'Email'],
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 3,
      name: 'Brand Awareness Drive',
      type: 'Brand Awareness',
      status: 'Scheduled',
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      budget: 20000,
      spent: 0,
      reach: 0,
      engagement: 0,
      conversions: 0,
      platforms: ['Facebook', 'Instagram', 'YouTube'],
      color: 'from-purple-500 to-pink-400'
    },
    {
      id: 4,
      name: 'Holiday Season Push',
      type: 'Seasonal',
      status: 'Completed',
      startDate: '2023-11-01',
      endDate: '2023-12-31',
      budget: 30000,
      spent: 28500,
      reach: 245000,
      engagement: 7.8,
      conversions: 892,
      platforms: ['All Platforms'],
      color: 'from-orange-500 to-yellow-400'
    },
    {
      id: 5,
      name: 'Webinar Series Promotion',
      type: 'Lead Generation',
      status: 'Paused',
      startDate: '2024-01-10',
      endDate: '2024-03-15',
      budget: 8000,
      spent: 3200,
      reach: 34000,
      engagement: 6.5,
      conversions: 89,
      platforms: ['LinkedIn', 'Email'],
      color: 'from-indigo-500 to-purple-400'
    }
  ]

  const campaignTypes = [
    { value: 'product-launch', label: 'Product Launch', icon: '🚀' },
    { value: 'content-marketing', label: 'Content Marketing', icon: '📝' },
    { value: 'brand-awareness', label: 'Brand Awareness', icon: '🌟' },
    { value: 'lead-generation', label: 'Lead Generation', icon: '🎯' },
    { value: 'seasonal', label: 'Seasonal', icon: '🎄' },
    { value: 'retargeting', label: 'Retargeting', icon: '🔄' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700'
      case 'Paused':
        return 'bg-yellow-100 text-yellow-700'
      case 'Completed':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeTab === 'active') return campaign.status === 'Active'
    if (activeTab === 'scheduled') return campaign.status === 'Scheduled'
    if (activeTab === 'completed') return campaign.status === 'Completed'
    return true
  })

  const totalStats = {
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalReach: campaigns.reduce((sum, c) => sum + c.reach, 0),
    avgEngagement: campaigns.reduce((sum, c) => sum + c.engagement, 0) / campaigns.length,
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0)
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
              <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
              <p className="text-sm text-gray-500">Plan, execute, and track your marketing campaigns</p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            🚀 New Campaign
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">${totalStats.totalBudget.toLocaleString()}</p>
              </div>
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-blue-600">${totalStats.totalSpent.toLocaleString()}</p>
              </div>
              <span className="text-2xl">💳</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.totalReach.toLocaleString()}</p>
              </div>
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Engagement</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.avgEngagement.toFixed(1)}%</p>
              </div>
              <span className="text-2xl">📈</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-orange-600">{totalStats.totalConversions}</p>
              </div>
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        {/* Campaign Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex space-x-6">
                {[
                  { key: 'all', label: 'All Campaigns', count: campaigns.length },
                  { key: 'active', label: 'Active', count: campaigns.filter(c => c.status === 'Active').length },
                  { key: 'scheduled', label: 'Scheduled', count: campaigns.filter(c => c.status === 'Scheduled').length },
                  { key: 'completed', label: 'Completed', count: campaigns.filter(c => c.status === 'Completed').length }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.key ? 'bg-blue-200' : 'bg-gray-200'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Campaign List */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{campaign.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="text-lg font-semibold text-gray-900">${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Spent</p>
                      <p className="text-lg font-semibold text-blue-600">${campaign.spent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Reach</p>
                      <p className="text-lg font-semibold text-green-600">{campaign.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Conversions</p>
                      <p className="text-lg font-semibold text-purple-600">{campaign.conversions}</p>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Budget Used</span>
                      <span className="text-gray-900 font-medium">
                        {campaign.budget > 0 ? ((campaign.spent / campaign.budget) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Platforms</p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.platforms.map((platform) => (
                        <span key={platform} className="px-2 py-1 bg-white text-gray-600 text-xs rounded-full">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm text-gray-700">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🚀</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
                <p className="text-gray-500 mb-6">Create your first campaign to get started with marketing automation.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Create Campaign
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaignTypes.slice(0, 6).map((type) => (
              <button
                key={type.value}
                onClick={() => setShowCreateModal(true)}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-purple-50 hover:shadow-lg transition-all text-left group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{type.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{type.label}</h4>
                    <p className="text-sm text-gray-600">Create campaign</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Campaign</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter campaign name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {campaignTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{type.icon}</span>
                        <span className="font-medium">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter budget amount..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  placeholder="Describe your campaign goals and strategy..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}