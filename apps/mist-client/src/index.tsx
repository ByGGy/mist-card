// Entry point for the React application
// Sets up Redux store with WebSocket middleware and renders the app

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { websocketMiddleware } from './store/websocketMiddleware.js'
import WebSocketService from './services/websocket.js'
import { gameSlice } from './store/store.js'
import { App } from './App.js'

// Create WebSocket service instance
const websocketService = new WebSocketService('ws://localhost:8081')

// Create store with WebSocket middleware
const store = configureStore({
  reducer: {
    games: gameSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware(websocketService))
})

// Render the application
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}