import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

const GRID_SIZE = 20
const GAME_SPEED = 150

const SNAKE_TYPES = [
  { id: 'green', name: 'Green Snake', color: '#4ade80' },
  { id: 'blue', name: 'Blue Snake', color: '#60a5fa' },
  { id: 'red', name: 'Red Snake', color: '#f87171' },
]

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
}

function App() {
  const [gameStatus, setGameStatus] = useState('idle')
  const [playerSnake, setPlayerSnake] = useState([{ x: 5, y: 10 }])
  const [aiSnake, setAiSnake] = useState([{ x: 15, y: 10 }])
  const [food, setFood] = useState({ x: 10, y: 10 })
  const [direction, setDirection] = useState('ArrowRight')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [scoreHistory, setScoreHistory] = useState([])
  const [selectedSnakeType, setSelectedSnakeType] = useState(SNAKE_TYPES[0])
  const [eatingEffect, setEatingEffect] = useState(null)
  const [gameMessage, setGameMessage] = useState('')

  const directionRef = useRef('ArrowRight')
  const gameLoopRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('snakeGameData')
    if (saved) {
      const data = JSON.parse(saved)
      setHighScore(data.highScore || 0)
      setScoreHistory(data.scoreHistory || [])
    }
  }, [])

  const saveScore = useCallback((newScore) => {
    const newHighScore = Math.max(highScore, newScore)
    const newHistory = [newScore, ...scoreHistory].slice(0, 10)
    setHighScore(newHighScore)
    setScoreHistory(newHistory)
    localStorage.setItem('snakeGameData', JSON.stringify({
      highScore: newHighScore,
      scoreHistory: newHistory
    }))
  }, [highScore, scoreHistory])

  const generateFood = useCallback(() => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (
      playerSnake.some(s => s.x === newFood.x && s.y === newFood.y) ||
      aiSnake.some(s => s.x === newFood.x && s.y === newFood.y)
    )
    return newFood
  }, [playerSnake, aiSnake])

  const isValidPosition = (pos) => {
    return pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE
  }

  const checkCollision = (snake, otherSnake) => {
    const head = snake[0]
    if (!isValidPosition(head)) return true
    if (snake.slice(1).some(s => s.x === head.x && s.y === head.y)) return true
    if (otherSnake && otherSnake.some(s => s.x === head.x && s.y === head.y)) return true
    return false
  }

  const getAiMove = useCallback(() => {
    const aiHead = aiSnake[0]
    const playerHead = playerSnake[0]
    const foodPos = food

    let target
    if (aiSnake.length < playerSnake.length) {
      target = playerHead
    } else {
      target = foodPos
    }

    const dx = target.x - aiHead.x
    const dy = target.y - aiHead.y

    const moves = []
    if (dx !== 0) moves.push({ x: Math.sign(dx), y: 0 })
    if (dy !== 0) moves.push({ x: 0, y: Math.sign(dy) })

    const validMoves = moves.filter(move => {
      const newHead = { x: aiHead.x + move.x, y: aiHead.y + move.y }
      return isValidPosition(newHead) &&
        !playerSnake.some(s => s.x === newHead.x && s.y === newHead.y)
    })

    return validMoves.length > 0 ? validMoves[0] : { x: 0, y: 1 }
  }, [aiSnake, playerSnake, food])

  const gameStep = useCallback(() => {
    if (gameStatus !== 'playing') return

    const dir = DIRECTIONS[directionRef.current]
    const newPlayerHead = {
      x: playerSnake[0].x + dir.x,
      y: playerSnake[0].y + dir.y
    }

    if (checkCollision([newPlayerHead, ...playerSnake], aiSnake)) {
      setGameStatus('gameover')
      setGameMessage('Game Over! You hit something.')
      saveScore(score)
      return
    }

    let newPlayerSnake = [newPlayerHead, ...playerSnake]
    let newScore = score
    let newFood = food

    if (newPlayerHead.x === food.x && newPlayerHead.y === food.y) {
      newScore += 10
      setScore(newScore)
      setEatingEffect({ x: food.x, y: food.y })
      setTimeout(() => setEatingEffect(null), 300)
      newFood = generateFood()
    } else {
      newPlayerSnake = newPlayerSnake.slice(0, -1)
    }

    const aiMove = getAiMove()
    const newAiHead = {
      x: aiSnake[0].x + aiMove.x,
      y: aiSnake[0].y + aiMove.y
    }

    if (checkCollision([newAiHead, ...aiSnake], newPlayerSnake)) {
      setGameStatus('gameover')
      setGameMessage('Game Over! AI snake crashed.')
      saveScore(score)
      return
    }

    let newAiSnake = [newAiHead, ...aiSnake]
    if (newAiHead.x === food.x && newAiHead.y === food.y) {
      newFood = generateFood()
    } else if (newAiHead.x === newPlayerHead.x && newAiHead.y === newPlayerHead.y) {
      if (newPlayerSnake.length > newAiSnake.length) {
        newScore += newAiSnake.length * 10
        setScore(newScore)
        setGameMessage('You ate the AI snake!')
        newAiSnake = [{ x: 15, y: 10 }]
      } else {
        setGameStatus('gameover')
        setGameMessage('Game Over! AI snake ate you.')
        saveScore(score)
        return
      }
    } else {
      newAiSnake = newAiSnake.slice(0, -1)
    }

    setPlayerSnake(newPlayerSnake)
    setAiSnake(newAiSnake)
    setFood(newFood)
  }, [gameStatus, playerSnake, aiSnake, food, score, getAiMove, generateFood, saveScore])

  useEffect(() => {
    if (gameStatus === 'playing') {
      gameLoopRef.current = setInterval(gameStep, GAME_SPEED)
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameStatus, gameStep])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        const currentDir = directionRef.current
        const newDir = e.key
        const currentVec = DIRECTIONS[currentDir]
        const newVec = DIRECTIONS[newDir]
        if (currentVec.x !== -newVec.x || currentVec.y !== -newVec.y) {
          directionRef.current = newDir
          setDirection(newDir)
        }
      }
      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        togglePause()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const startGame = () => {
    setPlayerSnake([{ x: 5, y: 10 }])
    setAiSnake([{ x: 15, y: 10 }])
    setFood(generateFood())
    setScore(0)
    setDirection('ArrowRight')
    directionRef.current = 'ArrowRight'
    setGameMessage('')
    setGameStatus('playing')
  }

  const togglePause = () => {
    if (gameStatus === 'playing') {
      setGameStatus('paused')
    } else if (gameStatus === 'paused') {
      setGameStatus('playing')
    }
  }

  const renderCell = (x, y, isPlayerHead = false, isAiHead = false) => {
    const isPlayer = playerSnake.some(s => s.x === x && s.y === y)
    const isAi = aiSnake.some(s => s.x === x && s.y === y)
    const isFood = food.x === x && food.y === y
    const isEffect = eatingEffect && eatingEffect.x === x && eatingEffect.y === y

    let className = 'cell'
    if (isPlayerHead) className += ' player-head'
    else if (isPlayer) className += ' player'
    if (isAiHead) className += ' ai-head'
    else if (isAi) className += ' ai'
    if (isFood) className += ' food'
    if (isEffect) className += ' eating-effect'

    return <div key={`${x}-${y}`} className={className} />
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Snake Type</h2>
        <div className="snake-types">
          {SNAKE_TYPES.map(type => (
            <button
              key={type.id}
              className={`snake-type-btn ${selectedSnakeType.id === type.id ? 'selected' : ''}`}
              onClick={() => gameStatus === 'idle' && setSelectedSnakeType(type)}
              disabled={gameStatus !== 'idle'}
              style={{ '--snake-color': type.color }}
            >
              <span className="snake-preview" style={{ backgroundColor: type.color }}></span>
              {type.name}
            </button>
          ))}
        </div>

        <div className="scores">
          <div className="score-item">
            <span>Score:</span>
            <span>{score}</span>
          </div>
          <div className="score-item">
            <span>High Score:</span>
            <span>{highScore}</span>
          </div>
        </div>

        <div className="history">
          <h3>Score History</h3>
          <ul>
            {scoreHistory.map((s, i) => (
              <li key={i}>Game {scoreHistory.length - i}: {s}</li>
            ))}
          </ul>
        </div>

        <div className="controls">
          {gameStatus === 'idle' && (
            <button className="btn start" onClick={startGame}>Start Game</button>
          )}
          {(gameStatus === 'playing' || gameStatus === 'paused') && (
            <button className="btn pause" onClick={togglePause}>
              {gameStatus === 'playing' ? 'Pause' : 'Resume'}
            </button>
          )}
          {gameStatus === 'gameover' && (
            <button className="btn restart" onClick={startGame}>Play Again</button>
          )}
        </div>

        <div className="instructions">
          <p><strong>Controls:</strong></p>
          <p>Arrow keys to move</p>
          <p>Space or P to pause</p>
        </div>
      </div>

      <div className="game-area">
        {gameMessage && <div className="game-message">{gameMessage}</div>}
        <div className="grid" style={{ '--grid-size': GRID_SIZE }}>
          {Array.from({ length: GRID_SIZE }, (_, y) =>
            Array.from({ length: GRID_SIZE }, (_, x) =>
              renderCell(x, y, playerSnake[0].x === x && playerSnake[0].y === y, aiSnake[0].x === x && aiSnake[0].y === y)
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default App