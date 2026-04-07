import { WebSocketServer } from 'ws'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { WebSocketController } from './presentation/websocket_controller.ts'

// Create an Express app to handle CORS
const app = express()
app.use(cors())

// Create an HTTP server
const server = createServer(app)

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  WebSocketController.handleConnection(ws)
})

// Start the server
const PORT = 8080
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`)
})