// Custom Hook for Game Management
// Provides game-related state and actions to components

import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store.ts'
import { useEffect, useCallback } from 'react'
import { useWebSocket } from '../context/WebSocketContext.tsx'

export const useGames = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { games, cards, loading, error } = useSelector((state: RootState) => state.games)
  const websocket = useWebSocket()

  // Load initial data when component mounts
  useEffect(() => {
    websocket.send('getAllGames', {}, 'init-games')
    websocket.send('getAllCards', {}, 'init-cards')
  }, [websocket, dispatch])

  // Memoize action creators to prevent unnecessary re-renders
  const createGame = useCallback((name: string, description: string) => {
    const requestId = Date.now().toString()
    websocket.send('createGame', { name, description }, requestId)
  }, [])

  const updateGame = useCallback((id: string, name: string, description?: string) => {
    const requestId = Date.now().toString()
    websocket.send('updateGame', { id, name, ...(description && { description }) }, requestId)
  }, [])

  const deleteGame = useCallback((id: string) => {
    const requestId = Date.now().toString()
    websocket.send('deleteGame', { id }, requestId)
  }, [])

  const createCard = useCallback((gameId: string, name: string) => {
    const requestId = Date.now().toString()
    websocket.send('createCard', { gameId, name }, requestId)
  }, [])

  const updateCard = useCallback((id: string, name: string) => {
    const requestId = Date.now().toString()
    websocket.send('updateCard', { id, name }, requestId)
  }, [])

  const deleteCard = useCallback((id: string) => {
    const requestId = Date.now().toString()
    websocket.send('deleteCard', { id }, requestId)
  }, [])

  return {
    games,
    cards,
    loading,
    error,
    createGame,
    updateGame,
    deleteGame,
    createCard,
    updateCard,
    deleteCard
  }
}