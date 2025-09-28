import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AnalyticsData {
  totalViews: number
  totalEngagement: number
  contentCount: number
  aiGenerations: number
  topContent: Array<{
    id: string
    title: string
    views: number
    engagement: number
  }>
  weeklyData: Array<{
    date: string
    views: number
    engagement: number
  }>
}

interface AnalyticsState {
  data: AnalyticsData | null
  isLoading: boolean
  error: string | null
  timeRange: '7d' | '30d' | '90d' | '1y'
}

const initialState: AnalyticsState = {
  data: null,
  isLoading: false,
  error: null,
  timeRange: '30d',
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setData: (state, action: PayloadAction<AnalyticsData>) => {
      state.data = action.payload
    },
    setTimeRange: (state, action: PayloadAction<'7d' | '30d' | '90d' | '1y'>) => {
      state.timeRange = action.payload
    },
  },
})

export const {
  setLoading,
  setError,
  setData,
  setTimeRange,
} = analyticsSlice.actions

export default analyticsSlice