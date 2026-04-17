# Goal Tracker

<!--
This file tracks the ultimate goal, acceptance criteria, and plan evolution.
It prevents goal drift by maintaining a persistent anchor across all rounds.

RULES:
- IMMUTABLE SECTION: Do not modify after initialization
- MUTABLE SECTION: Update each round, but document all changes
- Every task must be in one of: Active, Completed, or Deferred
- Deferred items require explicit justification
-->

## IMMUTABLE SECTION
<!-- Do not modify after initialization -->

### Ultimate Goal

Create a Snake game in React with single-player vs AI snake gameplay. The game features local score persistence (localStorage), snake type selection, pause/start controls, eating mechanics where the player can eat the AI snake (eat smaller to gain points, die if eaten by larger snake), food eating visual effects, and historical high score tracking. The game is frontend-only with simple code.

## Acceptance Criteria

### Acceptance Criteria
<!-- Each criterion must be independently verifiable -->
<!-- Claude must extract or define these in Round 0 -->


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

---

## MUTABLE SECTION
<!-- Update each round with justification for changes -->

### Plan Version: 1 (Updated: Round 0)

#### Plan Evolution Log
<!-- Document any changes to the plan with justification -->
| Round | Change | Reason | Impact on AC |
|-------|--------|--------|--------------|
| 0 | Initial plan | - | - |

#### Active Tasks
<!-- Map each task to its target Acceptance Criterion and routing tag -->
| Task | Target AC | Status | Tag | Owner | Notes |
|------|-----------|--------|-----|-------|-------|
| [To be populated by Claude based on plan] | - | pending | coding or analyze | claude or codex | - |

### Completed and Verified
<!-- Only move tasks here after Codex verification -->
| AC | Task | Completed Round | Verified Round | Evidence |
|----|------|-----------------|----------------|----------|

### Explicitly Deferred
<!-- Items here require strong justification -->
| Task | Original AC | Deferred Since | Justification | When to Reconsider |
|------|-------------|----------------|---------------|-------------------|

### Open Issues
<!-- Issues discovered during implementation -->
| Issue | Discovered Round | Blocking AC | Resolution Path |
|-------|-----------------|-------------|-----------------|
