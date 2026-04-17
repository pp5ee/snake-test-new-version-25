**CORE_RISKS**
- Scope ambiguity: “Snake in React” has undefined rules, UI, and targets.
- Performance pitfalls: per-tick React re-renders can drop frames, especially on mobile.
- Input ambiguity: keyboard-only controls exclude touch devices; swipe gestures are non-trivial.
- Game loop timing: inconsistent ticks across devices without proper step management.
- Feature creep: leaderboards, themes, levels could expand scope without alignment.
- Accessibility gaps: no plan for screen reader cues, focus, or reduced motion.

**MISSING_REQUIREMENTS**
- Core rules: grid size, wrap vs. walls, initial length, growth per food, speed curve.
- Controls: keyboard (arrows/WASD), touch (swipe/virtual D‑pad), pause/resume, restart.
- Collision rules: self-collision detection details and 180° turn prevention.
- UI: start menu, in-game HUD (score/speed), game over screen, instructions.
- Persistence: local high score via `localStorage` and reset option.
- Audio/visuals: basic sounds with mute toggle; color/contrast choices.
- Responsiveness: scaling for various screen sizes and aspect ratios.
- Compatibility: supported browsers/devices and minimum performance targets.
- Testing and QA: unit tests for rules, simple input tests, manual test matrix.
- Deployment: build tool, static hosting plan, and CI basics.

**TECHNICAL_GAPS**
- Rendering choice: Canvas vs. DOM/SVG not decided; affects performance and complexity.
- Game loop architecture: `requestAnimationFrame` + fixed timestep vs. setInterval; separation from React state.
- State management: reducer/refs vs. global store; preventing per-cell re-renders.
- Randomness: food spawn avoiding snake body; optional seed for deterministic tests.
- Asset pipeline: sounds/images licensing and bundling not defined.
- Tooling baseline: Vite/CRA/Next choice, TypeScript, lint/format, and test framework.

**ALTERNATIVE_DIRECTIONS**
- Canvas rendering (fast, simple draw calls) vs. DOM grid (easier to style, slower at scale) vs. SVG (vector clarity, moderate perf).
- Use a lightweight engine (Phaser) for loop/input/collision vs. pure React for minimal dependencies.
- TypeScript for safer game logic vs. JavaScript for speed of iteration.
- PWA for offline play and installability vs. simple static site.
- State via reducer + refs (minimal) vs. external store (Zustand/Redux) for extensibility.

**QUESTIONS_FOR_USER**
- What are the target platforms: desktop only, or must support mobile touch?
- Choose rules: wrap-around allowed or walls cause death? Starting grid size?
- Rendering preference: Canvas (performance) or DOM/SVG (styling simplicity)?
- Difficulty model: fixed speed or speed-up as score increases?
- Visual/audio style: minimalist or themed; sound effects with mute toggle?
- Persistence scope: local high score only or future online leaderboard?
- Tech stack: TypeScript yes/no; bundler preference (Vite/CRA); testing expectations?
- Accessibility: must-have items (keyboard-only playable, contrast, reduced motion)?

**CANDIDATE_CRITERIA**
- Game renders a responsive 20×20 grid; snake starts length 3 and moves on a fixed tick.
- Controls: Arrow keys and WASD; on touch screens, swipe to change direction.
- No 180° reverse on the same tick; self or wall collision ends the game (no wrap).
- Food spawns on an empty cell only; eating increases length by 1 and score by 1.
- Speed increases every 5 foods by 5% (configurable); capped to maintain playability.
- Pause/resume and restart work via UI and keyboard (`P`/`Space`/`R`).
- Maintains 55–60 FPS on midrange mobile and desktop in latest Chrome/Firefox/Safari.
- Rendering uses Canvas with a game loop via `requestAnimationFrame` and fixed timestep; React re-renders not tied to each frame.
- Local high score saved in `localStorage`; visible on start and game over.
- Settings: toggle sound and grid size; settings persist locally.
- Basic tests cover collision detection, food spawn (not on snake), and direction-change rules.
- Project builds with Vite, lint/format pass, and a README with run/build instructions; deployable as static site.
