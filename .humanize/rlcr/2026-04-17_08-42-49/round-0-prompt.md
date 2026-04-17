Read and execute below with ultrathink

## Goal Tracker Setup (REQUIRED FIRST STEP)

Before starting implementation, you MUST initialize the Goal Tracker:

1. Read @/app/workspaces/d87d0364-b2c3-43af-a12b-122133030413/.humanize/rlcr/2026-04-17_08-42-49/goal-tracker.md
2. If the "Ultimate Goal" section says "[To be extracted...]", extract a clear goal statement from the plan
3. If the "Acceptance Criteria" section says "[To be defined...]", define 3-7 specific, testable criteria
4. Populate the "Active Tasks" table with tasks from the plan, mapping each to an AC and filling Tag/Owner
5. Write the updated goal-tracker.md

**IMPORTANT**: The IMMUTABLE SECTION can only be modified in Round 0. After this round, it becomes read-only.

---

## Implementation Plan

For all tasks that need to be completed, please use the Task system (TaskCreate, TaskUpdate, TaskList) to track each item in order of importance.
You are strictly prohibited from only addressing the most important issues - you MUST create Tasks for ALL discovered issues and attempt to resolve each one.

## Task Tag Routing (MUST FOLLOW)

Each task must have one routing tag from the plan: `coding` or `analyze`.

- Tag `coding`: Claude executes the task directly.
- Tag `analyze`: Claude must execute via `/humanize:ask-codex`, then integrate Codex output.
- Keep Goal Tracker "Active Tasks" columns **Tag** and **Owner** aligned with execution (`coding -> claude`, `analyze -> codex`).
- If a task has no explicit tag, default to `coding` (Claude executes directly).

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

---

## BitLesson Selection (REQUIRED FOR EACH TASK)

Before executing each task or sub-task, you MUST:

1. Read @/app/workspaces/d87d0364-b2c3-43af-a12b-122133030413/.humanize/bitlesson.md
2. Run `bitlesson-selector` for each task/sub-task to select relevant lesson IDs
3. Follow the selected lesson IDs (or `NONE`) during implementation

Include a `## BitLesson Delta` section in your summary with:
- Action: none|add|update
- Lesson ID(s): NONE or comma-separated IDs
- Notes: what changed and why (required if action is add or update)

Reference: @/app/workspaces/d87d0364-b2c3-43af-a12b-122133030413/.humanize/bitlesson.md

## Agent Teams Mode

You are operating in **Agent Teams mode** as the **Team Leader** within an RLCR (Review-Loop-Correct-Repeat) development cycle.

This is the initial round. Read the implementation plan thoroughly before creating your team. Key RLCR files to be aware of:
- **Plan file** (provided above): The full scope of work and requirements your team must implement
- **Goal tracker** (`goal-tracker.md`): Tracks acceptance criteria, task status, and plan evolution - read it before splitting tasks
- **Work summary**: After all teammates finish, you must write a summary of what was accomplished into the designated summary file

### Your Role

You are the team leader. Your ONLY job is coordination and delegation. You must NEVER write code, edit files, or implement anything yourself.

Your primary responsibilities are:
- **Split tasks** into independent, parallelizable units of work
- **Create agent teams** to execute these tasks using the Task tool with `team_name` parameter
- **Coordinate** team members to prevent overlapping or conflicting changes
- **Monitor progress** and resolve blocking issues between team members
- **Wait for teammates** to finish their work before proceeding - do not implement tasks yourself while waiting

If you feel the urge to implement something directly, STOP and delegate it to a team member instead.

### Guidelines

1. **Task Splitting**: Break work into independent tasks that can be worked on in parallel without file conflicts. Each task should have clear scope and acceptance criteria. Aim for 5-6 tasks per teammate to keep everyone productive and allow reassignment if someone gets stuck.
2. **Cold Start**: Every team member starts with zero prior context (they do NOT inherit your conversation history). However, they DO automatically load project-level CLAUDE.md files and MCP servers. When spawning members, focus on providing: the implementation plan or relevant goals, specific file paths they need to work on, what has been done so far, and what exactly needs to be accomplished. Do not repeat what CLAUDE.md already covers.
3. **File Conflict Prevention**: Two teammates editing the same file causes silent overwrites, not merge conflicts - one teammate's work will be completely lost. Assign strict file ownership boundaries. If two tasks must touch the same file, sequence them with task dependencies (blockedBy) so they never run in parallel.
4. **Coordination**: Track team member progress via TaskList and resolve any discovered dependencies. If a member is blocked or stuck, help unblock them or reassign the work to another member.
5. **Quality**: Review team member output before considering tasks complete. Verify that changes are correct, do not conflict with other members' work, and meet the acceptance criteria.
6. **Commits**: Each team member should commit their own changes. You coordinate the overall commit strategy and ensure all commits are properly sequenced.
7. **Plan Approval**: For high-risk or architecturally significant tasks, consider requiring teammates to plan before implementing (using plan mode). Review and approve their plans before they proceed.
8. **BitLesson Discipline**: Require running `bitlesson-selector` before each sub-task and record selected lesson IDs (or `NONE`) in the work notes.

### Important

- Use the Task tool to spawn agents as team members
- Monitor team members and reassign work if they get stuck
- Merge team work and resolve any conflicts before writing your summary
- Do NOT write code yourself - if you catch yourself about to edit a file or run implementation commands, delegate it instead
- When teammates go idle after sending you a message, this is NORMAL - they are waiting for your response, not done forever

---

## Goal Tracker Rules

Throughout your work, you MUST maintain the Goal Tracker:

1. **Before starting a task**: Mark it as "in_progress" in Active Tasks
   - Confirm Tag/Owner routing is correct before execution
2. **After completing a task**: Move it to "Completed and Verified" with evidence (but mark as "pending verification")
3. **If you discover the plan has errors**:
   - Do NOT silently change direction
   - Add entry to "Plan Evolution Log" with justification
   - Explain how the change still serves the Ultimate Goal
4. **If you need to defer a task**:
   - Move it to "Explicitly Deferred" section
   - Provide strong justification
   - Explain impact on Acceptance Criteria
5. **If you discover new issues**: Add to "Open Issues" table

---

Note: You MUST NOT try to exit `start-rlcr-loop` loop by lying or edit loop state file or try to execute `cancel-rlcr-loop`

After completing the work, please:
0. If you have access to the `code-simplifier` agent, use it to review and optimize the code you just wrote
1. Finalize @/app/workspaces/d87d0364-b2c3-43af-a12b-122133030413/.humanize/rlcr/2026-04-17_08-42-49/goal-tracker.md (this is Round 0, so you are initializing it - see "Goal Tracker Setup" above)
2. Commit your changes with a descriptive commit message
3. Write your work summary into @/app/workspaces/d87d0364-b2c3-43af-a12b-122133030413/.humanize/rlcr/2026-04-17_08-42-49/round-0-summary.md

Note: Since `--push-every-round` is enabled, you must push your commits to remote after each round.
