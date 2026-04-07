// Presentation Layer - WebSocket Controller
// Handles WebSocket connections and message routing

import { WebSocketRouter } from '../infrastructure/websocket_router.ts'
import { WebSocket } from 'ws'

export class WebSocketController {
  private static instances: Map<WebSocket, WebSocketRouter> = new Map()
  
  static handleConnection(ws: WebSocket): void {
    console.log('New WebSocket client connected')
    
    const router = new WebSocketRouter(ws)
    this.instances.set(ws, router)
    
    ws.on('message', (message: string) => {
      console.log('Received message:', message)
      router.handleMessage(message).catch(error => {
        console.error('Error handling message:', error)
      })
    })
    
    ws.on('close', () => {
      console.log('WebSocket client disconnected')
      this.instances.delete(ws)
    })
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
      this.instances.delete(ws)
    })
  }
  
  static broadcast(message: string): void {
    const broadcastMessage = JSON.stringify(message)
    this.instances.forEach((router, ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(broadcastMessage)
      }
    })
  }
  
  static getClientCount(): number {
    return this.instances.size
  }
}