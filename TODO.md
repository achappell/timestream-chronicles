### 💓 Core Engine: The Temporal Heartbeat

- **[X] Frame-Rate Independence:** Refactor the `tick` function to use a `delta` time variable.

- **[X] The Stasis Toggle (Pause):** Toggle pause state to halt the global `tick` loop.

- **[ ] The Entropy Refactor:** 
    - Remove **Artron Energy** from state, types, and UI.
    - Implement **Scaling Decay**: Increase `baseDecay` based on `timeInLoop`.
    - Update the `Task` interface to use `entropyWeight`.

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
...
- **[ ] LocalStorage Serialization:** Write a watcher or a 30-second interval that `JSON.stringify`s the state and saves it to `localStorage`.
    
- **[ ] State Hydration:** Create a function that runs on `onMounted` to check for an existing save and merge it with the default state (handling potential schema changes).
    
- **[ ] The "Hard Reset" Protocol:** Add a hidden or small button to clear the save—essential for testing the "New Game" flow.
    

### 📺 UI/UX: The 1963 Dashboard

- **[X] Stasis Button Fidelity:** Apply fixed-width CSS to the Stasis button to prevent header layout jitter when text changes.

- **[ ] CRT Overlay:** Add a persistent `::after` pseudo-element on the main container with a linear-gradient for scanlines and a 2% opacity "flicker" animation.
    
- **[ ] Aspect Ratio Lock:** Update `main.js` to use `mainWindow.setAspectRatio(4/3)` to force that classic TV box shape.
    
- **[ ] The "Monolith" Insurance:** Refactor `SkillCard.vue` to use `grid-template-rows` to ensure the MST and FCS lanes never stretch vertically again.
    
- **[ ] Multiplier Badges:** Update the logic to show the multiplier formula dynamically: $Multiplier = 1 + (Mastery \times 0.1)$.
    

### 🧪 Mission Protocols: Task & Queue Logic

- **[ ] Task Queue Array:** Add `queue: string[]` to the state.
    
- **[ ] The "Next Task" Handshake:** Update the `tick` function so that when a focus level is gained (or energy runs out), the engine automatically pulls the next `taskId` from the array.
    
- **[ ] Unlock Logic:** Add an `unlocked` boolean to the Task interface. Set "Analyze Junkyard" to `false` until "Lurk in Shadows" reaches Level 5.
    
- **[ ] Action Tooltips:** Add a "hover" state to task buttons that displays the XP gain and Artron cost in a mono-spaced "Technical Readout" box.
    

### 📜 Narrative & Logging

- **[ ] The Transmission Log:** Create a small, scrolling text area at the bottom of the screen for flavor text (e.g., _"Sensors detect a police box in the fog..."_).
    
- **[ ] Era-Appropriate Labels:** Audit all UI text to ensure it sounds like 1963 (e.g., Change "Settings" to "System Calibration," "XP" to "Cognitive Imprint").