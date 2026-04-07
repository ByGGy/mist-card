// WebSocket Context
// Provides a single WebSocket instance for the entire application

import React, { createContext, useContext, useEffect, useState } from 'react'
import { WebSocketService } from '../services/websocket.ts'
import { useDispatch } from 'react-redux'
import {
  gameCreated,
  gameUpdated,
  gameDeleted,
  gamesLoaded,
  cardCreated,
  cardUpdated,
  cardDeleted,
  cardsLoaded,
  setError,
  setLoading
} from '../store/store.ts'

// Create the context
const WebSocketContext = createContext<WebSocketService | null>(null)

// WebSocket Provider Component
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [websocket] = useState(() => new WebSocketService('ws://localhost:8080'))
  const dispatch = useDispatch()

  useEffect(() => {
    // Connect when component mounts
    websocket.connect()

    // Setup WebSocket event listeners
    const setupListeners = () => {
      websocket.on('gameCreated', (game: any) => {
        dispatch(gameCreated(game))
      })

      websocket.on('gameUpdated', (game: any) => {
        dispatch(gameUpdated(game))
      })

      websocket.on('gameDeleted', ({ id }: { id: string }) => {
        dispatch(gameDeleted({ id }))
      })

      websocket.on('gamesList', (games: any[]) => {
        dispatch(gamesLoaded(games))
      })

      websocket.on('cardCreated', (card: any) => {
        dispatch(cardCreated(card))
      })

      websocket.on('cardUpdated', (card: any) => {
        dispatch(cardUpdated(card))
      })

      websocket.on('cardDeleted', ({ id }: { id: string }) => {
        dispatch(cardDeleted({ id }))
      })

      websocket.on('cardsList', (cards: any[]) => {
        dispatch(cardsLoaded(cards))
      })

      websocket.on('error', (error: Error) => {
        dispatch(setError(error.message))
      })
    }

    // Setup listeners when socket is ready
    const checkSocketReady = () => {
      if (websocket.isConnected()) {
        setupListeners()
      } else {
        setTimeout(checkSocketReady, 100)
      }
    }

    checkSocketReady()

    // Clean up when component unmounts
    return () => {
      websocket.disconnect()
    }
  }, [websocket, dispatch])

  return (
    <WebSocketContext.Provider value={websocket}>
      {children}
    </WebSocketContext.Provider>
  )
}

// Custom hook to use the WebSocket service
export const useWebSocket = () => {
  const websocket = useContext(WebSocketContext)
  if (!websocket) {
    throw new Error('useWebSocket must be used within a WebSocketProvider')
  }
  return websocket
}
