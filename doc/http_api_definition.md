# HTTP API Definition

## Overview
This document defines the HTTP endpoints for the Mist Card project. The HTTP API will be used for communication between the `mist-server` and the `mist-playground` application.

## Endpoints

### GET /api/games
Fetches the list of games.

**Response**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Sample Game",
    "description": "A sample game for testing purposes."
  }
]
```

### GET /api/games/:gameId/cards
Fetches the list of cards for a specific game.

**Parameters**:
- `gameId` (string): The unique identifier of the game.

**Response**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Sample Card",
    "gameId": "550e8400-e29b-41d4-a716-446655440000"
  }
]
```

## Data Models

### Game
Represents a game in the Mist Card project.

**Fields**:
- `id` (string): The unique identifier for the game.
- `name` (string): The name of the game.
- `description` (string): A description of the game.

**Example**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Sample Game",
  "description": "A sample game for testing purposes."
}
```

### Card
Represents a card in the Mist Card project.

**Fields**:
- `id` (string): The unique identifier for the card.
- `name` (string): The name of the card.
- `gameId` (string): The unique identifier of the game to which the card belongs.

**Example**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Sample Card",
  "gameId": "550e8400-e29b-41d4-a716-446655440000"
}
```

## Implementation Notes

### Server
- Use the `express` library to implement the HTTP server.
- Define the HTTP endpoints to fetch game and card data from the JSON files.
- Ensure that the endpoints return the correct data in the expected format.

### Playground
- Use the `HTTPRequest` node in Godot to make HTTP requests to the server endpoints.
- Implement methods to fetch game and card data using HTTP requests.
- Parse the JSON responses and display the data in the Godot scene.

## Conclusion
This document defines the HTTP API for the Mist Card project, including the endpoints, data models, and implementation notes. This API will be used for communication between the `mist-server` and the `mist-playground` application.