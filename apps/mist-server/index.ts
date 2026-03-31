import express, { Express, Request, Response } from 'express'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the current module's directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app: Express = express()
const PORT: number = parseInt(process.env.PORT || '3000', 10)

// Middleware to parse JSON requests
app.use(express.json())

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('Backend is healthy')
})

// Endpoint to fetch games
app.get('/api/games', (req: Request, res: Response) => {
  try {
    const gamesData = JSON.parse(readFileSync(path.join(__dirname, 'data', 'games.json'), 'utf-8'))
    res.status(200).json(gamesData)
  } catch (error) {
    console.error('Error reading games data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Endpoint to fetch cards for a specific game
app.get('/api/games/:gameId/cards', (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId
    const cardsData = JSON.parse(readFileSync(path.join(__dirname, 'data', 'cards.json'), 'utf-8'))
    const cards = cardsData.filter((card: any) => card.gameId === gameId)
    res.status(200).json(cards)
  } catch (error) {
    console.error('Error reading cards data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`)
})