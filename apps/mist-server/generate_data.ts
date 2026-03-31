import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the current module's directory path
const __filename: string = fileURLToPath(import.meta.url)
const __dirname: string = path.dirname(__filename)

// Define the data directory path
const dataDir: string = path.join(__dirname, 'data')

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Define types for Game and Card
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

// Generate sample game data
const games: Game[] = [
  {
    id: uuidv4(),
    name: 'Sample Game',
    description: 'A sample game for testing purposes.'
  }
]

// Generate sample card data
const cards: Card[] = [
  {
    id: uuidv4(),
    name: 'Sample Card',
    gameId: games[0].id
  }
]

// Write the game data to a JSON file
fs.writeFileSync(
  path.join(dataDir, 'games.json'),
  JSON.stringify(games, null, 2)
)

// Write the card data to a JSON file
fs.writeFileSync(
  path.join(dataDir, 'cards.json'),
  JSON.stringify(cards, null, 2)
)

console.log('Sample data generated successfully.')
console.log('Games:', games)
console.log('Cards:', cards)