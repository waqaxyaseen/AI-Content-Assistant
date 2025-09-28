import axios from 'axios'
import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Create axios instance
const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
authAPI.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = Cookies.get('refresh-token')
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken,
          })

          const { token } = response.data
          Cookies.set('auth-token', token, { expires: 7, secure: true, sameSite: 'strict' })

          originalRequest.headers.Authorization = `Bearer ${token}`
          return authAPI(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        Cookies.remove('auth-token')
        Cookies.remove('refresh-token')
        window.location.href = '/auth/login'
      }
    }

    return Promise.reject(error)
  }
)

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const response = await authAPI.post('/login', credentials)

    if (response.data.token) {
      Cookies.set('auth-token', response.data.token, { expires: 7, secure: true, sameSite: 'strict' })
    }
    if (response.data.refreshToken) {
      Cookies.set('refresh-token', response.data.refreshToken, { expires: 30, secure: true, sameSite: 'strict' })
    }

    return response
  },

  async register(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) {
    const response = await authAPI.post('/register', userData)

    if (response.data.token) {
      Cookies.set('auth-token', response.data.token, { expires: 7, secure: true, sameSite: 'strict' })
    }
    if (response.data.refreshToken) {
      Cookies.set('refresh-token', response.data.refreshToken, { expires: 30, secure: true, sameSite: 'strict' })
    }

    return response
  },

  async logout() {
    try {
      await authAPI.post('/logout')
    } finally {
      Cookies.remove('auth-token')
      Cookies.remove('refresh-token')
    }
  },

  async refreshToken() {
    const refreshToken = Cookies.get('refresh-token')
    const response = await authAPI.post('/refresh', { refreshToken })

    if (response.data.token) {
      Cookies.set('auth-token', response.data.token, { expires: 7, secure: true, sameSite: 'strict' })
    }

    return response
  },

  async updateProfile(profileData: any) {
    return await authAPI.put('/profile', profileData)
  },

  async forgotPassword(email: string) {
    return await authAPI.post('/forgot-password', { email })
  },

  async resetPassword(token: string, password: string) {
    return await authAPI.post('/reset-password', { token, password })
  },

  async verifyEmail(token: string) {
    return await authAPI.post('/verify-email', { token })
  },

  async resendVerification() {
    return await authAPI.post('/resend-verification')
  },

  async checkAuth() {
    const token = Cookies.get('auth-token')
    if (!token) {
      throw new Error('No token found')
    }

    return await authAPI.get('/me')
  },

  // Helper function to get current token
  getToken() {
    return Cookies.get('auth-token')
  },

  // Helper function to check if user is authenticated
  isAuthenticated() {
    return !!Cookies.get('auth-token')
  },
}

export { authAPI }