# Snake Game with AI Opponent

A classic Snake game built with React where you compete against an AI-controlled snake. Features include snake type selection, pause controls, score persistence with localStorage, and eating mechanics.

## Features

- **Player vs AI**: Control your snake and compete against an intelligent AI opponent
- **Snake Type Selection**: Choose from 3 different snake colors (Green, Blue, Red)
- **Pause/Resume**: Use buttons or keyboard shortcuts (Space/P) to control game flow
- **Eating Mechanics**:
  - Eat food to grow and gain +10 points
  - Eat smaller AI snake to gain points (AI length × 10)
  - Die if you collide with a larger AI snake
- **Score Persistence**: High scores and game history saved to localStorage
- **Visual Effects**: Animated feedback when eating food

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

```bash
# Navigate to project directory
cd snake-game

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

### Controls

- **Arrow Keys**: Move your snake (Up, Down, Left, Right)
- **Space / P**: Pause or Resume the game

### Game Rules

1. Use arrow keys to control your snake
2. Eat yellow food to grow and gain points
3. If your snake is longer than the AI, you can eat it for bonus points
4. If AI snake is longer than you, avoid collision or you will lose
5. Hitting the wall results in game over

### Snake Types

Select your snake type from the left sidebar before starting:
- **Green Snake**: Classic green color
- **Blue Snake**: Cool blue color
- **Red Snake**: Aggressive red color

## Project Structure

```
snake-game/
├── src/
│   ├── App.jsx      # Main game component
│   ├── App.css      # Game styling
│   ├── index.css    # Global styles
│   └── main.jsx     # Entry point
├── index.html       # HTML template
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## Configuration

The game uses these default settings:
- Grid size: 20x20 cells
- Game speed: 150ms per move
- Score history: Last 10 games stored

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Tech Stack

- **React**: UI framework
- **Vite**: Build tool and dev server
- **localStorage**: Score persistence