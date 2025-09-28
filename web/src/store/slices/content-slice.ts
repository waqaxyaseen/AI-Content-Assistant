import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Content {
  id: string
  title: string
  content: string
  type: 'blog' | 'social' | 'email' | 'ad' | 'product-description'
  status: 'draft' | 'published' | 'scheduled'
  createdAt: string
  updatedAt: string
}

interface ContentState {
  items: Content[]
  currentContent: Content | null
  isLoading: boolean
  error: string | null
}

const initialState: ContentState = {
  items: [],
  currentContent: null,
  isLoading: false,
  error: null,
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setContent: (state, action: PayloadAction<Content[]>) => {
      state.items = action.payload
    },
    addContent: (state, action: PayloadAction<Content>) => {
      state.items.unshift(action.payload)
    },
    updateContent: (state, action: PayloadAction<Content>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteContent: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    setCurrentContent: (state, action: PayloadAction<Content | null>) => {
      state.currentContent = action.payload
    },
  },
})

export const {
  setLoading,
  setError,
  setContent,
  addContent,
  updateContent,
  deleteContent,
  setCurrentContent,
} = contentSlice.actions

export default contentSlice