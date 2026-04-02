import express, { Express, Request, Response } from 'express'
import { getGames, getCards } from './data_model.ts'

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
    const gamesData = getGames()
    res.status(200).json(gamesData)
  } catch (error) {
    console.error('Error fetching games:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Endpoint to fetch cards for a specific game
app.get('/api/games/:gameId/cards', (req: Request, res: Response) => {
  try {
    const gameId = req.params.gameId as string
    const cards = getCards(gameId)
    res.status(200).json(cards)
  } catch (error) {
    console.error('Error fetching cards:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`)
})