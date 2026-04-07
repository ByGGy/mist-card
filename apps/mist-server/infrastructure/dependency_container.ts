// Infrastructure Layer - Dependency Injection Container
// Centralized place to manage dependencies and their lifecycles

import { LowdbRepository } from '../persistence/lowdb_repository.ts'
import { Game, Card } from '../domain/entities.ts'
import path from 'path'
import { fileURLToPath } from 'url'

export class Container {
  private static gameRepository: LowdbRepository<Game>
  private static cardRepository: LowdbRepository<Card>
  
  static getGameRepository(): LowdbRepository<Game> {
    if (!this.gameRepository) {
      const __dirname = path.dirname(fileURLToPath(import.meta.url))
      const dataDir = path.join(__dirname, '../data')
      this.gameRepository = new LowdbRepository<Game>(path.join(dataDir, 'games.json'))
    }
    return this.gameRepository
  }
  
  static getCardRepository(): LowdbRepository<Card> {
    if (!this.cardRepository) {
      const __dirname = path.dirname(fileURLToPath(import.meta.url))
      const dataDir = path.join(__dirname, '../data')
      this.cardRepository = new LowdbRepository<Card>(path.join(dataDir, 'cards.json'))
    }
    return this.cardRepository
  }
}