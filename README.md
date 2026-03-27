# Mist Card

## Pitch
Mist Card is a comprehensive platform for fast prototyping, iteration, and testing of Trading Card Game (TCG) card games. The goal is to provide a flexible and efficient tool for game designers and developers to quickly create, modify, and test card mechanics and interactions. The platform consists of a backend application, a frontend application for workspace and project management, and a Godot-based application for playtesting.

## Description
Mist Card is a multi-component platform designed to streamline the development and testing of TCG card games. It includes:

1. **Backend Application**: Built with Node.js to handle data storage, user authentication, and API services.
2. **Frontend Application**: Built with React to provide a user-friendly interface for managing workspaces, projects, card libraries, and game rules.
3. **Godot Application**: A desktop application for playtesting card games, built using the Godot game engine.

## Features

### Workspace and Project Management
- Create, manage, and switch between multiple workspaces and projects.
- Each project contains its own card library and game rules.

### Card Library Management
- Create, edit, and organize TCG cards with attributes such as name, description, values, and abilities.
- Support for different card types (e.g., creatures, spells, items, events, locations).

### Game Rules Engine
- Define and modify game rules, including turn structure, resource management, and victory conditions.
- Flexible rules engine to accommodate various TCG mechanics.

### Prototyping and Playtesting
- Quickly iterate on card designs and test interactions in a simulated game environment within the Godot application.
- Real-time updates to card designs and rules reflected in the playtesting environment.

### Export and Import
- Export card designs, game rules, and entire projects for backup or sharing.
- Import existing card data and game rules.

## Technical Stack

### Backend
- **Node.js**: JavaScript runtime for building the backend application.
- **Express**: Web framework for Node.js to handle API routes.
- **JSON File Storage**: Simple and portable data storage solution for initial implementation.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Vite**: Modern build tool for faster development and build times.
- **Material-UI**: UI framework for consistent and responsive design.

### Godot Application
- **Godot 4.6.1**: Latest stable release of the Godot game engine for rendering and game logic.
- **GDScript**: Scripting language for defining card abilities and game rules.

## Getting Started

### Prerequisites
- Node.js and PNPM installed for backend and frontend development.
- Godot 4.6.1 installed for playtesting application development.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mist-card.git
   cd mist-card
   ```

2. Install dependencies using PNPM:
   ```bash
   pnpm install
   ```

3. Set up the backend:
   ```bash
   cd backend
   pnpm install
   pnpm start
   ```

4. Set up the frontend:
   ```bash
   cd frontend
   pnpm install
   pnpm dev
   ```

5. Open the Godot project and run the playtesting application.

## Documentation
- [Product Requirement Document (PRD)](prd.md)
- [Decisions](decisions.md)
- [Next Steps](@nextstep.md)

## License
This project is licensed under the MIT License.
