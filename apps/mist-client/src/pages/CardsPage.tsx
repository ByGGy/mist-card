// Cards Page
// CRUD interface for managing cards within a game

import React, { useState, useEffect } from 'react'
import { useGames } from '../hooks/useGames.js'
import { useSearchParams, Link } from 'react-router-dom'

export const CardsPage: React.FC = () => {
  const {
    cards,
    loading,
    error,
    createCard,
    updateCard,
    deleteCard
  } = useGames()

  const [searchParams] = useSearchParams()
  const gameId = searchParams.get('gameId') || ''

  const [newCardName, setNewCardName] = useState('')
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [editCardName, setEditCardName] = useState('')

  // Filter cards by gameId
  const gameCards = gameId ? cards.filter((card: any) => card.gameId === gameId) : cards

  // Handle form submission for creating a new card
  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCardName.trim() && gameId) {
      createCard(gameId, newCardName.trim())
      setNewCardName('')
    }
  }

  // Handle starting to edit a card
  const startEditing = (card: any) => {
    setEditingCardId(card.id)
    setEditCardName(card.name)
  }

  // Handle updating a card
  const handleUpdateCard = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCardId && editCardName.trim()) {
      updateCard(editingCardId, editCardName.trim())
      setEditingCardId(null)
    }
  }

  // Handle canceling edit
  const cancelEdit = () => {
    setEditingCardId(null)
  }

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-primary font-body">Loading cards...</p>
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
            <div className="flex items-center gap-2 mb-2">
              <Link to="/games" className="text-primary hover:opacity-80 transition-opacity">
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <h1 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight uppercase">Card Collection</h1>
            </div>
            <p className="text-on-surface-variant font-body text-sm">Manage cards for {gameId ? `game ${gameId.substring(0, 8)}...` : 'all games'}</p>
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

        {/* Create New Card Form */}
        <div className="glass-panel p-6 rounded-xl border border-outline-variant/10 mb-8">
          <h2 className="text-xl font-bold font-headline text-primary mb-4 uppercase tracking-wider">Create New Card</h2>
          <form onSubmit={handleCreateCard} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1 font-label uppercase tracking-wider">Card Name</label>
              <input
                type="text"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-on-surface focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all"
                placeholder="Enter card name"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!gameId}
              className={`px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 ${
                gameId 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-variant text-slate-500 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined">add</span>
              Create Card
            </button>
            {!gameId && (
              <p className="text-xs text-error font-label">Please select a game first</p>
            )}
          </form>
        </div>
      </section>

      {/* Cards List */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-headline text-on-surface uppercase tracking-wider">Card Collection</h2>
          <div className="text-sm text-on-surface-variant font-body">
            {gameCards.length} card{gameCards.length !== 1 && 's'}
          </div>
        </div>

        {gameCards.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-2xl text-slate-500">style</span>
            </div>
            <p className="text-on-surface-variant font-body mb-2">No cards found</p>
            <p className="text-xs text-slate-500 font-label uppercase tracking-wider">Create your first card to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {gameCards.map((card: any) => (
              <div key={card.id} className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 hover:border-primary/20 transition-all">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    {editingCardId === card.id ? (
                      <form onSubmit={handleUpdateCard} className="w-full">
                        <div className="mb-3">
                          <input
                            type="text"
                            value={editCardName}
                            onChange={(e) => setEditCardName(e.target.value)}
                            className="w-full bg-surface-container text-on-surface border border-outline-variant/20 rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary/40"
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 transition-all"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="flex-1 px-3 py-1.5 bg-surface-variant text-on-surface rounded-lg text-xs font-medium hover:bg-surface-container-highest transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h3 className="font-headline font-bold text-lg text-on-surface line-clamp-1 flex-1">{card.name}</h3>
                        <button
                          onClick={() => startEditing(card)}
                          className="text-slate-500 hover:text-primary transition-colors text-sm"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                      </>
                    )}
                  </div>

                  {editingCardId !== card.id && (
                    <>
                      <div className="mb-4">
                        <div className="aspect-[2/3] bg-surface-container rounded-lg overflow-hidden mb-3">
                          <div className="h-full w-full bg-gradient-to-br from-surface-container to-surface-container-highest flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-slate-600">style</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteCard(card.id)}
                            className="flex-1 px-3 py-1.5 bg-error text-on-error rounded-lg text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                            Delete
                          </button>
                          <Link
                            to={`#`}
                            className="flex-1 px-3 py-1.5 bg-surface-variant border border-outline-variant/20 rounded-lg text-xs font-medium hover:bg-surface-container-highest transition-all flex items-center justify-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                            Design
                          </Link>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-outline-variant/10 pt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-label text-slate-500 uppercase tracking-tight">ID: {card.id.substring(0, 8)}...</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span>
                          <span className="text-[10px] font-label text-on-surface-variant font-bold">COMMON</span>
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
