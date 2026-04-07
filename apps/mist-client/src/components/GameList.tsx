// Game List Component
// Displays list of games with CRUD operations

import React from 'react'
import { useGames } from '../hooks/useGames.js'

export const GameList: React.FC = () => {
  const {
    games,
    loading,
    error,
    createGame,
    updateGame,
    deleteGame
  } = useGames()

  if (loading) return <div className="loading">Loading games...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="game-list">
      <h2>Games</h2>
      <button
        onClick={() => createGame('New Game', 'Description')}
        className="btn btn-primary"
      >
        Add Game
      </button>

      <div className="game-items">
        {games.map((game: any) => (
          <div key={game.id} className="game-item">
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <div className="game-actions">
              <button
                onClick={() => updateGame(game.id, 'Updated Name')}
                className="btn btn-secondary"
              >
                Update
              </button>
              <button
                onClick={() => deleteGame(game.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Add basic CSS for the component
const styles = `
.game-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.game-actions {
  margin-top: 10px;
}

.btn {
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
`