import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the current module's directory path
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load the proto file
const protoPath = path.join(__dirname, 'proto', 'game.proto')
const packageDefinition = loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
const protoDescriptor = loadPackageDefinition(packageDefinition)
const gameProto = protoDescriptor.game as any

// Implement the GameService
const gameService = {
  fetchGames: (call: any, callback: any) => {
    try {
      const gamesData = JSON.parse(readFileSync(path.join(__dirname, 'data', 'games.json'), 'utf-8'))
      callback(null, { games: gamesData })
    } catch (error) {
      callback(error, null)
    }
  },
  fetchCards: (call: any, callback: any) => {
    try {
      const cardsData = JSON.parse(readFileSync(path.join(__dirname, 'data', 'cards.json'), 'utf-8'))
      const gameId = call.request.gameId
      const cards = cardsData.filter((card: any) => card.gameId === gameId)
      callback(null, { cards })
    } catch (error) {
      callback(error, null)
    }
  }
}

// Create and start the gRPC server
const server = new Server()
server.addService(gameProto.GameService.service, gameService)
const PORT = 50051
server.bindAsync(`0.0.0.0:${PORT}`, ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error('Failed to bind server:', error)
    return
  }
  console.log(`gRPC server is running on port ${port}`)
  server.start()
})