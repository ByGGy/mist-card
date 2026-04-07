// WebSocket Middleware for Redux
// Bridges WebSocket messages to Redux actions

import { Middleware } from '@reduxjs/toolkit'
import WebSocketService from '../services/websocket.js'
import {
  gameCreated,
  gameUpdated,
  gameDeleted,
  gamesLoaded,
  cardCreated,
  cardUpdated,
  cardDeleted,
  cardsLoaded,
  setError
} from './store.js'

export const websocketMiddleware = (websocketService: WebSocketService): Middleware => {
  return store => next => action => {
    // Handle WebSocket messages that come in
    websocketService.on('gameCreated', (game: any) => {
      store.dispatch(gameCreated(game))
    })

    websocketService.on('gameUpdated', (game: any) => {
      store.dispatch(gameUpdated(game))
    })

    websocketService.on('gameDeleted', ({ id }: { id: string }) => {
      store.dispatch(gameDeleted({ id }))
    })

    websocketService.on('gamesList', (games: any[]) => {
      store.dispatch(gamesLoaded(games))
    })

    websocketService.on('cardCreated', (card: any) => {
      store.dispatch(cardCreated(card))
    })

    websocketService.on('cardUpdated', (card: any) => {
      store.dispatch(cardUpdated(card))
    })

    websocketService.on('cardDeleted', ({ id }: { id: string }) => {
      store.dispatch(cardDeleted({ id }))
    })

    websocketService.on('cardsList', (cards: any[]) => {
      store.dispatch(cardsLoaded(cards))
    })

    websocketService.on('error', (error: Error) => {
      store.dispatch(setError(error.message))
    })

    return next(action)
  }
}