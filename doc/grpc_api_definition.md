# gRPC API Definition

## Overview
This document defines the gRPC services and methods for the Mist Card project. The gRPC API will be used for communication between the `mist-server` and the `mist-client` application.

## Service Definitions

### GameService
The `GameService` provides methods for fetching game and card data.

#### FetchGames
Fetches the list of games.

**Request**:
```proto
message FetchGamesRequest {
}
```

**Response**:
```proto
message FetchGamesResponse {
  repeated Game games = 1;
}
```

**Example**:
```json
{
  "games": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Sample Game",
      "description": "A sample game for testing purposes."
    }
  ]
}
```

#### FetchCards
Fetches the list of cards for a specific game.

**Request**:
```proto
message FetchCardsRequest {
  string gameId = 1;
}
```

**Response**:
```proto
message FetchCardsResponse {
  repeated Card cards = 1;
}
```

**Example**:
```json
{
  "cards": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Sample Card",
      "gameId": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
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
- Use the `@grpc/grpc-js` library to implement the gRPC server.
- Define the gRPC services and methods in a `.proto` file.
- Implement the service methods to fetch game and card data from the JSON files.

### Client
- Use the `grpc-web` library to implement the gRPC client.
- Generate the client stubs from the `.proto` file.
- Use the client stubs to call the gRPC methods and fetch game and card data.

## Conclusion
This document defines the gRPC API for the Mist Card project, including the service definitions, data models, and implementation notes. This API will be used for communication between the `mist-server` and the `mist-client` application.