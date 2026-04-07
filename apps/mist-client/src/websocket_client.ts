// Create a WebSocket client
let socket: WebSocket
let isConnected = false
let messageId = 0
const callbacks: { [key: number]: (data: any) => void } = {}

// Function to connect to the WebSocket server
export const connectWebSocket = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket = new WebSocket('ws://localhost:8080')

    socket.onopen = () => {
      console.log('Connected to WebSocket server')
      isConnected = true
      resolve()
    }

    socket.onerror = (error) => {
      console.error('WebSocket connection error:', error)
      reject(error)
    }

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        console.log(JSON.stringify(message, null, 8))
        if (message.id !== undefined && callbacks[message.id]) {
          callbacks[message.id](message.data)
          delete callbacks[message.id]
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server')
      isConnected = false
    }
  })
}

// Function to fetch games
export const fetchGames = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!socket || !isConnected) {
      reject(new Error('WebSocket is not connected'))
      return
    }

    const id = messageId++
    callbacks[id] = resolve

    socket.send(JSON.stringify({ id, type: 'getAllGames' }))

    setTimeout(() => {
      if (callbacks[id]) {
        delete callbacks[id]
        reject(new Error('Timeout waiting for response'))
      }
    }, 5000)
  })
}

// Function to fetch cards for a specific game
export const fetchCards = (gameId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!socket || !isConnected) {
      reject(new Error('WebSocket is not connected'))
      return
    }

    const id = messageId++
    callbacks[id] = resolve

    socket.send(JSON.stringify({ id, type: 'getCardsByGameId', gameId }))

    setTimeout(() => {
      if (callbacks[id]) {
        delete callbacks[id]
        reject(new Error('Timeout waiting for response'))
      }
    }, 5000)
  })
}