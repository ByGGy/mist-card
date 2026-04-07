// Main Layout Component
// Provides the overall application structure with navigation

import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()
  
  // Navigation items
  const navItems = [
    { path: '/', name: 'Dashboard', icon: 'dashboard' },
    { path: '/games', name: 'Games', icon: 'sports_esports' },
    { path: '/cards', name: 'Cards', icon: 'style' },
    { path: '/collections', name: 'Collections', icon: 'collections_bookmark' }
  ]

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center w-full px-6 py-3 bg-[#111417] z-50 fixed top-0">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold tracking-tighter text-[#69daff] font-headline">Mist Card</div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`font-body text-sm uppercase tracking-wider transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'text-[#69daff] border-b-2 border-[#69daff] pb-1 font-bold' 
                    : 'text-slate-400 font-medium hover:text-[#69daff]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2 mr-4">
            <button className="p-2 text-slate-400 hover:text-[#69daff] transition-all">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-[#69daff] transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-[#69daff] transition-all">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
          <button className="px-4 py-1.5 bg-surface-variant border border-outline-variant/20 rounded-lg text-sm font-medium hover:bg-surface-container-highest transition-all">
            Export
          </button>
          <button className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-sm font-bold hover:opacity-90 transition-all active:scale-95">
            Deploy
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-[56px] overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="fixed left-0 top-0 h-full flex flex-col z-40 bg-[#111417] w-64 pt-[56px] shadow-2xl">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container overflow-hidden">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <div>
                <div className="text-lg font-bold text-[#69daff] font-headline leading-tight">Core Set 2024</div>
                <div className="text-[10px] font-label uppercase tracking-widest text-slate-500">v1.0.4-alpha</div>
              </div>
            </div>

            <button className="w-full py-3 px-4 mb-8 bg-secondary-container text-on-secondary-container rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-x-1 transition-all group">
              <span className="material-symbols-outlined text-sm">add</span>
              New Object
            </button>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 py-3 px-4 transition-all ${
                    location.pathname === item.path 
                      ? 'text-[#69daff] bg-[#171a1d] rounded-r-full border-l-4 border-[#69daff] translate-x-1' 
                      : 'text-slate-500 hover:bg-[#171a1d] hover:text-slate-200'
                  }`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="font-label text-xs font-bold uppercase tracking-widest">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-outline-variant/10">
            <nav className="flex flex-col gap-1">
              <a className="flex items-center gap-3 text-slate-500 py-2 px-4 hover:text-slate-200 transition-all" href="#">
                <span className="material-symbols-outlined text-lg">description</span>
                <span className="font-label text-xs font-bold uppercase tracking-widest">Documentation</span>
              </a>
              <a className="flex items-center gap-3 text-slate-500 py-2 px-4 hover:text-slate-200 transition-all" href="#">
                <span className="material-symbols-outlined text-lg">help</span>
                <span className="font-label text-xs font-bold uppercase tracking-widest">Support</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 bg-[#0c0e11] blueprint-grid overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
