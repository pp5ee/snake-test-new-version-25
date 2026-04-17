# Snake Game with AI Opponent - Implementation Plan

## Goal Description

Create a Snake game in React with single-player vs AI snake gameplay. The game features local score persistence (localStorage), snake type selection, pause/start controls, eating mechanics where the player can eat the AI snake (eat smaller to gain points, die if eaten by larger snake), food eating visual effects, and historical high score tracking. The game is frontend-only with simple code.

## Acceptance Criteria

- AC-1: Game renders a playable Snake game on a grid where the player controls one snake and competes against an AI-controlled snake
  - Positive Tests (expected to PASS):
    - Game loads and displays a 20x20 grid with player snake and AI snake
    - Player snake responds to arrow key inputs and moves continuously
    - AI snake moves autonomously and pursues player/food
  - Negative Tests (expected to FAIL):
    - Game should not allow two snakes to occupy the same cell simultaneously without collision detection
    - Invalid input (e.g., 180-degree turn) should be rejected

- AC-2: Player can select snake type from the left sidebar before starting the game
  - Positive Tests:
    - At least 3 different snake types are available for selection (different colors/patterns)
    - Selected snake type is visually reflected in the game
  - Negative Tests:
    - Snake type selection should be disabled during active gameplay

- AC-3: Game supports pause and start/restart controls
  - Positive Tests:
    - Pause button stops all movement; resume continues from same state
    - Start button begins a new game from initial state
    - Keyboard shortcuts (Space/P) work for pause/resume
  - Negative Tests:
    - Pause should not be available when game is not running

- AC-4: Score is recorded and persists across sessions using localStorage
  - Positive Tests:
    - Current score increases when player snake eats food (+10 points)
    - Score increases when eating smaller AI snake (+AI snake length × 10 points)
    - High score is saved and displayed on game load
    - Score history (last 10 games) is accessible
  - Negative Tests:
    - Score should not persist if localStorage is cleared

- AC-5: Eating mechanics work correctly - eat smaller snakes to gain points, die if eaten by larger snake
  - Positive Tests:
    - Player eating smaller AI snake increases player length and score
    - Player dies when colliding head-on with larger AI snake
    - AI snake grows when eating food or smaller player snake
  - Negative Tests:
    - Player should not die when colliding with smaller AI snake

- AC-6: Visual effects play when eating food
  - Positive Tests:
    - Brief animation/effect plays at food location when eaten
    - Effect duration is short (300-500ms) and does not block gameplay
  - Negative Tests:
    - Effects should not cause frame drops or performance issues

- AC-7: Historical high score is displayed and updated
  - Positive Tests:
    - High score displays on start screen and game over screen
    - High score updates when current score exceeds it
    - High score persists across browser sessions
  - Negative Tests:
    - High score should only update, never decrease

- AC-8: README.md is included at project root with complete documentation
  - Positive Tests:
    - README contains: project title, description, prerequisites, installation steps, usage examples with code snippets, configuration options, project structure overview
  - Negative Tests:
    - README should not contain placeholder text

## Path Boundaries

### Upper Bound (Maximum Acceptable Scope)
The implementation includes a complete Snake game with player vs AI snake gameplay, snake type selection (3+ types), pause/start/restart controls, localStorage score persistence with history, eating mechanics (eat smaller = grow/gain points, eat larger = die), food eating visual effects, historical high score tracking, basic collision detection, responsive design for desktop, and comprehensive README documentation.

### Lower Bound (Minimum Acceptable Scope)
The implementation includes a functional Snake game with player vs AI snake on a 20x20 grid, basic snake type selection (at least 2 types), pause/start controls, localStorage high score persistence, eating mechanics, and a basic README with installation and usage instructions.

### Allowed Choices
- Can use: React (as specified in draft), localStorage for persistence, Canvas or DOM-based rendering, requestAnimationFrame for game loop
- Cannot use: Backend servers or external APIs for score storage, third-party game engines (Phaser, etc.), database dependencies

## Feasibility Hints and Suggestions

### Conceptual Approach
Use React with a game loop implemented via requestAnimationFrame for smooth 60fps rendering. Separate game state (snake positions, scores, game status) from React rendering to avoid excessive re-renders. Use localStorage for score persistence with a simple JSON structure storing current score, high score, and score history array.

```
Game State Structure:
{
  playerSnake: [{x, y}, ...],
  aiSnake: [{x, y}, ...],
  food: {x, y},
  score: number,
  highScore: number,
  scoreHistory: number[],
  gameStatus: 'idle' | 'playing' | 'paused' | 'gameover',
  selectedSnakeType: string
}
```

### Relevant References
- React useState/useEffect for state management
- localStorage API for persistence
- requestAnimationFrame for game loop timing

## Dependencies and Sequence

### Milestones
1. **Milestone 1**: Project Setup
   - Phase A: Initialize React project (Vite recommended for simplicity)
   - Phase B: Set up basic project structure and dependencies

2. **Milestone 2**: Core Game Logic
   - Phase A: Implement snake movement and grid rendering
   - Phase B: Implement AI snake behavior (pathfinding toward food or player)
   - Phase C: Implement collision detection (walls, self, other snake)

3. **Milestone 3**: Game Features
   - Phase A: Add snake type selection UI
   - Phase B: Implement pause/start/restart controls
   - Phase C: Implement eating mechanics and scoring

