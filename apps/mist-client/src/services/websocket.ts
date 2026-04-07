// WebSocket Service
// Handles WebSocket connections and message routing

// WebSocket Service Implementation
class WebSocketService {
  private socket: WebSocket | null = null
  private listeners: Map<string, (data: any) => void> = new Map()
  private url: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  constructor(url: string) {
    this.url = url
  }

  connect(): void {
    this.socket = new WebSocket(this.url)
    this.setupEventHandlers()
  }

  private setupEventHandlers(): void {
    if (!this.socket) return

    this.socket.onopen = () => {
      console.log('WebSocket connected')
      this.reconnectAttempts = 0
    }

    this.socket.onclose = () => this.handleDisconnect()
    this.socket.onerror = (error) => console.error('WebSocket error:', error)

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        this.handleMessage(message)
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }
  }

  private handleMessage(message: any): void {
    const handler = this.listeners.get(message.type)
    if (handler) {
      handler(message.data)
    }
  }

  on(type: string, handler: (data: any) => void): void {
    this.listeners.set(type, handler)
  }

  once(type: string, handler: (data: any) => void): void {
    const onceHandler = (data: any) => {
      handler(data)
      this.listeners.delete(type)
    }
    this.listeners.set(type, onceHandler)
  }

  send(type: string, data: any, requestId?: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type,
        ...data,
        ...(requestId && { requestId })
      }))
    }
  }

  private handleDisconnect(): void {
    console.log('WebSocket disconnected')
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000)
      setTimeout(() => {
        console.log(`Reconnecting... (attempt ${this.reconnectAttempts + 1})`)
        this.reconnectAttempts++
        this.connect()
      }, delay)
    } else {
      console.error('Max reconnection attempts reached')
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close()
    }
    this.reconnectAttempts = 0
  }
}

export default WebSocketService