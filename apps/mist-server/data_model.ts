// In-memory data model for games and cards
import { v4 as uuidv4 } from 'uuid'

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

// In-memory data store - initialized with sample data using UUIDs
const gameId = uuidv4()
const cardId = uuidv4()

const games: Game[] = [
  {
    id: gameId,
    name: 'Sample Game',
    description: 'A sample game for testing purposes.'
  }
]

const cards: Card[] = [
  {
    id: cardId,
    name: 'Sample Card',
    gameId: gameId
  }
]

// Function to get all games
export const getGames = (): Game[] => {
  return games
}

// Function to get cards for a specific game
export const getCards = (gameId: string): Card[] => {
  return cards.filter((card) => card.gameId === gameId)
}

// Function to add a game
export const addGame = (game: Game): void => {
  games.push(game)
}

// Function to add a card
export const addCard = (card: Card): void => {
  cards.push(card)
}

// Function to reset the data model
export const resetDataModel = (): void => {
  games.length = 0
  cards.length = 0
}