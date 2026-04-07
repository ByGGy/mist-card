// Games Page
// CRUD interface for managing games

import React, { useState, useEffect } from 'react'
import { useGames } from '../hooks/useGames.js'
import { Link } from 'react-router-dom'

export const GamesPage: React.FC = () => {
  const {
    games,
    loading,
    error,
    createGame,
    updateGame,
    deleteGame
  } = useGames()

  const [newGameName, setNewGameName] = useState('')
  const [newGameDescription, setNewGameDescription] = useState('')
  const [editingGameId, setEditingGameId] = useState<string | null>(null)
  const [editGameName, setEditGameName] = useState('')
  const [editGameDescription, setEditGameDescription] = useState('')

  // Handle form submission for creating a new game
  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGameName.trim()) {
      createGame(newGameName.trim(), newGameDescription.trim())
      setNewGameName('')
      setNewGameDescription('')
    }
  }

  // Handle starting to edit a game
  const startEditing = (game: any) => {
    setEditingGameId(game.id)
    setEditGameName(game.name)
    setEditGameDescription(game.description)
  }

  // Handle updating a game
  const handleUpdateGame = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingGameId && editGameName.trim()) {
      updateGame(editingGameId, editGameName.trim(), editGameDescription.trim())
      setEditingGameId(null)
    }
  }

  // Handle canceling edit
  const cancelEdit = () => {
    setEditingGameId(null)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-primary font-body">Loading games...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-error">
        <span className="material-symbols-outlined text-4xl mb-4 block">error</span>
        <p className="font-body">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-error text-on-error rounded-lg hover:opacity-90 transition-all"
        >
          Retry
        </button>
      </div>
    </div>
  )

  return (
    <div className="h-full">
      {/* Page Header */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight mb-1 uppercase">Game Management</h1>
            <p className="text-on-surface-variant font-body text-sm">Create, edit, and organize your game projects</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-surface-variant border border-outline-variant/20 rounded-lg text-sm font-medium hover:bg-surface-container-highest transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">refresh</span>
              Refresh
            </button>
          </div>
        </div>

        {/* Create New Game Form */}
        <div className="glass-panel p-6 rounded-xl border border-outline-variant/10 mb-8">
          <h2 className="text-xl font-bold font-headline text-primary mb-4 uppercase tracking-wider">Create New Game</h2>
          <form onSubmit={handleCreateGame} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1 font-label uppercase tracking-wider">Game Name</label>
              <input
                type="text"
                value={newGameName}
                onChange={(e) => setNewGameName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-on-surface focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all"
                placeholder="Enter game name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1 font-label uppercase tracking-wider">Description</label>
              <textarea
                value={newGameDescription}
                onChange={(e) => setNewGameDescription(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-on-surface focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all min-h-[100px]"
                placeholder="Enter game description"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Create Game
            </button>
          </form>
        </div>
      </section>

      {/* Games List */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-headline text-on-surface uppercase tracking-wider">Your Games</h2>
          <div className="text-sm text-on-surface-variant font-body">
            {games.length} game{games.length !== 1 && 's'}
          </div>
        </div>

        {games.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-2xl text-slate-500">sports_esports</span>
            </div>
            <p className="text-on-surface-variant font-body mb-2">No games found</p>
            <p className="text-xs text-slate-500 font-label uppercase tracking-wider">Create your first game to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game: any) => (
              <div key={game.id} className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 hover:border-primary/20 transition-all">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    {editingGameId === game.id ? (
                      <form onSubmit={handleUpdateGame} className="w-full">
                        <div className="mb-4">
                          <input
                            type="text"
                            value={editGameName}
                            onChange={(e) => setEditGameName(e.target.value)}
                            className="w-full bg-surface-container text-on-surface border border-outline-variant/20 rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary/40"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <textarea
                            value={editGameDescription}
                            onChange={(e) => setEditGameDescription(e.target.value)}
                            className="w-full bg-surface-container text-on-surface border border-outline-variant/20 rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary/40 min-h-[80px]"
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:opacity-90 transition-all"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="flex-1 px-4 py-2 bg-surface-variant text-on-surface rounded-lg text-sm font-medium hover:bg-surface-container-highest transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h3 className="font-headline font-bold text-xl text-on-surface line-clamp-1">{game.name}</h3>
                        <button
                          onClick={() => startEditing(game)}
                          className="text-slate-500 hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                      </>
                    )}
                  </div>

                  {editingGameId !== game.id && (
                    <>
                      <p className="text-on-surface-variant font-body text-sm line-clamp-3 mb-6 min-h-[60px]">{game.description || 'No description provided'}</p>

                      <div className="flex gap-2 mb-6">
                        <Link
                          to={`/cards?gameId=${game.id}`}
                          className="flex-1 px-4 py-2 bg-surface-variant border border-outline-variant/20 rounded-lg text-sm font-medium hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">style</span>
                          Manage Cards
                        </Link>
                        <button
                          onClick={() => deleteGame(game.id)}
                          className="px-4 py-2 bg-error text-on-error rounded-lg text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          Delete
                        </button>
                      </div>

                      <div className="flex justify-between items-center border-t border-outline-variant/10 pt-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-slate-500">schedule</span>
                          <span className="text-[10px] font-label text-slate-500 uppercase tracking-tight">Created {new Date(game.id).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="text-[10px] font-label text-on-surface-variant font-bold">FAVORITE</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
