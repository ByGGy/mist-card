// Application Layer - Use Cases (Business Operations)
// Coordinates domain objects to perform specific tasks
// Depends on domain layer, uses infrastructure through dependency injection

import { Container } from '../infrastructure/dependency_container.ts'
import { Game, Card, createGame, createCard } from '../domain/entities.ts'
import { WebSocketController } from '../presentation/websocket_controller.ts'

export class CreateGameUseCase {
  private gameRepository = Container.getGameRepository()
  
  async execute(name: string, description: string): Promise<Game> {
    // Validation is handled by the Game constructor
    const game = createGame(name, description)
    await this.gameRepository.saveItem(game)
    
    // Broadcast to all WebSocket clients
    WebSocketController.broadcast(JSON.stringify({
      type: 'gameCreated',
      data: game
    }))
    
    return game
  }
}

export class GetAllGamesUseCase {
  private gameRepository = Container.getGameRepository()
  
  async execute(): Promise<Game[]> {
    return this.gameRepository.getAllItems()
  }
}

export class GetGameByIdUseCase {
  private gameRepository = Container.getGameRepository()
  
  async execute(id: string): Promise<Game | null> {
    return this.gameRepository.findById(id)
  }
}

export class UpdateGameUseCase {
  private gameRepository = Container.getGameRepository()
  
  async execute(id: string, name?: string, description?: string): Promise<Game> {
    const existingGame = await this.gameRepository.findById(id)
    if (!existingGame) {
      throw new Error(`Game with ID ${id} not found`)
    }
    
    // Validation is handled by the entity's update methods
    if (name !== undefined) {
      existingGame.updateName(name)
    }
    
    if (description !== undefined) {
      existingGame.updateDescription(description)
    }
    
    await this.gameRepository.saveItem(existingGame)
    
    // Broadcast to all WebSocket clients
    WebSocketController.broadcast(JSON.stringify({
      type: 'gameUpdated',
      data: existingGame
    }))
    
    return existingGame
  }
}

export class DeleteGameUseCase {
  private gameRepository = Container.getGameRepository()
  private cardRepository = Container.getCardRepository()
  
  async execute(id: string): Promise<void> {
    // Delete associated cards first (referential integrity)
    const cards = await this.cardRepository.getAllItems()
    const gameCards = cards.filter(card => card.gameId === id)
    
    for (const card of gameCards) {
      await this.cardRepository.deleteById(card.id)
      
      // Broadcast card deletion
      WebSocketController.broadcast(JSON.stringify({
        type: 'cardDeleted',
        data: { id: card.id }
      }))
    }
    
    // Then delete the game
    await this.gameRepository.deleteById(id)
    
    // Broadcast game deletion
    WebSocketController.broadcast(JSON.stringify({
      type: 'gameDeleted',
      data: { id }
    }))
  }
}

export class SearchGamesUseCase {
  private gameRepository = Container.getGameRepository()
  
  async execute(searchText: string): Promise<Game[]> {
    if (searchText.length < 2) {
      return [] // Minimum 2 characters for search
    }
    
    const allGames = await this.gameRepository.getAllItems()
    const lowerText = searchText.toLowerCase()
    return allGames.filter(game => 
      game.name.toLowerCase().includes(lowerText)
    )
  }
}

export class CreateCardUseCase {
  private cardRepository = Container.getCardRepository()
  private gameRepository = Container.getGameRepository()
  
  async execute(gameId: string, name: string): Promise<Card> {
    // Verify game exists
    const game = await this.gameRepository.findById(gameId)
    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`)
    }
    
    // Validation is handled by the Card constructor
    const card = createCard(name, gameId)
    await this.cardRepository.saveItem(card)
    
    // Broadcast to all WebSocket clients
    WebSocketController.broadcast(JSON.stringify({
      type: 'cardCreated',
      data: card
    }))
    
    return card
  }
}

export class GetAllCardsUseCase {
  private cardRepository = Container.getCardRepository()
  
  async execute(): Promise<Card[]> {
    return this.cardRepository.getAllItems()
  }
}

export class GetCardsByGameIdUseCase {
  private cardRepository = Container.getCardRepository()
  
  async execute(gameId: string): Promise<Card[]> {
    return (await this.cardRepository.getAllItems()).filter(card => card.gameId === gameId)
  }
}

export class GetCardByIdUseCase {
  private cardRepository = Container.getCardRepository()
  
  async execute(id: string): Promise<Card | null> {
    return this.cardRepository.findById(id)
  }
}

export class UpdateCardUseCase {
  private cardRepository = Container.getCardRepository()
  
  async execute(id: string, name: string): Promise<Card> {
    const existingCard = await this.cardRepository.findById(id)
    if (!existingCard) {
      throw new Error(`Card with ID ${id} not found`)
    }
    
    // Validation is handled by the entity's update method
    existingCard.updateName(name)
    
    await this.cardRepository.saveItem(existingCard)
    
    // Broadcast to all WebSocket clients
    WebSocketController.broadcast(JSON.stringify({
      type: 'cardUpdated',
      data: existingCard
    }))
    
    return existingCard
  }
}

export class DeleteCardUseCase {
  private cardRepository = Container.getCardRepository()
  
  async execute(id: string): Promise<void> {
    await this.cardRepository.deleteById(id)
    
    // Broadcast to all WebSocket clients
    WebSocketController.broadcast(JSON.stringify({
      type: 'cardDeleted',
      data: { id }
    }))
  }
}

// Application Service - Coordinates multiple use cases
export class GameManagementService {
  async createGameWithInitialCards(name: string, description: string, cardNames: string[]): Promise<Game> {
    const createGame = new CreateGameUseCase()
    const game = await createGame.execute(name, description)
    
    const createCard = new CreateCardUseCase()
    for (const cardName of cardNames) {
      await createCard.execute(game.id, cardName)
    }
    
    return game
  }
}