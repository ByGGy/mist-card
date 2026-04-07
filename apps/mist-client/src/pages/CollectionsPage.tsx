// Collections Page
// Placeholder for collections management

import React from 'react'

export const CollectionsPage: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-3xl text-slate-500">collections_bookmark</span>
        </div>
        <h2 className="text-2xl font-bold font-headline text-on-surface mb-2">Collections Coming Soon</h2>
        <p className="text-on-surface-variant font-body max-w-md mx-auto">
          This section will allow you to organize your games and cards into collections, 
          create decks, and manage your library with advanced filtering and sorting.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-2 bg-surface-variant border border-outline-variant/20 rounded-lg font-medium hover:bg-surface-container-highest transition-all">
            Learn More
          </button>
          <button className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-all">
            Request Feature
          </button>
        </div>
      </div>
    </div>
  )
}
