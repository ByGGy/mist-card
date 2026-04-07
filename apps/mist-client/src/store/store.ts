// Redux Store Configuration
// Centralized state management for the application

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define types for our domain entities
interface Game {
  id: string
  name: string
  description: string
}

interface Card {
  id: string
  name: string
  gameId: string
}

// Define the state shape
interface GameState {
  games: Game[]
  cards: Card[]
  loading: boolean
  error: string | null
}

// Initial state
const initialState: GameState = {
  games: [],
  cards: [],
  loading: false,
  error: null
}

// Create a slice for game-related state and actions
const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    // Game actions
    gameCreated: (state, action: PayloadAction<Game>) => {
      state.games.push(action.payload)
    },
    gameUpdated: (state, action: PayloadAction<Game>) => {
      const index = state.games.findIndex(g => g.id === action.payload.id)
      if (index !== -1) {
        state.games[index] = action.payload
      }
    },
    gameDeleted: (state, action: PayloadAction<{ id: string }>) => {
      state.games = state.games.filter(g => g.id !== action.payload.id)
    },
    gamesLoaded: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload
    },

    // Card actions
    cardCreated: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload)
    },
    cardUpdated: (state, action: PayloadAction<Card>) => {
      const index = state.cards.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.cards[index] = action.payload
      }
    },
    cardDeleted: (state, action: PayloadAction<{ id: string }>) => {
      state.cards = state.cards.filter(c => c.id !== action.payload.id)
    },
    cardsLoaded: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

// Export actions
export const {
  gameCreated,
  gameUpdated,
  gameDeleted,
  gamesLoaded,
  cardCreated,
  cardUpdated,
  cardDeleted,
  cardsLoaded,
  setLoading,
  setError
} = gameSlice.actions

// Configure and export the store
export const store = configureStore({
  reducer: {
    games: gameSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

// Export type helpers for components
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { gameSlice }