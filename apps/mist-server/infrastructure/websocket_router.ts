// Infrastructure Layer - WebSocket Message Router
// Handles routing of WebSocket messages to appropriate use cases

import { WebSocket } from 'ws'
import { Container } from './dependency_container.ts'
import {
  CreateGameUseCase,
  GetAllGamesUseCase,
  GetGameByIdUseCase,
  UpdateGameUseCase,
  DeleteGameUseCase,
  CreateCardUseCase,
  GetCardsByGameIdUseCase,
  GetCardByIdUseCase,
  UpdateCardUseCase,
  DeleteCardUseCase
} from '../application/use_cases.ts'

export class WebSocketRouter {
  private useCases = {
    createGame: new CreateGameUseCase(),
    getAllGames: new GetAllGamesUseCase(),
    getGameById: new GetGameByIdUseCase(),
    updateGame: new UpdateGameUseCase(),
    deleteGame: new DeleteGameUseCase(),
    createCard: new CreateCardUseCase(),
    getCardsByGameId: new GetCardsByGameIdUseCase(),
    getCardById: new GetCardByIdUseCase(),
    updateCard: new UpdateCardUseCase(),
    deleteCard: new DeleteCardUseCase()
  }
  
  constructor(private socket: WebSocket) {}
  
  async handleMessage(message: string): Promise<void> {
    try {
      const parsed = JSON.parse(message)
      console.log(`received: ${JSON.stringify(parsed, null, 2)}`)

      if (!parsed.type) {
        this.sendError('Message type is required', parsed.requestId)
        return
      }
      
      switch (parsed.type) {
        case 'createGame':
          await this.handleCreateGame(parsed)
          break
        case 'getAllGames':
          await this.handleGetAllGames(parsed)
          break
        case 'getGameById':
          await this.handleGetGameById(parsed)
          break
        case 'updateGame':
          await this.handleUpdateGame(parsed)
          break
        case 'deleteGame':
          await this.handleDeleteGame(parsed)
          break
        case 'createCard':
          await this.handleCreateCard(parsed)
          break
        case 'getCardsByGameId':
          await this.handleGetCardsByGameId(parsed)
          break
        case 'getCardById':
          await this.handleGetCardById(parsed)
          break
        case 'updateCard':
          await this.handleUpdateCard(parsed)
          break
        case 'deleteCard':
          await this.handleDeleteCard(parsed)
          break
        default:
          this.sendError(`Unknown message type: ${parsed.type}`, parsed.requestId)
      }
    } catch (error) {
      console.error('Error handling WebSocket message:', error)
      this.sendError('Internal server error', undefined)
    }
  }
  
  private sendResponse(type: string, data: unknown, requestId?: string): void {
    const response = {
      type,
      ...(requestId && { requestId }),
      data
    }
    this.socket.send(JSON.stringify(response))
  }
  
  private sendError(message: string, requestId?: string): void {
    this.sendResponse('error', { message }, requestId)
  }
  
  private async handleCreateGame(message: any): Promise<void> {
    try {
      const { name, description, requestId } = message
      const game = await this.useCases.createGame.execute(name, description)
      this.sendResponse('gameCreated', game, requestId)
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleGetAllGames(message: any): Promise<void> {
    try {
      const games = await this.useCases.getAllGames.execute()
      this.sendResponse('gamesList', games, message.requestId)
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleGetGameById(message: any): Promise<void> {
    try {
      const { id, requestId } = message
      const game = await this.useCases.getGameById.execute(id)
      if (game) {
        this.sendResponse('gameDetails', game, requestId)
      } else {
        this.sendError('Game not found', requestId)
      }
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleUpdateGame(message: any): Promise<void> {
    try {
      const { id, name, description, requestId } = message
      const game = await this.useCases.updateGame.execute(id, name, description)
      this.sendResponse('gameUpdated', game, requestId)
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleDeleteGame(message: any): Promise<void> {
    try {
      const { id, requestId } = message
      await this.useCases.deleteGame.execute(id)
      this.sendResponse('gameDeleted', { id }, requestId)
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleCreateCard(message: any): Promise<void> {
    try {
      const { gameId, name, requestId } = message
      const card = await this.useCases.createCard.execute(gameId, name)
      this.sendResponse('cardCreated', card, requestId)
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleGetCardsByGameId(message: any): Promise<void> {
    try {
      const { gameId, requestId } = message
      const cards = await this.useCases.getCardsByGameId.execute(gameId)
      this.sendResponse('cardsList', cards, requestId)
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleGetCardById(message: any): Promise<void> {
    try {
      const { id, requestId } = message
      const card = await this.useCases.getCardById.execute(id)
      if (card) {
        this.sendResponse('cardDetails', card, requestId)
      } else {
        this.sendError('Card not found', requestId)
      }
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleUpdateCard(message: any): Promise<void> {
    try {
      const { id, name, requestId } = message
      const card = await this.useCases.updateCard.execute(id, name)
      this.sendResponse('cardUpdated', card, requestId)
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
  
  private async handleDeleteCard(message: any): Promise<void> {
    try {
      const { id, requestId } = message
      await this.useCases.deleteCard.execute(id)
      this.sendResponse('cardDeleted', { id }, requestId)
    } catch (error) {
      this.sendError(error instanceof Error ? error.message : 'Unknown error', message.requestId)
    }
  }
}