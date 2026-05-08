### 🧠 Core Gameplay Concepts

- **The Entropy & Survival Paradigm:**
    - **Stability (The Clock):** Your only survival resource. It decays constantly. When it hits zero, the loop ends.
    - **Scaling Decay:** The base decay rate increases the longer the loop persists. Time itself fights against your presence. (Implementation: +10% entropy per minute). Readouts are displayed as a "Per-Second" value (e.g., `0.50%/s`).
    - **Entropy Weight:** Every active task has a "weight" that increases the rate of Stability decay. Readouts reflect the total cumulative weight per second.
    - **Narrative Milestones (Reincarnation):** Major progression shifts (e.g., halving base entropy, unlocking new UI eras, changing fundamental rules) are tied to "Story Milestones" and Doctor Reincarnations. Skill Mastery remains a tool for reaching these milestones, but does not provide major rule-changing buffs on its own.

- **The Inventory & Resource System:**
    - **Stabilization Items:** Consumables found during tasks (e.g., "Artron Spines" or "Temporal Fluid") can be used to restore a portion of Stability, extending the current loop.
    - **Component Requirement:** Some tasks require specific items in your inventory to attempt (e.g., "Repair Console" requires "Mercury").

- **Safety Stasis (Auto-Pause):** To prevent the unnecessary erosion of Timeline Stability, the TARDIS will automatically engage a "Stasis" state (Pause) whenever no mission protocol (Task) is currently active. The player must manually resume flow or select a new task to continue.

- **Task Completion:** Every mission protocol has a defined "Target Focus." When the associated skill's Focus Level reaches this target, the task is marked as complete and automatically deactivated. This triggers the **Sequence Buffer** to pull the next task or engages **Safety Stasis** if the queue is empty.

- **The Dual-Progress Paradigm:**
    - **Mastery (The Foundation):** Permanent, slow-growing levels that provide multiplicative bonuses to XP gains and survival efficiency.
    - **Focus (The Surge):** Rapidly cycling levels gained during a single loop. Focus levels act as "keys" to unlock more complex tasks.
    - **The Math:** $FocusSpeed = BaseXP \times (1 + (MasteryLevel \times 0.1))$.

---

### 📺 Visual & Technical Architecture

- **The 1963 Aesthetic:** A monochrome, high-contrast palette using `#fff` and `#050505`. It utilizes a 4:3 aspect ratio and CSS-driven scanlines to mimic a CRT monitor in the TARDIS.

- **The "Increlution" Grid:** A high-density dashboard that avoids scrolling by using compact `SkillCard` components that display multipliers and dual-lane progress bars in a single glance.

- **Adaptive Console Layout:** The TARDIS console prioritizes a "Viewport-First" display. The application aims to fit all critical telemetry (Stability, Timeline, Skills) within the primary view without scrolling. Scrolling is permitted only when content density (e.g., a long mission queue or log) exceeds the available vertical space. Metadata like the build version must be anchored to the viewport edge to remain visible regardless of content length.

- **Box-Sizing Protocol:** To ensure predictable layout calculations, all elements must utilize `box-sizing: border-box`. This ensures that padding and borders are included within the element's specified width and height, preventing unexpected overflows and scrollbars in the Adaptive Console Layout.

- **The Heartbeat:** A frame-rate-independent `tick` loop powered by `requestAnimationFrame` and `performance.now()`, ensuring the game runs smoothly across different hardware.

---

### 🛠️ Development Infrastructure

- **The Stack:** Electron (Shell) + Vue 3/Vite (Renderer) + TypeScript (Typing).
    
- **Persistence:** The requirement to serialize the `state` object into `localStorage` so the TARDIS doesn't "reset" every time the window closes.

- **Automation:** Implementation of the **Sequence Buffer** (Task Queue) and **Safety Stasis** (Auto-Pause) to refine the player experience.

---

### 📓 The "Undocumented" Ideas

- **Era Transitions:** The logical leap from B&W (Hartnell) to Color (Pertwee) as a visual representation of the player's progress.
    
- **The Sequence Buffer:** An action queue that allows you to program the Doctor’s day so the game plays itself while you're coding other projects.
