import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useApp } from '../contexts/AppContext'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const { user, logout } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (path: string) => {
    return router.pathname === path
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-sm shadow-2xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">✨</span>
              </div>
              <span className="text-white font-bold text-lg">Content AI</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            <Link href="/dashboard" className={`group flex items-center px-3 py-2.5 rounded-xl transition-all ${
              isActive('/dashboard') 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">🏠</span>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/generate" className={`group flex items-center px-3 py-2.5 rounded-xl transition-all ${
              isActive('/generate')
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">✨</span>
              <span>Generate Content</span>
            </Link>
            <Link href="/history" className={`group flex items-center px-3 py-2.5 rounded-xl transition-all ${
              isActive('/history')
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">📚</span>
              <span>History</span>
            </Link>
            <Link href="/analytics" className={`group flex items-center px-3 py-2.5 rounded-xl transition-all ${
              isActive('/analytics')
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">📊</span>
              <span>Analytics</span>
            </Link>
            <Link href="/settings" className={`group flex items-center px-3 py-2.5 rounded-xl transition-all ${
              isActive('/settings')
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <span className="mr-3 text-lg">⚙️</span>
              <span>Settings</span>
            </Link>
            {user?.plan === 'free' && (
              <Link href="/pricing" className="group flex items-center px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md mt-4">
                <span className="mr-3 text-lg">🚀</span>
                <span className="font-medium">Upgrade Plan</span>
              </Link>
            )}
          </nav>

          {/* User Profile */}
          <div className="p-3 border-t bg-gray-50/80">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-sm">
                  {user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate" title={user?.email}>
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center"
            >
              <span className="mr-2">🚪</span> Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-200/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search content..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <Link href="/admin" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}