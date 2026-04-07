// Main Application Component
// Sets up routing and overall app structure

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { GamesPage } from './pages/GamesPage.tsx'
import { CardsPage } from './pages/CardsPage.tsx'
import { CollectionsPage } from './pages/CollectionsPage.tsx'
import { WebSocketProvider } from './context/WebSocketContext.tsx'

export const App: React.FC = () => {
  return (
    <Router>
      <WebSocketProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
          </Routes>
        </Layout>
      </WebSocketProvider>
    </Router>
  )
}
