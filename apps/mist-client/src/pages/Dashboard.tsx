// Dashboard Page
// Main overview and project library

import React from 'react'
import { Link } from 'react-router-dom'

export const Dashboard: React.FC = () => {
  // Sample project data - in a real app, this would come from your Redux store
  const projects = [
    {
      id: '1',
      name: 'Ethereal Realms',
      description: 'A tactical combat TCG focusing on resource management and environmental effects.',
      status: 'Active',
      lastEdited: '2h ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ZNugWRRQxJ3lnbujuJm4NdJ3q5ejtdiYScHo6Rv4aqGTrUgOMHxJfDBTsI0xH0940PyOB8lMOw-TyVl7SaruCXKqh3KHshOWNC3atNgz6bE76ClFSYJDT9CtFZS5E9hn_iIZeA-GO3QJFmJY50wrlAgCzUDoMZqD4qWIpWt-rZyBq9RhKGqP4z6zIx1TY8Mmrc2whUb4xeRUWw34Fb-rCJJT2D-WzE6-mE89rkTRE22Dag4nt73CZPwvxbyT7vY2P1EO4niD124'
    },
    {
      id: '2',
      name: 'Neon Circuitry',
      description: 'Cyberpunk deckbuilder with hacking mechanics and modular hardware upgrades.',
      status: 'Archived',
      lastEdited: '3 days ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAymqkQrgRGbNUWCP4x4ED-Vg4VcvMeXPXDGHmPqKD2-4W85ygKobWtr5BF9qVXX_xaGiNneYYMkcY2uNbOdqJgTbKZdX6VRQtRucqYnz_HGwxNUx8nataHJUuHvonEwv2VXDsYWTtBC9G7hWio0AmUNKvfDvBqsJa9p04xQV6y-xYJcczdNjt2CBsXgsMvgm27A2BlzZLrZ04ezlTxXjkthOKLc_dzS6eri-4aRPmkN5Gn9XK1kUUMa68ZkyFKEm7pjw0vA-GeghE'
    },
    {
      id: '3',
      name: 'Potion Craft',
      description: 'Cozy card game centered around gathering ingredients and crafting magical elixirs.',
      status: 'Active',
      lastEdited: '1 week ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTn7vvMj3RGQ5IN2U-ngGHRogFR--RUzcYSHxnNn3HZMybmkubbpWsgfE8Gk-GOvBVNyh6eg1LGmJyWCpCJJEBWFJGxwCf6W2gw5fxIVY0lRrpStGeqUxppOYK6hX90Fi1kLaeKNTokftfpEvQ8l5HqQSEQ1PR-7PNbK9q3RHTQ9z5VYdoAyOm6mE5uLo_b0pXLw8nAv9Bt3XTWZ0pFVWCxaf87DIxjeF6JxJwBtvQAzT6ShTwv_e-o3YYCou0e4fIdfx9uUzMpwg'
    }
  ]

  return (
    <div className="h-full">
      {/* Hero Header Section */}
      <section className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight mb-2 uppercase">Project Library</h1>
          <p className="text-on-surface-variant font-body text-sm max-w-md">Orchestrate your mechanics, visual assets, and game balance in a high-fidelity workspace designed for alchemists.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary">search</span>
            <input 
              className="bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm font-body w-64 focus:ring-1 focus:ring-primary/40 focus:bg-surface-container transition-all"
              placeholder="Filter projects..."
              type="text"
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* New Project Card */}
        <Link 
          to="/games/new"
          className="flex flex-col items-center justify-center h-[320px] rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container transition-all group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl text-primary">add</span>
          </div>
          <span className="font-headline font-bold text-lg text-primary">Create New Project</span>
          <span className="font-label text-[10px] uppercase tracking-widest text-slate-500 mt-1">Start from scratch or template</span>
        </Link>

        {/* Project Cards */}
        {projects.map((project) => (
          <div key={project.id} className="group relative bg-surface-container-low rounded-xl overflow-hidden hover:bg-surface-container transition-all flex flex-col h-[320px]">
            <div className="h-40 w-full overflow-hidden relative">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={project.image}
                alt={project.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-[10px] font-label font-bold uppercase rounded-full backdrop-blur-md ${
                  project.status === 'Active' 
                    ? 'bg-tertiary-container/20 text-tertiary-container' 
                    : 'bg-secondary-container/20 text-secondary-container'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline font-bold text-xl text-on-surface">{project.name}</h3>
                <button className="text-slate-500 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
              <p className="text-on-surface-variant font-body text-xs line-clamp-2 mb-4">{project.description}</p>
              <div className="mt-auto flex justify-between items-center border-t border-outline-variant/10 pt-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-slate-500">schedule</span>
                  <span className="text-[10px] font-label text-slate-500 uppercase tracking-tight">Edited {project.lastEdited}</span>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border-2 border-surface-container-low bg-surface-container-highest overflow-hidden">
                    <img 
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjOuXkmoVpGQqDUY2HcKAtuGIdOI-Xv-V7HADxO5-dFcEY2hWizKCmwgnIGOw9DbrprWjUk-DpzkyqG5UHzqJjfjV_Li1aFyrbv5BwUH0C2zF01Besa1FstBQk07p5vDROVm8KOmcU6CttatKE3RZkLW7Rkyfy-8I3izVig4M7_01PJCurZqMEDFPdfo1LZOzD1-wfuO9sts-o81khbGom9HB98adSgc0h_pno8bevXZEubU7FaptEKq_0DC1fa3zHgg4c8vpAlFY"
                      alt="User avatar"
                    />
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-surface-container-low bg-surface-container-highest flex items-center justify-center text-[8px] font-bold">+2</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Template Placeholder */}
        <div className="group relative bg-surface-container-low/50 border border-outline-variant/10 rounded-xl overflow-hidden hover:bg-surface-container transition-all flex flex-col h-[320px] opacity-70 hover:opacity-100">
          <div className="h-40 w-full bg-surface-container flex items-center justify-center relative">
            <span className="material-symbols-outlined text-4xl text-slate-600">collections_bookmark</span>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-headline font-bold text-xl text-on-surface-variant">Quick Starter</h3>
            </div>
            <p className="text-on-surface-variant/60 font-body text-xs mb-4">Standard 60-card deck layout with basic balance curves pre-configured.</p>
            <div className="mt-auto">
              <button className="text-[10px] font-label font-bold text-primary uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                Use Template <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="fixed bottom-8 right-8 flex gap-4 pointer-events-none">
        <div className="glass-panel p-4 rounded-xl shadow-2xl border border-outline-variant/10 pointer-events-auto flex gap-6 items-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-1">Total Objects</span>
            <span className="text-2xl font-headline font-bold text-primary">1,248</span>
          </div>
          <div className="w-px h-8 bg-outline-variant/20"></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-1">Disk Usage</span>
            <span className="text-2xl font-headline font-bold text-secondary">42.8GB</span>
          </div>
          <button className="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all">
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </div>
    </div>
  )
}
