import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useApp } from '../contexts/AppContext'
import DashboardLayout from '../components/DashboardLayout'

export default function SettingsPage() {
  const router = useRouter()
  const { user, updateUser, settings, updateSettings, logout, currentPlan, upgradePlan, isAuthenticated } = useApp()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Profile form
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: ''
  })

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Preferences
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    emailDigest: 'weekly',
    autoSave: true,
    defaultTone: 'professional',
    defaultLength: 'medium'
  })

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        company: user.company || ''
      })
    }

    if (settings) {
      setPreferences(prev => ({
        ...prev,
        ...settings
      }))
    }
  }, [user, settings, isAuthenticated, router])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: '', text: '' })

    try {
      // In production, call API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))

      updateUser({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        company: profileData.company
      })

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: '', text: '' })

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      setIsSaving(false)
      return
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' })
      setIsSaving(false)
      return
    }

    try {
      // In production, call API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))

      setMessage({ type: 'success', text: 'Password changed successfully!' })
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password' })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreferencesUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: '', text: '' })

    try {
      // Update context
      updateSettings(preferences)

      // In production, call API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))

      setMessage({ type: 'success', text: 'Preferences saved successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save preferences' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete all your data. Type "DELETE" to confirm.')) {
        // In production, call API endpoint
        logout()
        router.push('/')
      }
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'password', label: 'Password', icon: '🔐' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'api', label: 'API Keys', icon: '🔑' },
  ]

  return (
    <DashboardLayout>
      <Head>
        <title>Settings - AI Content Assistant</title>
        <meta name="description" content="Manage your account settings" />
      </Head>

      <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <div className="flex gap-8">
            {/* Tabs */}
            <div className="w-64">
              <div className="bg-white rounded-lg shadow-sm p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Current Plan</h3>
                <p className="text-2xl font-bold text-blue-600 capitalize mb-1">{currentPlan}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {user?.generationsUsed || 0} / {user?.generationsLimit || 10} generations used
                </p>
                <Link
                  href="/pricing"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Upgrade Plan
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleProfileUpdate}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          value={profileData.company}
                          onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`px-6 py-2 rounded-lg font-medium ${
                        isSaving
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                )}

                {/* Password Tab */}
                {activeTab === 'password' && (
                  <form onSubmit={handlePasswordChange}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>

                    <div className="space-y-6 mb-6 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`px-6 py-2 rounded-lg font-medium ${
                        isSaving
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSaving ? 'Changing...' : 'Change Password'}
                    </button>
                  </form>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <form onSubmit={handlePreferencesUpdate}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Content Tone
                        </label>
                        <select
                          value={preferences.defaultTone}
                          onChange={(e) => setPreferences(prev => ({ ...prev, defaultTone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="professional">Professional</option>
                          <option value="casual">Casual</option>
                          <option value="friendly">Friendly</option>
                          <option value="formal">Formal</option>
                          <option value="humorous">Humorous</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Content Length
                        </label>
                        <select
                          value={preferences.defaultLength}
                          onChange={(e) => setPreferences(prev => ({ ...prev, defaultLength: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="short">Short (50-150 words)</option>
                          <option value="medium">Medium (150-500 words)</option>
                          <option value="long">Long (500-1500 words)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Digest
                        </label>
                        <select
                          value={preferences.emailDigest}
                          onChange={(e) => setPreferences(prev => ({ ...prev, emailDigest: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="never">Never</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={preferences.notifications}
                            onChange={(e) => setPreferences(prev => ({ ...prev, notifications: e.target.checked }))}
                            className="mr-3"
                          />
                          <span className="text-sm text-gray-700">Enable notifications</span>
                        </label>

                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={preferences.autoSave}
                            onChange={(e) => setPreferences(prev => ({ ...prev, autoSave: e.target.checked }))}
                            className="mr-3"
                          />
                          <span className="text-sm text-gray-700">Auto-save generated content</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`mt-6 px-6 py-2 rounded-lg font-medium ${
                        isSaving
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isSaving ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </form>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing & Subscription</h2>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Current Plan</h3>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-gray-900 capitalize">{currentPlan} Plan</p>
                          <p className="text-gray-600">
                            {currentPlan === 'free' ? 'Limited features' : 'All features included'}
                          </p>
                        </div>
                        <Link
                          href="/pricing"
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Change Plan
                        </Link>
                      </div>

                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-2">Usage this month</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${((user?.generationsUsed || 0) / (user?.generationsLimit || 10)) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-700">
                            {user?.generationsUsed || 0} / {user?.generationsLimit || 10}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Payment Method</h3>
                      <p className="text-gray-600">No payment method on file</p>
                      <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Add Payment Method
                      </button>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                      <h3 className="font-semibold text-gray-900 mb-4">Danger Zone</h3>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}

                {/* API Tab */}
                {activeTab === 'api' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">API Keys</h2>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> API access is available for Professional and Enterprise plans only.
                      </p>
                    </div>

                    {currentPlan === 'professional' || currentPlan === 'enterprise' ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-4">Your API Key</h3>
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value="sk-proj-xxxxxxxxxxxxxxxxxxxx"
                              readOnly
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                              Copy
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                              Regenerate
                            </button>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">API Usage</h3>
                          <p className="text-gray-600 mb-4">Last 30 days</p>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-700">Total Requests</span>
                              <span className="font-semibold">1,234</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-gray-700">Remaining</span>
                              <span className="font-semibold">8,766</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                          <p className="text-gray-600 mb-2">Learn how to integrate our API</p>
                          <a href="#" className="text-blue-600 hover:text-blue-700">
                            View API Documentation →
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-6xl mb-4">🔐</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upgrade to Access API</h3>
                        <p className="text-gray-600 mb-6">
                          API access is available for Professional and Enterprise plans
                        </p>
                        <Link
                          href="/pricing"
                          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          View Plans
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}