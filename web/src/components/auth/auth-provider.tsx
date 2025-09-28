'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import { RootState, AppDispatch } from '@/store'
import { authService } from '@/services/auth-service'
import { setToken, clearAuth } from '@/store/slices/auth-slice'

const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/forgot-password']

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check if user has a valid token on app load
    const initAuth = async () => {
      const storedToken = authService.getToken()

      if (storedToken && !token) {
        try {
          // Validate token with backend
          await authService.checkAuth()
          dispatch(setToken(storedToken))
        } catch (error) {
          // Token is invalid, clear auth
          dispatch(clearAuth())
          authService.logout()
        }
      }
    }

    initAuth()
  }, [dispatch, token])

  useEffect(() => {
    // Redirect logic
    const isPublicRoute = publicRoutes.includes(pathname)

    if (!isAuthenticated && !isPublicRoute) {
      router.push('/auth/login')
    } else if (isAuthenticated && pathname.startsWith('/auth')) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, pathname, router])

  return <>{children}</>
}