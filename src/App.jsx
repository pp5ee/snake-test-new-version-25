import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import './App.css'

const GRID_SIZE = 20
const GAME_SPEED = 150

const SNAKE_TYPES = [
  { id: 'green', name: 'Green Snake', color: '#4ade80', headColor: '#22c55e' },
  { id: 'blue', name: 'Blue Snake', color: '#60a5fa', headColor: '#3b82f6' },
  { id: 'red', name: 'Red Snake', color: '#f87171', headColor: '#dc2626' },
]

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
}

const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAMEOVER: 'gameover',
}

// Utility functions moved outside component
const isValidPosition = (pos) => {
  return pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE
}

const snakeToSet = (snake) => new Set(snake.map(s => `${s.x},${s.y}`))

const checkCollision = (head, snake, otherSnakeSet) => {
  if (!isValidPosition(head)) return true
  if (snake.slice(1).some(s => s.x === head.x && s.y === head.y)) return true
  if (otherSnakeSet && otherSnakeSet.has(`${head.x},${head.y}`)) return true
  return false
}

const isOppositeDirection = (current, next) => {
  const cur = DIRECTIONS[current]
  const nxt = DIRECTIONS[next]
  return cur.x === -nxt.x && cur.y === -nxt.y
}

function App() {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.IDLE)
  const [playerSnake, setPlayerSnake] = useState([{ x: 5, y: 10 }])
  const [aiSnake, setAiSnake] = useState([{ x: 15, y: 10 }])
  const [food, setFood] = useState({ x: 10, y: 10 })
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [scoreHistory, setScoreHistory] = useState([])
  const [selectedSnakeType, setSelectedSnakeType] = useState(SNAKE_TYPES[0])
  const [eatingEffect, setEatingEffect] = useState(null)
  const [gameMessage, setGameMessage] = useState('')

  const directionRef = useRef('ArrowRight')
  const gameLoopRef = useRef(null)
  const scoreRef = useRef(0)

  // Keep score ref in sync for game loop
  useEffect(() => {
    scoreRef.current = score
  }, [score])

  // Memoize snake position sets for O(1) lookups
  const playerSnakeSet = useMemo(() => snakeToSet(playerSnake), [playerSnake])
  const aiSnakeSet = useMemo(() => snakeToSet(aiSnake), [aiSnake])

  useEffect(() => {
    const saved = localStorage.getItem('snakeGameData')
    if (saved) {
      const data = JSON.parse(saved)
      setHighScore(data.highScore || 0)
      setScoreHistory(data.scoreHistory || [])
    }
  }, [])

  const saveScore = useCallback((newScore) => {
    setHighScore(prev => {
      const newHigh = Math.max(prev, newScore)
      setScoreHistory(prevHistory => {
        const newHistory = [newScore, ...prevHistory].slice(0, 10)
        localStorage.setItem('snakeGameData', JSON.stringify({
          highScore: newHigh,
          scoreHistory: newHistory
        }))
        return newHistory
      })
      return newHigh
    })
  }, [])

  const generateFood = useCallback(() => {
    let newFood
    const occupied = new Set([...playerSnakeSet, ...aiSnakeSet])
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (occupied.has(`${newFood.x},${newFood.y}`))
    return newFood
  }, [playerSnakeSet, aiSnakeSet])

  const getAiMove = useCallback(() => {
    const aiHead = aiSnake[0]
    const playerHead = playerSnake[0]
    const foodPos = food

    const target = aiSnake.length < playerSnake.length ? playerHead : foodPos

    const dx = target.x - aiHead.x
    const dy = target.y - aiHead.y

    const moves = []
    if (dx !== 0) moves.push({ x: Math.sign(dx), y: 0 })
    if (dy !== 0) moves.push({ x: 0, y: Math.sign(dy) })

    const validMoves = moves.filter(move => {
      const newHead = { x: aiHead.x + move.x, y: aiHead.y + move.y }
      return isValidPosition(newHead) && !playerSnakeSet.has(`${newHead.x},${newHead.y}`)
    })

    return validMoves[0] || { x: 0, y: 1 }
  }, [aiSnake, playerSnake, food, playerSnakeSet])

  const gameStep = useCallback(() => {
    if (gameStatus !== GAME_STATUS.PLAYING) return

    const dir = DIRECTIONS[directionRef.current]
    const newPlayerHead = {
      x: playerSnake[0].x + dir.x,
      y: playerSnake[0].y + dir.y
    }

    if (checkCollision(newPlayerHead, playerSnake, aiSnakeSet)) {
      setGameStatus(GAME_STATUS.GAMEOVER)
      setGameMessage('Game Over! You hit something.')
      saveScore(scoreRef.current)
      return
    }

    let newPlayerSnake = [newPlayerHead, ...playerSnake]
    let newScore = scoreRef.current
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

    const newPlayerSnakeSet = snakeToSet(newPlayerSnake)
    if (checkCollision(newAiHead, aiSnake, newPlayerSnakeSet)) {
      setGameStatus(GAME_STATUS.GAMEOVER)
      setGameMessage('Game Over! AI snake crashed.')
      saveScore(scoreRef.current)
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
        setGameStatus(GAME_STATUS.GAMEOVER)
        setGameMessage('Game Over! AI snake ate you.')
        saveScore(scoreRef.current)
        return
      }
    } else {
      newAiSnake = newAiSnake.slice(0, -1)
    }

    setPlayerSnake(newPlayerSnake)
    setAiSnake(newAiSnake)
    setFood(newFood)
  }, [gameStatus, playerSnake, aiSnake, food, aiSnakeSet, getAiMove, generateFood, saveScore])

  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      gameLoopRef.current = setInterval(gameStep, GAME_SPEED)
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameStatus, gameStep])

  const togglePause = useCallback(() => {
    setGameStatus(prev => {
      if (prev === GAME_STATUS.PLAYING) return GAME_STATUS.PAUSED
      if (prev === GAME_STATUS.PAUSED) return GAME_STATUS.PLAYING
      return prev
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (Object.keys(DIRECTIONS).includes(e.key)) {
        e.preventDefault()
        if (!isOppositeDirection(directionRef.current, e.key)) {
          directionRef.current = e.key
        }
      }
      if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        togglePause()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePause])

  const startGame = () => {
    setPlayerSnake([{ x: 5, y: 10 }])
    setAiSnake([{ x: 15, y: 10 }])
    setFood(generateFood())
    setScore(0)
    directionRef.current = 'ArrowRight'
    setGameMessage('')
    setGameStatus(GAME_STATUS.PLAYING)
  }

  const renderCell = (x, y, isPlayerHead, isAiHead) => {
    const posKey = `${x},${y}`
    const isPlayer = playerSnakeSet.has(posKey)
    const isAi = aiSnakeSet.has(posKey)
    const isFood = food.x === x && food.y === y
    const isEffect = eatingEffect && eatingEffect.x === x && eatingEffect.y === y

    let className = 'cell'
    if (isPlayerHead) className += ' player-head'
    else if (isPlayer) className += ' player'
    if (isAiHead) className += ' ai-head'
    else if (isAi) className += ' ai'
    if (isFood) className += ' food'
    if (isEffect) className += ' eating-effect'

    return <div key={posKey} className={className} />
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
              onClick={() => gameStatus === GAME_STATUS.IDLE && setSelectedSnakeType(type)}
              disabled={gameStatus !== GAME_STATUS.IDLE}
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
          {gameStatus === GAME_STATUS.IDLE && (
            <button className="btn start" onClick={startGame}>Start Game</button>
          )}
          {(gameStatus === GAME_STATUS.PLAYING || gameStatus === GAME_STATUS.PAUSED) && (
            <button className="btn pause" onClick={togglePause}>
              {gameStatus === GAME_STATUS.PLAYING ? 'Pause' : 'Resume'}
            </button>
          )}
          {gameStatus === GAME_STATUS.GAMEOVER && (
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
        <div
          className="grid"
          style={{
            '--grid-size': GRID_SIZE,
            '--player-color': selectedSnakeType.color,
            '--player-head-color': selectedSnakeType.headColor
          }}
        >
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