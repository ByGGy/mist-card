# Next Steps: Data Model and Protocol Definition

## Overview
This document outlines the next steps for the Mist Card project, focusing on defining a static data model for a game and its cards, and establishing a protocol for transferring data between the server, client, and playground applications.

## Tasks

### 1. Define the Data Model
1. **Game Data Model**:
   - Define a static data model for a game, including attributes such as `id`, `name`, and `description`.
   - Use the `uuid` module to generate unique identifiers for the `id` field.
   - Example:
     ```json
     {
       "id": "550e8400-e29b-41d4-a716-446655440000",
       "name": "Sample Game",
       "description": "A sample game for testing purposes."
     }
     ```

2. **Card Data Model**:
   - Define a static data model for cards, including attributes such as `id`, `name`, and `gameId` (to associate cards with a game).
   - Use the `uuid` module to generate unique identifiers for the `id` field.
   - Example:
     ```json
     {
       "id": "550e8400-e29b-41d4-a716-446655440001",
       "name": "Sample Card",
       "gameId": "550e8400-e29b-41d4-a716-446655440000"
     }
     ```

3. **Store Static Data**:
   - Store the static game and card data in JSON files within the `mist-server` application.
   - Example structure:
     ```
     mist-server/
     ├── data/
     │   ├── games.json
     │   └── cards.json
     ```

### 2. Implement Server Communication
1. **gRPC Server**:
   - Set up a gRPC server in the `mist-server` to handle remote procedure calls.
   - Define gRPC services and methods for fetching games and cards.
   - Use the `@grpc/grpc-js` library to implement the gRPC server.

2. **Data Fetching Methods**:
   - Implement methods to fetch the list of games and cards using gRPC.
   - Ensure that the methods return the correct data in the expected format.

### 3. Update the Client Application
1. **gRPC Client**:
   - Implement a gRPC client in the `mist-client` to connect to the gRPC server.
   - Use the `grpc-web` library to implement the gRPC client.
   - Define methods to fetch game and card data using gRPC.

2. **Display Games and Cards**:
   - Update the UI to display the list of games and their associated cards.
   - Use Material-UI components to create a visually appealing and functional interface.

### 4. Update the Playground Application
1. **HTTP Client**:
   - Implement an HTTP client in the `mist-playground` to fetch data from the server.
   - Use the `HTTPRequest` node in Godot to make HTTP requests to the server endpoints.
   - Define methods to fetch game and card data using HTTP requests.

2. **Display Games and Cards**:
   - Update the Godot scene to display the list of games and their associated cards.
   - Use Godot's UI nodes to create a basic display of the game and card data.

### 5. Test the Implementation
1. **Test gRPC Server**:
   - Verify that the gRPC server is running and can handle remote procedure calls.
   - Test gRPC methods for fetching games and cards using a gRPC client tool.

2. **Test HTTP Endpoints**:
   - Verify that the HTTP endpoints are accessible and return the correct data.
   - Test the endpoints using a tool like Postman or `curl`.

3. **Test Client Application**:
   - Start the `mist-client` and verify that it correctly connects to the gRPC server.
   - Verify that it correctly fetches and displays the list of games and cards.

4. **Test Playground Application**:
   - Open the Godot project and run the `mist-playground` application.
   - Verify that it correctly fetches and displays the list of games and cards using HTTP requests.

### 6. Document the Protocol
1. **gRPC Documentation**:
   - Document the gRPC services and methods, including the request and response formats.
   - Example:
     ```markdown
     ### gRPC Services
     
     #### GameService
     
     ##### FetchGames
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

     ##### FetchCards
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
     ```

2. **HTTP API Documentation**:
   - Document the HTTP endpoints for the playground application, including the request and response formats.
   - Example:
     ```markdown
     ### HTTP Endpoints
     
     #### GET /api/games
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

     #### GET /api/games/:gameId/cards
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
     ```

3. **Data Model Documentation**:
   - Document the data models for games and cards, including the attributes and their types.

## Verification
1. **Server**:
   - Verify that the server endpoints are accessible and return the correct data.

2. **Client**:
   - Verify that the client application correctly fetches and displays the game and card data.

3. **Playground**:
   - Verify that the playground application correctly fetches and displays the game and card data.

## Conclusion
By completing these steps, you will have a functional data model and protocol for transferring data between the server, client, and playground applications. This will allow you to proceed with more complex features and interactions in the future.