4. **Milestone 4**: Persistence and Effects
   - Phase A: Add localStorage for scores and history
   - Phase B: Add food eating visual effects

5. **Milestone 5**: Documentation
   - Phase A: Write comprehensive README.md
   - Phase B: Verify all commits use `feat:` prefix

## Task Breakdown

| Task ID | Description | Target AC | Tag (`coding`/`analyze`) | Depends On |
|---------|-------------|-----------|----------------------------|------------|
| task1 | Initialize React project with Vite | AC-8 | coding | - |
| task2 | Create game grid and basic rendering | AC-1 | coding | task1 |
| task3 | Implement player snake controls and movement | AC-1 | coding | task2 |
| task4 | Implement AI snake behavior | AC-1 | coding | task3 |
| task5 | Add snake type selection component | AC-2 | coding | task2 |
| task6 | Implement pause/start/restart controls | AC-3 | coding | task4 |
| task7 | Add score system and localStorage persistence | AC-4 | coding | task6 |
| task8 | Implement eating mechanics (eat smaller/die to larger) | AC-5 | coding | task7 |
| task9 | Add food eating visual effects | AC-6 | coding | task7 |
| task10 | Display and update historical high score | AC-7 | coding | task7 |
| task11 | Write comprehensive README.md | AC-8 | coding | task10 |

## Claude-Codex Deliberation

### Agreements
- Both Claude and Codex agree that the game should use a grid-based approach
- Both agree on localStorage for score persistence (no backend)
- Both agree React is the correct choice as specified in the draft
- Both agree on basic collision detection for walls and self-collision
- Both agree visual effects for eating food should be implemented

### Resolved Disagreements
- **Grid size**: Claude assumes 20x20 (standard) vs Codex suggested 20x20 - resolved as 20x20
- **Wall rules**: Claude assumes wall=death (simpler) vs Codex mentioned wrap option - resolved as wall=death for simplicity
- **Rendering**: Claude suggests Canvas for performance - resolved: Canvas or DOM acceptable, Canvas preferred for smooth animation

### Convergence Status
- Final Status: `partially_converged`

Note: In `direct` mode, convergence rounds were skipped per workflow rules. This is a partially converged plan requiring human review.

## Pending User Decisions

- DEC-1: Grid size and wall collision rules
  - Claude Position: 20x20 grid with wall=death (simpler for beginners)
  - Codex Position: 20x20 with wrap-around as option
  - Tradeoff Summary: Wall=death is simpler to implement and understand for a basic game
  - Decision Status: `PENDING`

- DEC-2: Touch/mobile support
  - Claude Position: Not explicitly required in draft, focus on desktop keyboard controls
  - Codex Position: Consider mobile touch controls (swipe gestures)
  - Tradeoff Summary: Adding touch support increases complexity; draft says "code尽量简单"
  - Decision Status: `PENDING`

- DEC-3: Number of snake types
  - Claude Position: Start with 3 types (different colors)
  - Codex Position: At least 3 types for meaningful selection
  - Tradeoff Summary: 3 types provides variety without overcomplicating
  - Decision Status: `PENDING`

## Implementation Notes

### Code Style Requirements
- Implementation code and comments must NOT contain plan-specific terminology such as "AC-", "Milestone", "Step", "Phase", or similar workflow markers
- These terms are for plan documentation only, not for the resulting codebase
- Use descriptive, domain-appropriate naming in code instead

## Output File Convention

This template is used to produce the main output file (e.g., `plan.md`).

### Translated Language Variant

When `alternative_plan_language` resolves to a supported language name through merged config loading, a translated variant of the output file is also written after the main file. Humanize loads config from merged layers in this order: default config, optional user config, then optional project config; `alternative_plan_language` may be set at any of those layers. The variant filename is constructed by inserting `_<code>` (the ISO 639-1 code from the built-in mapping table) immediately before the file extension:

- `plan.md` becomes `plan_<code>.md` (e.g. `plan_zh.md` for Chinese, `plan_ko.md` for Korean)
- `docs/my-plan.md` becomes `docs/my-plan_<code>.md`
- `output` (no extension) becomes `output_<code>`

The translated variant file contains a full translation of the main plan file's current content in the configured language. All identifiers (`AC-*`, task IDs, file paths, API names, command flags) remain unchanged, as they are language-neutral.

When `alternative_plan_language` is empty, absent, set to `"English"`, or set to an unsupported language, no translated variant is written. Humanize does not auto-create `.humanize/config.json` when no project config file is present.

--- Original Design Draft Start ---

# Requirement

现在我想写一个贪吃蛇的游戏，代码尽量简单，支持分数记录（页面本地），下一次打开还能看到自己的分数记录历史记录；需要一些简单的动态效果，贪吃蛇左侧可以选择蛇的类型；支持暂停，开始，支持吃其他蛇，如果比自己大就死亡，如果比自己小就获得分数；只需要前端即可，没有后端；使用react

颜色不同，单人对战 AI 蛇，吃到食物时的特效，记录历史最高分，没有

它主要是一个对手，吃到小的就变大，吃到大的就死亡，只有一个玩家

---

## Standard Deliverables (mandatory for every project)

- **README.md** — must be included at the project root with: project title & description, prerequisites, installation steps, usage examples with code snippets, configuration options, and project structure overview.
- **Git commits** — use conventional commit prefix `feat:` for all commits.

--- Original Design Draft End ---
