'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Form states
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@company.com',
    company: 'Tech Corp',
    role: 'Content Manager',
    timezone: 'America/New_York',
    language: 'en'
  })

  const [preferences, setPreferences] = useState({
    theme: 'light',
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    aiSuggestions: true,
    autoSave: true,
    defaultContentType: 'blog-post'
  })

  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk-****************************',
    webhookUrl: 'https://company.com/webhook',
    rateLimits: true,
    ipWhitelist: ''
  })

  const integrations = [
    { name: 'WordPress', status: 'Connected', icon: '🌐', description: 'Publish content directly to WordPress' },
    { name: 'Mailchimp', status: 'Connected', icon: '📧', description: 'Sync email campaigns and lists' },
    { name: 'Google Analytics', status: 'Connected', icon: '📊', description: 'Track content performance' },
    { name: 'Twitter', status: 'Connected', icon: '🐦', description: 'Auto-post to Twitter' },
    { name: 'LinkedIn', status: 'Connected', icon: '💼', description: 'Share content on LinkedIn' },
    { name: 'Slack', status: 'Available', icon: '💬', description: 'Get notifications in Slack' },
    { name: 'HubSpot', status: 'Available', icon: '🎯', description: 'Sync with HubSpot CRM' },
    { name: 'Zapier', status: 'Available', icon: '⚡', description: 'Connect to 1000+ apps' }
  ]

  const billingHistory = [
    { date: '2024-01-01', amount: '$99.00', plan: 'Pro Plan', status: 'Paid' },
    { date: '2023-12-01', amount: '$99.00', plan: 'Pro Plan', status: 'Paid' },
    { date: '2023-11-01', amount: '$99.00', plan: 'Pro Plan', status: 'Paid' },
    { date: '2023-10-01', amount: '$49.00', plan: 'Basic Plan', status: 'Paid' }
  ]

  const securityLogs = [
    { action: 'Login', ip: '192.168.1.1', location: 'New York, US', date: '2024-01-15 09:30 AM' },
    { action: 'Password Changed', ip: '192.168.1.1', location: 'New York, US', date: '2024-01-10 02:15 PM' },
    { action: 'Login', ip: '10.0.0.5', location: 'San Francisco, US', date: '2024-01-08 11:45 AM' },
    { action: 'API Key Generated', ip: '192.168.1.1', location: 'New York, US', date: '2024-01-05 04:20 PM' }
  ]

  const handleSaveProfile = () => {
    // Save profile logic
    alert('Profile updated successfully!')
  }

  const handleSavePreferences = () => {
    // Save preferences logic
    alert('Preferences updated successfully!')
  }

  const handleRegenerateApiKey = () => {
    const newKey = 'sk-' + Math.random().toString(36).substring(2, 30) + '...'
    setApiSettings({ ...apiSettings, apiKey: newKey })
    alert('New API key generated!')
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
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500">Manage your account, preferences, and integrations</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-semibold rounded-full">
              ✨ Pro Plan
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <nav className="space-y-2">
                {[
                  { key: 'profile', label: 'Profile', icon: '👤' },
                  { key: 'preferences', label: 'Preferences', icon: '⚙️' },
                  { key: 'integrations', label: 'Integrations', icon: '🔗' },
                  { key: 'billing', label: 'Billing', icon: '💳' },
                  { key: 'api', label: 'API & Webhooks', icon: '🔑' },
                  { key: 'security', label: 'Security', icon: '🛡️' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">JD</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                      <p className="text-gray-600">Update your personal information and account details</p>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <input
                          type="text"
                          value={profile.company}
                          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <input
                          type="text"
                          value={profile.role}
                          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select
                          value={profile.timezone}
                          onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Chicago">Central Time</option>
                          <option value="America/Denver">Mountain Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                          <option value="Europe/London">London</option>
                          <option value="Europe/Berlin">Berlin</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                          value={profile.language}
                          onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferences</h2>

                  <div className="space-y-8">
                    {/* Theme Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                          <div className="flex space-x-4">
                            {['light', 'dark', 'auto'].map(theme => (
                              <button
                                key={theme}
                                onClick={() => setPreferences({ ...preferences, theme })}
                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                  preferences.theme === theme
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates about your content' },
                          { key: 'pushNotifications', label: 'Push Notifications', description: 'Get browser notifications for important updates' },
                          { key: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly performance summaries' },
                          { key: 'aiSuggestions', label: 'AI Suggestions', description: 'Get AI-powered content suggestions' }
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.label}</h4>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                            <button
                              onClick={() => setPreferences({ ...preferences, [item.key]: !preferences[item.key as keyof typeof preferences] })}
                              className={`w-12 h-6 rounded-full transition-colors ${
                                preferences[item.key as keyof typeof preferences] ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                            >
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                preferences[item.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-1'
                              }`}></div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Default Content Type</label>
                          <select
                            value={preferences.defaultContentType}
                            onChange={(e) => setPreferences({ ...preferences, defaultContentType: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="blog-post">Blog Post</option>
                            <option value="social-media">Social Media</option>
                            <option value="email">Email</option>
                            <option value="article">Article</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Auto-save</h4>
                            <p className="text-sm text-gray-600">Automatically save content while editing</p>
                          </div>
                          <button
                            onClick={() => setPreferences({ ...preferences, autoSave: !preferences.autoSave })}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              preferences.autoSave ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSavePreferences}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Integrations</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {integrations.map((integration) => (
                      <div key={integration.name} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{integration.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            integration.status === 'Connected'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {integration.status}
                          </span>
                        </div>
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
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing & Subscription</h2>

                  {/* Current Plan */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Plan</h3>
                        <p className="text-gray-600 mb-4">Unlimited AI generations, advanced analytics, and priority support</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>$99/month</span>
                          <span>•</span>
                          <span>Next billing: February 1, 2024</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <button className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-50 transition-colors mb-2 block">
                          Manage Plan
                        </button>
                        <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Cancel Plan
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
                    <div className="space-y-3">
                      {billingHistory.map((bill, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{bill.plan}</p>
                            <p className="text-sm text-gray-600">{bill.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{bill.amount}</p>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              {bill.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* API Tab */}
              {activeTab === 'api' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">API & Webhooks</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">API Key</h3>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          value={apiSettings.apiKey}
                          readOnly
                          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                        />
                        <button
                          onClick={handleRegenerateApiKey}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Regenerate
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Keep your API key secure and don't share it publicly.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                      <input
                        type="url"
                        value={apiSettings.webhookUrl}
                        onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://your-domain.com/webhook"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Rate Limits</h4>
                        <p className="text-sm text-gray-600">Enforce API rate limiting</p>
                      </div>
                      <button
                        onClick={() => setApiSettings({ ...apiSettings, rateLimits: !apiSettings.rateLimits })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          apiSettings.rateLimits ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          apiSettings.rateLimits ? 'translate-x-6' : 'translate-x-1'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security</h2>

                  <div className="space-y-8">
                    {/* Password */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Change Password
                      </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Enable 2FA</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Enable
                        </button>
                      </div>
                    </div>

                    {/* Security Log */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {securityLogs.map((log, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{log.action}</p>
                              <p className="text-sm text-gray-600">{log.location} • {log.ip}</p>
                            </div>
                            <p className="text-sm text-gray-500">{log.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                        <p className="text-sm text-red-700 mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block">⚠️</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Account</h2>
              <p className="text-gray-600">This action is permanent and cannot be undone.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "DELETE" to confirm
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="DELETE"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}