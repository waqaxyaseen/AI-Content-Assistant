import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  notifications: Array<{
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    timestamp: string
    read: boolean
  }>
}

const initialState: UIState = {
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    addNotification: (state, action: PayloadAction<{
      title: string
      message: string
      type: 'info' | 'success' | 'warning' | 'error'
    }>) => {
      const notification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      }
      state.notifications.unshift(notification)
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  setTheme,
  setSidebarOpen,
  addNotification,
  markNotificationRead,
  clearNotifications,
} = uiSlice.actions

export default uiSlice