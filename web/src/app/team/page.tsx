'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState('members')
  const [showInviteModal, setShowInviteModal] = useState(false)

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      role: 'Admin',
      department: 'Marketing',
      status: 'Active',
      avatar: 'JD',
      joinDate: '2023-06-15',
      lastActive: '2 hours ago',
      contentCreated: 47,
      permissions: ['All Access'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@company.com',
      role: 'Content Manager',
      department: 'Marketing',
      status: 'Active',
      avatar: 'SW',
      joinDate: '2023-08-22',
      lastActive: '1 hour ago',
      contentCreated: 89,
      permissions: ['Create Content', 'Edit Content', 'View Analytics'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike@company.com',
      role: 'Writer',
      department: 'Content',
      status: 'Active',
      avatar: 'MC',
      joinDate: '2023-09-10',
      lastActive: '30 minutes ago',
      contentCreated: 156,
      permissions: ['Create Content', 'Edit Own Content'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily@company.com',
      role: 'Designer',
      department: 'Creative',
      status: 'Active',
      avatar: 'ER',
      joinDate: '2023-07-03',
      lastActive: '45 minutes ago',
      contentCreated: 23,
      permissions: ['Create Visual Content', 'View Content'],
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david@company.com',
      role: 'Social Media Manager',
      department: 'Marketing',
      status: 'Inactive',
      avatar: 'DK',
      joinDate: '2023-05-18',
      lastActive: '3 days ago',
      contentCreated: 67,
      permissions: ['Social Media', 'View Analytics'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      email: 'lisa@company.com',
      role: 'Editor',
      department: 'Content',
      status: 'Pending',
      avatar: 'LT',
      joinDate: '2024-01-15',
      lastActive: 'Never',
      contentCreated: 0,
      permissions: ['Edit Content', 'Review Content'],
      color: 'from-pink-500 to-red-500'
    }
  ]

  const roles = [
    {
      name: 'Admin',
      description: 'Full access to all features and settings',
      permissions: ['All Access'],
      count: teamMembers.filter(m => m.role === 'Admin').length,
      color: 'bg-red-100 text-red-700'
    },
    {
      name: 'Content Manager',
      description: 'Manage content strategy and team workflows',
      permissions: ['Create Content', 'Edit Content', 'View Analytics', 'Manage Team'],
      count: teamMembers.filter(m => m.role === 'Content Manager').length,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Writer',
      description: 'Create and edit written content',
      permissions: ['Create Content', 'Edit Own Content'],
      count: teamMembers.filter(m => m.role === 'Writer').length,
      color: 'bg-green-100 text-green-700'
    },
    {
      name: 'Designer',
      description: 'Create visual content and graphics',
      permissions: ['Create Visual Content', 'View Content'],
      count: teamMembers.filter(m => m.role === 'Designer').length,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Social Media Manager',
      description: 'Manage social media content and campaigns',
      permissions: ['Social Media', 'View Analytics'],
      count: teamMembers.filter(m => m.role === 'Social Media Manager').length,
      color: 'bg-pink-100 text-pink-700'
    },
    {
      name: 'Editor',
      description: 'Review and edit content before publication',
      permissions: ['Edit Content', 'Review Content'],
      count: teamMembers.filter(m => m.role === 'Editor').length,
      color: 'bg-orange-100 text-orange-700'
    }
  ]

  const departments = [
    { name: 'Marketing', count: teamMembers.filter(m => m.department === 'Marketing').length, color: 'bg-blue-500' },
    { name: 'Content', count: teamMembers.filter(m => m.department === 'Content').length, color: 'bg-green-500' },
    { name: 'Creative', count: teamMembers.filter(m => m.department === 'Creative').length, color: 'bg-purple-500' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Inactive':
        return 'bg-gray-100 text-gray-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const totalStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.status === 'Active').length,
    totalContent: teamMembers.reduce((sum, m) => sum + m.contentCreated, 0),
    pendingInvites: teamMembers.filter(m => m.status === 'Pending').length
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
              <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
              <p className="text-sm text-gray-500">Manage your team members, roles, and permissions</p>
            </div>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            👥 Invite Member
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Team Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.totalMembers}</p>
              </div>
              <span className="text-3xl">👥</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Members</p>
                <p className="text-3xl font-bold text-green-600">{totalStats.activeMembers}</p>
              </div>
              <span className="text-3xl">✅</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Content Created</p>
                <p className="text-3xl font-bold text-blue-600">{totalStats.totalContent}</p>
              </div>
              <span className="text-3xl">📝</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Invites</p>
                <p className="text-3xl font-bold text-yellow-600">{totalStats.pendingInvites}</p>
              </div>
              <span className="text-3xl">⏳</span>
            </div>
          </div>
        </div>

        {/* Team Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex space-x-6">
                {[
                  { key: 'members', label: 'Team Members', icon: '👥' },
                  { key: 'roles', label: 'Roles & Permissions', icon: '🛡️' },
                  { key: 'departments', label: 'Departments', icon: '🏢' }
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
            {/* Team Members Tab */}
            {activeTab === 'members' && (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold text-lg">{member.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                              {member.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{member.email}</span>
                            <span>•</span>
                            <span>{member.role}</span>
                            <span>•</span>
                            <span>{member.department}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{member.contentCreated}</p>
                          <p className="text-xs text-gray-500">content pieces</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Last active</p>
                          <p className="text-xs text-gray-500">{member.lastActive}</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {member.permissions.map((permission) => (
                          <span key={permission} className="px-2 py-1 bg-white text-gray-600 text-xs rounded-full">
                            {permission}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Edit Role
                        </button>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Roles & Permissions Tab */}
            {activeTab === 'roles' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map((role) => (
                  <div key={role.name} className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${role.color}`}>
                          {role.count} members
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{role.description}</p>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Permissions</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <span key={permission} className="px-2 py-1 bg-white text-gray-600 text-xs rounded-full">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Edit Role
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Assign
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Departments Tab */}
            {activeTab === 'departments' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {departments.map((dept) => (
                    <div key={dept.name} className="bg-gray-50 rounded-2xl p-6 text-center">
                      <div className={`w-16 h-16 ${dept.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-white text-2xl">🏢</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{dept.name}</h3>
                      <p className="text-3xl font-bold text-gray-600 mb-4">{dept.count}</p>
                      <p className="text-sm text-gray-500 mb-4">team members</p>
                      <button className="w-full px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        View Members
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Department Insights</h3>
                      <p className="text-gray-600">Track performance across different departments</p>
                    </div>
                    <button className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                      View Analytics
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600">Most Productive</p>
                      <p className="text-lg font-semibold text-gray-900">Content Team</p>
                      <p className="text-xs text-green-600">245 pieces this month</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600">Fastest Growing</p>
                      <p className="text-lg font-semibold text-gray-900">Marketing</p>
                      <p className="text-xs text-blue-600">+3 members this quarter</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600">Most Collaborative</p>
                      <p className="text-lg font-semibold text-gray-900">Creative</p>
                      <p className="text-xs text-purple-600">89% cross-team projects</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Invite Team Member</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {roles.map(role => (
                    <option key={role.name} value={role.name}>{role.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {departments.map(dept => (
                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  placeholder="Add a personal message..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}