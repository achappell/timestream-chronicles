### 💓 Core Engine: The Temporal Heartbeat

- **[X] Frame-Rate Independence:** Refactor the `tick` function to use a `delta` time variable.

- **[X] The Stasis Toggle (Pause):** Toggle pause state to halt the global `tick` loop.

- [X] The Entropy Refactor: 
    - [X] Remove **Artron Energy** from state, types, and UI.
    - [X] **Scaling Decay**: Increase `baseDecay` based on `timeInLoop` (Formula: $Decay = Base \times (1 + (Time / 60) \times 0.1)$).
    - [X] **Engine Cleanup**: Remove duplicate `timeInLoop` increment in `engine.ts` and fix reset loop.
    - [X] **Entropy Display**: Add current decay rate readout to `GameHeader` with `/s` time signifier.
    - [X] **Auto-Pause**: Implement "Safety Stasis" in `engine.ts` that pauses the game if no task is active.
    - [ ] Update the `Task` interface to use `entropyWeight`.

- **[X] Versioning System (Option B)**:
    - [X] Update `vite.config.ts` to inject `git rev-parse --short HEAD` into `__APP_VERSION__`.
    - [X] Display `__APP_VERSION__` in the UI (e.g., bottom-right corner of `App.vue`).
    - [X] **Adaptive Layout Fix**: Use `position: fixed` or `absolute` for version info and apply `box-sizing: border-box` to the main container (or globally) to ensure `min-height: 100vh` doesn't cause overflow with padding.
    - [X] Update `deploy.yaml` to ensure the SHA is correctly captured in the GitHub Actions build environment.

- **[X] Shared UI Protocol**:
    - [X] Create `ProgressBar.vue` shared component to centralize "Glow" and "Scanline" bar styles.
    - [X] Refactor `SkillCard.vue` and `SkillBar.vue` to use the shared `ProgressBar`.
    - [X] Update `App.vue` mission cycles to use the shared `ProgressBar`.

- **[X] High-Value Testing Protocol**:
    - [ ] Install **Vitest** for engine unit testing.
    - [X] Create `engine.test.ts` to validate Entropy Scaling, Safety Stasis, and XP Multipliers.
    - [X] Integrate test run into GitHub Actions build pipeline.
    - [X] Configure **Coverage Gutters** (lcov) for VSCode visual feedback.

- **[ ] The Inventory Protocol:**
    - Add `inventory: Record<string, number>` to the state.
    - Implement a "Consume" function to use items (like "Artron Cells") to restore Stability.
    - Update `Task` to include `rewards: { itemId: string, chance: number }`.

- **[ ] Stabilization Mechanics:**
    - Implement "Temporal Anchors" tied to story milestones (reincarnations) that permanently reduce `baseDecay`.
    - Create a "Stabilize TARDIS" task that uses inventory items to restore stability.

- **[X] Temporal Re-Anchoring:** Reset loop logic (Stability restore, Focus wipe, Mastery preserve).

- **[X] Type Safety Audit:** Align `reactive` state with `GameState` interface.

### 💾 Data Persistence: The "Tardis Memory"

- **[X] LocalStorage Serialization:** Write a watcher or a 30-second interval that `JSON.stringify`s the state and saves it to `localStorage`.

- **[X] State Hydration:** Create a function that runs on `onMounted` to check for an existing save and merge it with the default state (handling potential schema changes).

- **[X] The "Hard Reset" Protocol:** Add a hidden or small button to clear the save—essential for testing the "New Game" flow.

- **[X] System Control Menu:** Implement a dropdown menu for manual save, export (base64 string), and import.

- **[ ] Save Key Versioning:** Implement a versioning strategy for the `SAVE_KEY` (e.g., `v1` to `v2`) to handle major breaking changes in state architecture.    

### 📺 UI/UX: The 1963 Dashboard

- **[X] Stasis Button Fidelity:** Apply fixed-width CSS to the Stasis button to prevent header layout jitter when text changes.

- **[X] 1963 Design System (Two-Layer Architecture)**:
    - [X] **Layer 1 (Tokens)**: Create `timestream-renderer/src/assets/theme.css` with systematic variables.
    - [X] **Layer 2 (Patterns)**: Ensure `ProgressBar.vue` and other shared components consume Tokens rather than hardcoded colors.
    - [X] **Regeneration Architecture**: Wrap Variables in `[data-era="hartnell"]` for future-proofing.
    - [X] Link `theme.css` in `main.ts`.

- **[X] Legibility Protocol (Accessibility Audit)**:
    - [X] Brighten text tokens for WCAG contrast compliance.
    - [X] Standardize minimum readout font-size to `0.75rem`.
    - [X] Increase button hit areas to `min-height: 48px`.
    - [X] Fix invisible count labels in `ProgressBar.vue`.

- **[ ] CRT Overlay:** Add a persistent `::after` pseudo-element on the main container with a linear-gradient for scanlines and a 2% opacity "flicker" animation.
    
- **[ ] Aspect Ratio Lock:** Update `main.js` to use `mainWindow.setAspectRatio(4/3)` to force that classic TV box shape.
    
- **[ ] The "Monolith" Insurance:** Refactor `SkillCard.vue` to use `grid-template-rows` to ensure the MST and FCS lanes never stretch vertically again.
    
- **[ ] Multiplier Badges:** Update the logic to show the multiplier formula dynamically: $Multiplier = 1 + (Mastery \times 0.1)$.
    

### 🧪 Mission Protocols: Task & Queue Logic

- **[X] Mission Cycles (Incremental Task Progress)**:
    - [X] Update `Task` interface in `types.ts` with `currentProgress`, `targetProgress`, `completions`, and `maxCompletions`.
    - [X] Update `tick` logic in `engine.ts` to advance task progress and increment completion count.
    - [X] Modify `engine.ts` to award Skill XP ONLY upon cycle completion.
    - [X] Add task progress bars and completion counters (`5/10`) to the UI in `App.vue`.

- **[ ] Task Queue Array:** Add `taskQueue: string[]` to the state.
    
- **[ ] The "Next Task" Handshake:** Update the `tick` function to automatically pull from the queue if `activeTaskId` is null.
    
- **[ ] Shift-Click Queueing:** Update UI to allow adding to queue via `Shift + Click`.
    
- **[ ] Unlock Logic:** Add an `unlocked` boolean to the Task interface. Set "Analyze Junkyard" to `false` until "Lurk in Shadows" reaches Level 5.
    
- **[ ] Action Tooltips:** Add a "hover" state to task buttons that displays the XP gain and Entropy weight in a mono-spaced "Technical Readout" box.
    

### 📜 Narrative & Logging

- **[ ] The Transmission Log:** Create a small, scrolling text area at the bottom of the screen for flavor text (e.g., _"Sensors detect a police box in the fog..."_).
    
- **[ ] Era-Appropriate Labels:** Audit all UI text to ensure it sounds like 1963 (e.g., Change "Settings" to "System Calibration," "XP" to "Cognitive Imprint").