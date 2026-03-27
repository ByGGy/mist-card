# Step 1: Project Setup with PNPM Monorepo

## Overview
This document outlines the first step for the Mist Card project, focusing on setting up a monorepo using PNPM and initializing the foundational components.

## Tasks

### 1. Initialize PNPM Monorepo
1. **Install PNPM**:
   - Verify installation with `pnpm --version`.
   - if not installed, Install PNPM globally using `npm install -g pnpm`.
   - Verify installation with `pnpm --version` again.

2. **Create Monorepo Structure**:
   - Initialize a PNPM workspace with `pnpm init`.
   - Create a `pnpm-workspace.yaml` file to define the workspace structure.

3. **Set Up Workspace**:
   - Create directories for the backend, frontend, and Godot application within the monorepo.
   - Initialize each directory as a separate application within the workspace.

### 2. Backend Setup
1. **Initialize Backend Package**:
   - Navigate to the backend directory.
   - Initialize a Node.js project using `pnpm init`.
   - Install necessary dependencies such as Express, MongoDB (or another database), and other required packages using `pnpm add`.

2. **Basic Server Setup**:
   - Set up a basic Express server in the backend package.
   - Create a simple route for testing purposes, such as a health check endpoint.

3. **Database Configuration**:
   - Configure the database connection in the backend package.
   - Define a basic schema for projects to test the database connection.

### 3. Frontend Setup
1. **Initialize Frontend Package**:
   - Navigate to the frontend directory.
   - Initialize a React project using `create-react-app` or a similar tool with PNPM.
   - Install necessary dependencies such as React Router and a UI framework using `pnpm add`.

2. **Basic UI Structure**:
   - Set up the basic UI structure, including a simple navigation and layout.
   - Create a basic page for testing purposes, such as a landing page or a simple dashboard.

### 4. Godot Application Setup
1. **Install Godot**:
   - Download and install the latest version of Godot from the [official website](https://godotengine.org/).
   - Familiarize yourself with the Godot editor interface.

2. **Basic Project Structure**:
   - Create a new Godot project for the playtesting application.
   - Set up the basic project structure, including a simple scene for testing purposes.

### 5. Monorepo Configuration
1. **Shared Dependencies**:
   - Identify and install shared dependencies at the root of the monorepo.
   - Ensure that all packages within the workspace can access these shared dependencies.

2. **Scripts and Workflows**:
   - Define common scripts in the root `package.json` for tasks such as building, testing, and running the project.
   - Set up workflows for running multiple packages simultaneously, if needed.

## Verification
1. **Test Backend**:
   - Run the backend server and verify that the health check endpoint is accessible.
   - Test the database connection by creating and retrieving a simple record.

2. **Test Frontend**:
   - Start the React development server and verify that the basic UI structure is rendered correctly.
   - Test navigation and ensure that the basic page is accessible.

3. **Test Godot Application**:
   - Open the Godot project and verify that the basic scene is set up correctly.
   - Run the Godot project to ensure that it starts without errors.

## Conclusion
By completing Step 1, we will have set up the foundational components of the Mist Card project using a PNPM monorepo. This includes initializing the backend, frontend, and Godot application, and verifying that each component is functioning correctly. The next steps will focus on developing core features and integrating the components.