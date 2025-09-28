import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  company?: string
  plan: 'free' | 'starter' | 'professional' | 'enterprise'
  generationsUsed: number
  generationsLimit: number
}

interface AppContextType {
  // User & Auth
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: any) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void

  // App State
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // Content Generation
  generationHistory: any[]
  addToHistory: (item: any) => void
  clearHistory: () => void

  // Subscription
  currentPlan: string
  upgradePlan: (plan: string) => void

  // Settings
  settings: {
    theme: 'light' | 'dark'
    language: string
    notifications: boolean
  }
  updateSettings: (updates: any) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [generationHistory, setGenerationHistory] = useState<any[]>([])
  const [settings, setSettings] = useState({
    theme: 'light' as const,
    language: 'en',
    notifications: true
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser({
          id: userData.id || '1',
          firstName: userData.firstName || 'John',
          lastName: userData.lastName || 'Doe',
          email: userData.email || 'john@example.com',
          company: userData.company,
          plan: userData.plan || 'free',
          generationsUsed: userData.generationsUsed || 0,
          generationsLimit: userData.generationsLimit || 10
        })
      } catch (error) {
        console.error('Error loading user:', error)
      }
    }

    // Load generation history
    const savedHistory = localStorage.getItem('contentHistory')
    if (savedHistory) {
      try {
        setGenerationHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Error loading history:', error)
      }
    }

    // Load settings
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate login - in real app this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay

      // Create a mock user for demonstration
      const mockUser: User = {
        id: '1',
        firstName: email.split('@')[0] || 'User',
        lastName: 'Fitness',
        email: email,
        plan: 'free',
        generationsUsed: 0,
        generationsLimit: 10
      }

      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))

      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const signup = async (userData: any): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      // Call the actual signup API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Set user data from API response
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)

        setIsLoading(false)
        return { success: true }
      } else {
        console.error('Signup failed:', data.error)
        setIsLoading(false)
        return { success: false, error: data.error || 'Signup failed' }
      }
    } catch (error) {
      console.error('Signup error:', error)
      setIsLoading(false)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('authToken')
    router.push('/')
  }

  const updateUser = (updates: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const addToHistory = (item: any) => {
    const newHistory = [item, ...generationHistory].slice(0, 50)
    setGenerationHistory(newHistory)
    localStorage.setItem('contentHistory', JSON.stringify(newHistory))

    // Update user's generation count
    if (user) {
      updateUser({ generationsUsed: user.generationsUsed + 1 })
    }
  }

  const clearHistory = () => {
    setGenerationHistory([])
    localStorage.removeItem('contentHistory')
  }

  const upgradePlan = (plan: string) => {
    if (!user) return

    const planLimits: Record<string, number> = {
      free: 10,
      starter: 50,
      professional: 500,
      enterprise: -1 // unlimited
    }

    updateUser({
      plan: plan as any,
      generationsLimit: planLimits[plan] || 10
    })
  }

  const updateSettings = (updates: any) => {
    const newSettings = { ...settings, ...updates }
    setSettings(newSettings)
    localStorage.setItem('appSettings', JSON.stringify(newSettings))
  }

  const value: AppContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser,
    isLoading,
    setIsLoading,
    generationHistory,
    addToHistory,
    clearHistory,
    currentPlan: user?.plan || 'free',
    upgradePlan,
    settings,
    updateSettings
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}