'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('workflows')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const workflows = [
    {
      id: 1,
      name: 'Daily Blog Post Generation',
      description: 'Automatically generate and schedule blog posts based on trending topics',
      status: 'Active',
      trigger: 'Schedule',
      frequency: 'Daily at 9:00 AM',
      lastRun: '2 hours ago',
      nextRun: '22 hours',
      success: 95,
      actions: ['Generate Content', 'SEO Optimization', 'Schedule Post'],
      icon: '📝',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 2,
      name: 'Social Media Cross-posting',
      description: 'Share new blog posts across all social media platforms',
      status: 'Active',
      trigger: 'Content Published',
      frequency: 'On trigger',
      lastRun: '5 hours ago',
      nextRun: 'On next trigger',
      success: 88,
      actions: ['Format Content', 'Add Hashtags', 'Post to Platforms'],
      icon: '📱',
      color: 'from-green-500 to-emerald-400'
    },
    {
      id: 3,
      name: 'Email Newsletter Automation',
      description: 'Weekly roundup of top-performing content sent to subscribers',
      status: 'Active',
      trigger: 'Schedule',
      frequency: 'Weekly on Fridays',
      lastRun: '3 days ago',
      nextRun: '4 days',
      success: 92,
      actions: ['Compile Content', 'Personalize', 'Send Email'],
      icon: '📧',
      color: 'from-purple-500 to-pink-400'
    },
    {
      id: 4,
      name: 'Content Performance Alerts',
      description: 'Send notifications when content reaches performance thresholds',
      status: 'Paused',
      trigger: 'Metrics',
      frequency: 'Real-time',
      lastRun: '1 day ago',
      nextRun: 'Paused',
      success: 100,
      actions: ['Monitor Metrics', 'Check Thresholds', 'Send Alert'],
      icon: '📊',
      color: 'from-orange-500 to-yellow-400'
    },
    {
      id: 5,
      name: 'SEO Content Optimization',
      description: 'Automatically optimize content for search engines',
      status: 'Draft',
      trigger: 'Content Created',
      frequency: 'On trigger',
      lastRun: 'Never',
      nextRun: 'Not active',
      success: 0,
      actions: ['Analyze Keywords', 'Optimize Content', 'Update Meta Tags'],
      icon: '🔍',
      color: 'from-indigo-500 to-purple-400'
    }
  ]

  const templates = [
    {
      id: 1,
      name: 'Content Publishing Pipeline',
      description: 'Create, review, approve, and publish content',
      icon: '🔄',
      category: 'Content',
      estimatedSaves: '5 hours/week'
    },
    {
      id: 2,
      name: 'Social Media Scheduler',
      description: 'Schedule posts across multiple platforms',
      icon: '📅',
      category: 'Social Media',
      estimatedSaves: '3 hours/week'
    },
    {
      id: 3,
      name: 'Lead Nurturing Campaign',
      description: 'Automated email sequences for leads',
      icon: '🎯',
      category: 'Email Marketing',
      estimatedSaves: '8 hours/week'
    },
    {
      id: 4,
      name: 'Performance Monitoring',
      description: 'Track and alert on content performance',
      icon: '📈',
      category: 'Analytics',
      estimatedSaves: '2 hours/week'
    }
  ]

  const integrations = [
    { name: 'WordPress', status: 'Connected', icon: '🌐', color: 'bg-blue-100 text-blue-700' },
    { name: 'Twitter', status: 'Connected', icon: '🐦', color: 'bg-blue-100 text-blue-700' },
    { name: 'LinkedIn', status: 'Connected', icon: '💼', color: 'bg-blue-100 text-blue-700' },
    { name: 'Mailchimp', status: 'Connected', icon: '📧', color: 'bg-green-100 text-green-700' },
    { name: 'Google Analytics', status: 'Connected', icon: '📊', color: 'bg-orange-100 text-orange-700' },
    { name: 'Slack', status: 'Available', icon: '💬', color: 'bg-gray-100 text-gray-700' },
    { name: 'Zapier', status: 'Available', icon: '⚡', color: 'bg-gray-100 text-gray-700' },
    { name: 'HubSpot', status: 'Available', icon: '🎯', color: 'bg-gray-100 text-gray-700' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Paused':
        return 'bg-yellow-100 text-yellow-700'
      case 'Draft':
        return 'bg-gray-100 text-gray-700'
      case 'Error':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const totalStats = {
    activeWorkflows: workflows.filter(w => w.status === 'Active').length,
    timeSaved: '24 hours/week',
    successRate: Math.round(workflows.reduce((sum, w) => sum + w.success, 0) / workflows.length),
    totalRuns: 1247
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
              <h1 className="text-2xl font-bold text-gray-900">Automation Workflows</h1>
              <p className="text-sm text-gray-500">Automate your content creation and publishing workflows</p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            ⚡ Create Workflow
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Workflows</p>
                <p className="text-3xl font-bold text-green-600">{totalStats.activeWorkflows}</p>
              </div>
              <span className="text-3xl">⚡</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Saved</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.timeSaved}</p>
              </div>
              <span className="text-3xl">⏰</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-purple-600">{totalStats.successRate}%</p>
              </div>
              <span className="text-3xl">✅</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Runs</p>
                <p className="text-3xl font-bold text-orange-600">{totalStats.totalRuns}</p>
              </div>
              <span className="text-3xl">🚀</span>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex space-x-6">
                {[
                  { key: 'workflows', label: 'Workflows', icon: '⚙️' },
                  { key: 'templates', label: 'Templates', icon: '📋' },
                  { key: 'integrations', label: 'Integrations', icon: '🔗' }
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
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Workflows Tab */}
            {activeTab === 'workflows' && (
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${workflow.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <span className="text-2xl filter drop-shadow-md">{workflow.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(workflow.status)}`}>
                              {workflow.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Trigger: {workflow.trigger}</span>
                            <span>•</span>
                            <span>{workflow.frequency}</span>
                            <span>•</span>
                            <span>Success: {workflow.success}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Last Run</p>
                        <p className="text-sm font-medium text-gray-900">{workflow.lastRun}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Next Run</p>
                        <p className="text-sm font-medium text-gray-900">{workflow.nextRun}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Success Rate</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${workflow.success}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{workflow.success}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Actions</p>
                      <div className="flex flex-wrap gap-2">
                        {workflow.actions.map((action) => (
                          <span key={action} className="px-3 py-1 bg-white text-gray-600 text-xs rounded-full border">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {workflow.status === 'Active' ? (
                          <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm">
                            Pause
                          </button>
                        ) : (
                          <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                            Activate
                          </button>
                        )}
                        <button className="px-3 py-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm border">
                          Edit
                        </button>
                      </div>
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        View Logs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Workflow Templates</h3>
                  <p className="text-gray-600">Get started quickly with pre-built automation templates</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <div key={template.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-2xl">{template.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {template.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <span>💰</span>
                          <span>Saves {template.estimatedSaves}</span>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Use Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Workflow Builder</h3>
                      <p className="text-gray-600">Build your own automation workflows from scratch</p>
                    </div>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      Build Custom
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Connected Services</h3>
                  <p className="text-gray-600">Manage your integrations and connect new services</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {integrations.map((integration) => (
                    <div key={integration.name} className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{integration.icon}</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${integration.color}`}>
                          {integration.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{integration.name}</h4>
                      <button className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        integration.status === 'Connected'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}>
                        {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Need More Integrations?</h3>
                      <p className="text-gray-600">Request new integrations or use our webhook system</p>
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors">
                        Request Integration
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Webhooks
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create New Workflow</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter workflow name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  placeholder="Describe what this workflow does..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trigger</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a trigger...</option>
                  <option value="schedule">Schedule</option>
                  <option value="content-published">Content Published</option>
                  <option value="metrics">Metrics Threshold</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
                <div className="space-y-2">
                  {['Generate Content', 'SEO Optimization', 'Schedule Post', 'Send Notification'].map(action => (
                    <label key={action} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">{action}</span>
                    </label>
                  ))}
                </div>
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
                  Create Workflow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}