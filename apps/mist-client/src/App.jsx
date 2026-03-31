import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { connectWebSocket, fetchGames, fetchCards } from './websocket_client';

function App() {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await connectWebSocket();
        // Add a small delay to ensure the connection is fully established
        await new Promise((resolve) => setTimeout(resolve, 100));
        const gamesData = await fetchGames();
        setGames(gamesData);
      } catch (error) {
        console.error('Error initializing WebSocket or fetching games:', error);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const loadCards = async () => {
      if (selectedGameId) {
        try {
          const cardsData = await fetchCards(selectedGameId);
          setCards(cardsData);
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      }
    };

    loadCards();
  }, [selectedGameId]);

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
          <ListItem key={game.id} button onClick={() => setSelectedGameId(game.id)}>
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
  );
}

export default App;