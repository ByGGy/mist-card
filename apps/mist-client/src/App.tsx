import React, { useEffect, useState } from 'react'
import { Button, Container, Typography, List, ListItem, ListItemText } from '@mui/material'
import { connectWebSocket, fetchGames, fetchCards } from './websocket_client.ts'

type Game = {
  id: string
  name: string
  description: string
}

type Card = {
  id: string
  name: string
}

export const App = () => {
  const [games, setGames] = useState<Array<Game>>([])
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null)
  const [cards, setCards] = useState<Array<Card>>([])

  useEffect(() => {
    const initialize = async () => {
      try {
        await connectWebSocket()
        // Add a small delay to ensure the connection is fully established
        await new Promise((resolve) => setTimeout(resolve, 100))
        const gamesData = await fetchGames()
        setGames(gamesData)
      } catch (error) {
        console.error('Error initializing WebSocket or fetching games:', error)
      }
    }

    initialize()
  }, [])

  useEffect(() => {
    const loadCards = async () => {
      if (selectedGameId) {
        try {
          const cardsData = await fetchCards(selectedGameId)
          setCards(cardsData)
        } catch (error) {
          console.error('Error fetching cards:', error)
        }
      }
    }

    loadCards()
  }, [selectedGameId])

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Mist Card
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Games
      </Typography>
      <List>
        {games.map((game) => (
          <ListItem key={game.id} onClick={() => setSelectedGameId(game.id)}>
            <ListItemText primary={game.name} secondary={game.description} />
          </ListItem>
        ))}
      </List>
      {selectedGameId && (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Cards
          </Typography>
          <List>
            {cards.map((card) => (
              <ListItem key={card.id}>
                <ListItemText primary={card.name} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  )
}