import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authAPI } from '@/services/auth-service'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  plan: 'starter' | 'professional' | 'enterprise'
  role: 'user' | 'admin'
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (
    userData: {
      email: string
      password: string
      firstName: string
      lastName: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await authAPI.register(userData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, { getState }) => {
  try {
    const state = getState() as { auth: AuthState }
    if (state.auth.token) {
      await authAPI.logout()
    }
  } catch (error) {
    console.warn('Logout API call failed:', error)
  }
})

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState }
      if (!state.auth.token) {
        throw new Error('No token available')
      }
      const response = await authAPI.refreshToken()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Token refresh failed')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateProfile(profileData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    })

    // Refresh Token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.error = null
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, updateUser, clearAuth, setToken } = authSlice.actions

export default authSlice