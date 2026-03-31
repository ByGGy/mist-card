import { WebSocketServer } from 'ws'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the current module's directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create a WebSocket server
const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected')

  ws.on('message', (message: string) => {
    console.log('Received message:', message)

    try {
      const data = JSON.parse(message)
      console.log(JSON.stringify(data, null, 2))

      if (data.type === 'fetchGames') {
        const gamesData = JSON.parse(readFileSync(path.join(__dirname, 'data', 'games.json'), 'utf-8'))
        ws.send(JSON.stringify({ type: 'games', data: gamesData }))
      } else if (data.type === 'fetchCards') {
        const gameId = data.gameId
        const cardsData = JSON.parse(readFileSync(path.join(__dirname, 'data', 'cards.json'), 'utf-8'))
        const cards = cardsData.filter((card: any) => card.gameId === gameId)
        ws.send(JSON.stringify({ type: 'cards', data: cards }))
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

console.log('WebSocket server is running on ws://localhost:8080')