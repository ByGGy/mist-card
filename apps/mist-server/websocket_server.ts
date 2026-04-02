import { WebSocketServer } from 'ws'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { getGames, getCards } from './data_model.ts'

// Create an Express app to handle CORS
const app = express()
app.use(cors())

// Create an HTTP server
const server = createServer(app)

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected')

  ws.on('message', (message: string) => {
    console.log('Received message:', message)

    try {
      const data = JSON.parse(message)
      console.log(JSON.stringify(data, null, 2))

      if (data.type === 'fetchGames') {
        const gamesData = getGames()
        ws.send(JSON.stringify({ id: data.id, type: 'games', data: gamesData }))
      } else if (data.type === 'fetchCards') {
        const gameId = data.gameId
        const cards = getCards(gameId)
        ws.send(JSON.stringify({ id: data.id, type: 'cards', data: cards }))
      }
    } catch (error) {
      console.error('Error processing message:', error)
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }))
    }
  })

  ws.on('close', () => {
    console.log('WebSocket client disconnected')
  })
})

// Start the server
const PORT = 8080
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`)
})