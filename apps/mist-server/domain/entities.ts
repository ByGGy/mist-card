// Domain Entities - Core business objects with business rules
import { v4 as uuidv4 } from 'uuid'

// Base entity interface that all entities should implement
export type Entity = {
  readonly id: string
}

export class Game implements Entity {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string
  ) {
    this.validate()
  }
  
  private validate(): void {
    if (this.name.length < 3) {
      throw new Error("Game name must be at least 3 characters")
    }
    if (this.name.length > 100) {
      throw new Error("Game name cannot exceed 100 characters")
    }
    if (this.description.length > 500) {
      throw new Error("Description cannot exceed 500 characters")
    }
  }
  
  // Business methods
  updateName(newName: string): void {
    const oldName = this.name
    this.name = newName
    try {
      this.validate()
    } catch (error) {
      this.name = oldName // Rollback on validation failure
      throw error
    }
  }
  
  updateDescription(newDescription: string): void {
    const oldDescription = this.description
    this.description = newDescription
    try {
      this.validate()
    } catch (error) {
      this.description = oldDescription // Rollback on validation failure
      throw error
    }
  }
  
  // Derived properties
  get isValid(): boolean {
    try {
      this.validate()
      return true
    } catch {
      return false
    }
  }
}

export class Card implements Entity {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly gameId: string
  ) {
    this.validate()
  }
  
  private validate(): void {
    if (this.name.length < 2) {
      throw new Error("Card name must be at least 2 characters")
    }
    if (this.name.length > 100) {
      throw new Error("Card name cannot exceed 100 characters")
    }
    if (!this.gameId) {
      throw new Error("Card must belong to a game")
    }
  }
  
  // Business methods
  updateName(newName: string): void {
    const oldName = this.name
    this.name = newName
    try {
      this.validate()
    } catch (error) {
      this.name = oldName // Rollback on validation failure
      throw error
    }
  }
  
  // Domain logic
  belongsToGame(gameId: string): boolean {
    return this.gameId === gameId
  }
}

export function createGame(name: string, description: string): Game {
  return new Game(uuidv4(), name, description)
}

export function createCard(name: string, gameId: string): Card {
  return new Card(uuidv4(), name, gameId)
}

// Serialization methods for entities
export function entityToPlainObject(entity: Entity): any {
  if (entity instanceof Game) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description
    }
  } else if (entity instanceof Card) {
    return {
      id: entity.id,
      name: entity.name,
      gameId: entity.gameId
    }
  }
  throw new Error(`Unknown entity type: ${typeof entity}`)
}

// Rehydration methods for entities
export function plainObjectToEntity(plainObject: any): Entity {
  if ('description' in plainObject) {
    return new Game(plainObject.id, plainObject.name, plainObject.description)
  } else if ('gameId' in plainObject) {
    return new Card(plainObject.id, plainObject.name, plainObject.gameId)
  }
  throw new Error(`Unknown entity type: ${JSON.stringify(plainObject)}`)
}