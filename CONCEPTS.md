### 🧠 Core Gameplay Concepts

- **The Entropy & Survival Paradigm:**
    - **Stability (The Clock):** Your only survival resource. It decays constantly. When it hits zero, the loop ends.
    - **Scaling Decay:** The base decay rate increases the longer the loop persists. Time itself fights against your presence. (Implementation: +20% compounding entropy per minute). Readouts are displayed as a "Per-Second" value (e.g., `0.50%/s`).
    - **Entropy Weight:** Every active task has a "weight" that increases the rate of Stability decay. Readouts reflect the total cumulative weight per second.
    - **Narrative Milestones (Reincarnation):** Major progression shifts (e.g., halving base entropy, unlocking new UI eras, changing fundamental rules) are tied to "Story Milestones" and Doctor Reincarnations. Skill Mastery remains a tool for reaching these milestones, but does not provide major rule-changing buffs on its own.

- **The Inventory & Resource System:**
    - **Stabilization Items:** Consumables found during tasks (e.g., "Artron Spines" or "Temporal Fluid") can be used to restore a portion of Stability, extending the current loop.
    - **Component Requirement:** Some tasks require specific items in your inventory to attempt (e.g., "Repair Console" requires "Mercury").

- **Safety Stasis (Auto-Pause):** To prevent the unnecessary erosion of Timeline Stability, the TARDIS will automatically engage a "Stasis" state (Pause) whenever no mission protocol (Task) is currently active. The player must manually resume flow or select a new task to continue.

- **Mission Cycles:** Tasks are no longer simple toggles; they consist of "Cycles" (units of work). Each cycle requires a specific amount of progress to complete. Skill XP is awarded only upon the completion of a full cycle, rather than continuously.
    - **Progress Bar:** Each task has an internal progress bar (`currentProgress` / `targetProgress`).
    - **Completion Counter:** Tasks track how many cycles have been finished in the current loop (`completions`).

- **Task Completion:** A mission protocol is considered "Finalized" when its `completions` count reaches the `maxCompletions` limit. Once finalized, the task is automatically deactivated, triggering the **Sequence Buffer** or engaging **Safety Stasis**.

- **The Dual-Progress Paradigm:**
    - **Mastery (The Foundation):** Permanent, slow-growing levels that provide compounding bonuses to speed and learning efficiency. Each level provides a 1% (1.01x) compounding multiplier.
    - **Focus (The Surge):** Rapidly cycling levels gained during a single loop. Focus levels provide a 5% (1.05x) compounding multiplier and act as "keys" to unlock more complex tasks.
    - **Quadratic Growth:** Mastery XP gain is accelerated by the current focus multiplier, ensuring that deep survival runs yield exponentially higher permanent rewards.
    - **The Math:** $Multiplier = 1.01^{MasteryLevel} \times 1.05^{FocusLevel}$.

---

### 📺 Visual & Technical Architecture
- **The 1963 Design System:** A robust "Two-Layer" CSS architecture designed for consistency and regeneration:
    - **Layer 1: Design Tokens (The "What")**: Centralized in `theme.css`. These variables define the raw palette (Depth-Grayscale), Typography (monospace), and Kinetics (transitions). They are era-dependent and swap automatically via the **Regeneration Protocol**.
    - **Layer 2: UI Patterns (The "How")**: Encapsulated in shared Vue components (e.g., `ProgressBar.vue`). These components define the "look and feel" (glow, scanlines, borders) while consuming the global Tokens.

- **Regeneration Protocol (Theming):** The design system is engineered for multi-era evolution. By utilizing data-attributes (e.g., `[data-era="hartnell"]`) on the root container, the entire visual identity can be swapped instantaneously upon a narrative milestone (Doctor Regeneration). This allows for shifts from monochrome mechanical readouts to high-tech radar displays and eventually full-color digital telemetry.

- **Adaptive Console Layout:** The TARDIS console prioritizes a "Viewport-First" display. The application aims to fit all critical telemetry (Stability, Timeline, Skills) within the primary view without scrolling. Scrolling is permitted only when content density (e.g., a long mission queue or log) exceeds the available vertical space. Metadata like the build version must be anchored to the viewport edge to remain visible regardless of content length.

- **Box-Sizing Protocol:** To ensure predictable layout calculations, all elements must utilize `box-sizing: border-box`. This ensures that padding and borders are included within the element's specified width and height, preventing unexpected overflows and scrollbars in the Adaptive Console Layout.

- **The Heartbeat:** A frame-rate-independent `tick` loop powered by `requestAnimationFrame` and `performance.now()`, ensuring the game runs smoothly across different hardware.

---

### 🛠️ Development Infrastructure

- **The Stack:** Electron (Shell) + Vue 3/Vite (Renderer) + TypeScript (Typing).
    
- **Materialization Protocol (Persistence):** The console utilizes a multi-stage serialization protocol to preserve progress across loops and browser refreshes:
    - **Stage 1: Serialization (The Save)**: The entire `state` object is converted to JSON and stored in `localStorage` every 30 seconds.
    - **Stage 2: The Handshake (State Hydration)**: Upon boot, the system performs a "Schema Handshake." It retrieves the saved data and merges it with the `DEFAULT_STATE`, ensuring that any new skills or tasks added in recent updates are preserved even for players with old save files.
    - **Stage 3: The Hard Reset**: A dedicated protocol to purge `localStorage` and force a timeline reload, restoring the TARDIS to its default factory settings for testing or new-game scenarios.

- **Automation:** Implementation of the **Sequence Buffer** (Task Queue) and **Safety Stasis** (Auto-Pause) to refine the player experience.

- **Validation Gates (Testing):** The project utilizes a "High-Value" testing strategy. Tests are reserved for core mechanical integrity rather than UI coverage. Critical validation points include:
    - **Entropy Curve Integrity**: Ensuring stability decay scales exactly as defined.
    - **Stasis Triggers**: Verifying auto-pause logic engages on idle.
    - **Cycle Accuracy**: Confirming XP is awarded only upon full mission completion.
    - **Multiplier Precision**: Validating that Mastery bonuses apply correctly to focus gains.

---

### 📓 The "Undocumented" Ideas

- **Era Transitions:** The logical leap from B&W (Hartnell) to Color (Pertwee) as a visual representation of the player's progress.
    
- **The Sequence Buffer:** An action queue that allows you to program the Doctor’s day so the game plays itself while you're coding other projects.
