### 🧠 Core Gameplay Concepts

- **The Entropy & Survival Paradigm:**
    - **Stability (The Clock):** Your only survival resource. It decays constantly. When it hits zero, the loop ends.
    - **Accelerated Erosion:** The base decay rate increases the longer the loop persists. Time itself fights against your presence.
    - **Entropy Weight:** Every active task has a "weight" that increases the rate of Stability decay.
    - **Narrative Milestones (Reincarnation):** Major progression shifts (e.g., halving base entropy, unlocking new UI eras, changing fundamental rules) are tied to "Story Milestones" and Doctor Reincarnations. Skill Mastery remains a tool for reaching these milestones, but does not provide major rule-changing buffs on its own.

- **The Inventory & Resource System:**
    - **Stabilization Items:** Consumables found during tasks (e.g., "Artron Spines" or "Temporal Fluid") can be used to restore a portion of Stability, extending the current loop.
    - **Component Requirement:** Some tasks require specific items in your inventory to attempt (e.g., "Repair Console" requires "Mercury").

- **The Dual-Progress Paradigm:**
    - **Mastery (The Foundation):** Permanent, slow-growing levels that provide multiplicative bonuses to XP gains and survival efficiency.
    - **Focus (The Surge):** Rapidly cycling levels gained during a single loop. Focus levels act as "keys" to unlock more complex tasks.
    - **The Math:** $FocusSpeed = BaseXP \times (1 + (MasteryLevel \times 0.1))$.

---

### 📺 Visual & Technical Architecture

- **The 1963 Aesthetic:** A monochrome, high-contrast palette using `#fff` and `#050505`. It utilizes a 4:3 aspect ratio and CSS-driven scanlines to mimic a CRT monitor in the TARDIS.

- **The "Increlution" Grid:** A high-density dashboard that avoids scrolling by using compact `SkillCard` components that display multipliers and dual-lane progress bars in a single glance.

- **The Heartbeat:** A frame-rate-independent `tick` loop powered by `requestAnimationFrame` and `performance.now()`, ensuring the game runs smoothly across different hardware.

---

### 📺 Visual & Technical Architecture

- **The 1963 Aesthetic:** A monochrome, high-contrast palette using `#fff` and `#050505`. It utilizes a 4:3 aspect ratio and CSS-driven scanlines to mimic a CRT monitor in the TARDIS.
    
- **The "Increlution" Grid:** A high-density dashboard that avoids scrolling by using compact `SkillCard` components that display multipliers and dual-lane progress bars in a single glance.
    
- **The Heartbeat:** A frame-rate-independent `tick` loop powered by `requestAnimationFrame` and `performance.now()`, ensuring the game runs smoothly across different MacBook hardware.
    

---

### 🛠️ Development Infrastructure

- **The Stack:** Electron (Shell) + Vue 3/Vite (Renderer) + TypeScript (Typing).
    
- **Granular Workflow:** Transitioning from a flat `TODO.md` to a GitHub Project Board with automated columns (Buffer, Protocol, Archive).
    
- **Persistence:** The upcoming requirement to serialize the `state` object into `localStorage` so the TARDIS doesn't "reset" every time the window closes.
    

---

### 📓 The "Undocumented" Ideas

Before we wrap, we also touched on these "Future-Era" seeds that aren't in the code yet but are part of the vision:

- **Era Transitions:** The logical leap from B&W (Hartnell) to Color (Pertwee) as a visual representation of the player's progress.
    
- **The Sequence Buffer:** An action queue that allows you to program the Doctor’s day so the game plays itself while you're coding other projects.
    

---

### 🏁 Final Mission Check

We've mapped out the **Persistence Layer** and the **Stasis Toggle** as your high-priority technical debt. With your GitHub board now populated with granular tasks, you have a clear flight path for the next few development sprints.