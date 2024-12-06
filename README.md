# React + Vite

npm run dev

# Game Recommendation and Management System

This project is a web application built with React and Vite. It provides functionalities for users to log in, register, view game recommendations, purchase games, and for admins to manage games.

## Features

- User Authentication (Login/Register)
- View and Purchase Games
- View Seasonal Game Recommendations
- Admin Panel for Managing Games
- Date-based Reports for Admins

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for linting errors.
- `npm run preview`: Preview the production build.

## Configuration

The application uses Vite for bundling and development. The configuration can be found in the `vite.config.js` file.

## ESLint

The project uses ESLint for linting. The configuration can be found in the `.eslintrc.cjs` file.

## API

The application interacts with a backend API for various functionalities. The base URL for the API is configured in `src/services/api.js`.

## Components

### Authentication

- `Login.jsx`: Component for user login.
- `Register.jsx`: Component for user registration.

### Home

- `Home.jsx`: Component for displaying all games.
- `Purchase.jsx`: Component for displaying purchased games.
- `Recommendations.jsx`: Component for displaying game recommendations.
- `Seasonal.jsx`: Component for displaying seasonal game recommendations.

### Admin

- `Admin.jsx`: Admin dashboard.
- `AdminAddGame.jsx`: Component for adding a new game.
- `AdminDeleteGame.jsx`: Component for deleting a game.
- `AdminDateReport.jsx`: Component for viewing date-based reports.

### Layout

- `NavBarLayout.jsx`: Component for the navigation bar layout.

### Services

- `api.js`: Configuration for Axios API client.
- `gameController`: Contains functions for game-related API calls.
- `userController`: Contains functions for user-related API calls.