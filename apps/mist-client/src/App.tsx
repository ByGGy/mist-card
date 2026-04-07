// Main Application Component
// Sets up routing and overall app structure

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.js'
import { Dashboard } from './pages/Dashboard.js'
import { GamesPage } from './pages/GamesPage.js'
import { CardsPage } from './pages/CardsPage.js'
import { CollectionsPage } from './pages/CollectionsPage.js'

export const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}
