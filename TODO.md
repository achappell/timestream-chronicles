# 🚀 MVP: Target - Totter's Lane (An Unearthly Child)

### 💓 Core Engine: The Temporal Heartbeat
- **[X] Frame-Rate Independence:** Refactor the `tick` function to use a `delta` time variable.
- **[X] The Stasis Toggle (Pause):** Toggle pause state to halt the global `tick` loop.
- **[X] The Entropy Refactor:** Scaling Decay, Engine Cleanup, Entropy Display, Auto-Pause.
- **[ ] Entropy Weight Integration:**
    - [ ] Update `Task` interface to include `entropyWeight` (multiplier for base decay).
    - [ ] Refactor `calculateEntropyRate` in `engine.ts` to factor in the active task's weight.
- **[ ] Task Unlock & Visibility Logic:**
    - [ ] Update `Task` interface with `unlockRequirements` (Skill Levels, Task Completions).
    - [ ] Implement `isTaskUnlocked(state, task)` helper in `engine.ts`.
    - [ ] Update `App.vue` to filter the task list, only showing unlocked (or "revealed") tasks.
- **[ ] The Inventory Protocol:**
    - [ ] Update `GameState` type to include `inventory: Record<string, number>`.
    - [ ] Implement `reward` logic in `tick`: Tasks can grant items upon cycle completion.
    - [ ] Create `Inventory.vue` (or add to `App.vue`) to display current item counts.
    - [ ] Implement "Instant Actions" (e.g., Purge Artron Cells) that consume items to restore Stability.
- **[ ] Content Injection: Totter's Lane Vertical Slice:**
    - [ ] Define the full 12-task sequence in `App.vue` constants (Phases 1-3).
    - [ ] Balance XP/Progress/Entropy for the entire 12-task progression tree.
- **[ ] The Final Dematerialization (Win Condition):**
    - [ ] Implement "Win" logic when Task #12 ("Emergency Dematerialization") is completed.
    - [ ] Add a "Timeline Advanced" modal or transition state to signal the end of the MVP slice.
- **[X] Temporal Re-Anchoring:** Reset loop logic (Stability restore, Focus wipe, Mastery preserve, Task progress cleanse).
- **[X] Type Safety Audit:** Align `reactive` state with `GameState` interface.

### 💾 Data Persistence: The "Tardis Memory"
- **[X] LocalStorage Serialization:** Auto-save every 30 seconds.
- **[X] State Hydration:** Merge save data with default state on mount.
- **[X] The "Hard Reset" Protocol:** Clear save button.
- **[X] System Control Menu:** Dropdown for manual save, export, and import.

### 📺 UI/UX: The 1963 Dashboard
- **[X] 1963 Design System:** Tokens, Patterns, and Hartnell-era branding.
- **[X] CRT Overlay:** Global scanlines, vignette, and flicker.
- **[X] Legibility & Accessibility:** Contrast audit, font-sizes, and hit areas.
- **[X] Mobile Responsiveness:** Adaptive grid protocols for small-screen transmissions.
- **[X] Multiplier Diagnostics:** Detailed tooltips showing combined MST/FCS bonuses.

### 🧪 Technical Integrity
- **[X] High-Value Testing Protocol:** Vitest integration and engine unit testing.
- **[X] Pre-Commit Verification Protocol:** Build and Test pass required for commits.
- **[X] High-Fidelity Pre-Commit Review:** Architectural and aesthetic audit mandate.

---

# 📦 Post-MVP: Target - Prehistoric Earth & Beyond

### 🤖 Automation & Efficiency
- **[ ] Task Queue Array:** Automated sequential task execution.
- **[ ] The "Next Task" Handshake:** Auto-pull from queue when idle.
- **[ ] Shift-Click Queueing:** UI for batching tasks.

### 🛠️ Architecture & Tech Debt
- **[ ] State Management Refactor:** Transition from "God Component" to Pinia.
- **[ ] Remove Redundant Code:** Cleanup `SkillBar.vue` and unused modules.
- **[ ] Save Key Versioning:** Handle schema migrations between major updates.

### 💻 Desktop & Production
- **[ ] Electron Shell Production Readiness:** Asset loading for production builds.
- **[ ] Electron IPC Bridge:** Native OS interactions and file saves.

### 📜 Polish & Expansion
- **[ ] Action Tooltips:** Full technical readout for task XP/Entropy.
- **[ ] The Transmission Log:** Narrative flavor text area.
- **[ ] Aspect Ratio Lock (4:3):** Classic TV frame enforcement.
- **[ ] Era-Appropriate Labels:** Holistic UI text audit.
- **[ ] Stabilization Mechanics:** Permanent "Temporal Anchors" for long-term survival.
