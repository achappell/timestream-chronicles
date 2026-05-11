# Timestream Chronicles: MVP Vertical Slice (Totter's Lane)

## 📌 Objective
To establish a playable "Vertical Slice" for the MVP that proves the core incremental loop. **The player is The Doctor**, navigating the events of *An Unearthly Child* (1963). You are currently grounded at 76 Totter's Lane, your TARDIS is malfunctioning, and two inquisitive schoolteachers are dangerously close to discovering the truth.

## ⚙️ Core Mechanics Required
1. **Task Unlock Logic:** Tasks must remain hidden or unselectable until prerequisites (Skill Levels, Item Inventory, or previous Task completions) are met.
2. **Inventory Protocol:** The ability to gather items (e.g., "Raw Energy") and consume them to restore Stability.
3. **Entropy Weighting:** Tasks must have varying Entropy drain rates to force strategic decision-making.

---

## 🗺️ The Task Progression Tree

### Phase 1: Investigation & Concealment
*Goal: Evade the teachers and begin the arduous process of diagnosing the ship's failure.*

1. **Evade Curiosity**
   - **Skill:** Stealth
   - **Action:** Duck behind the scrap piles to avoid being seen by Ian and Barbara.
   - **Metrics:** Low XP, Very Low Entropy.
   - **Mechanical Value:** The "Safe Baseline." Introduces the core incremental loop and Stealth progression with minimal risk.
   - **Unlock:** Available immediately.

2. **Run Exterior Diagnostics**
   - **Skill:** Scientific Inquiry
   - **Action:** Open the TARDIS service panel disguised as a police box and check the exterior nodes.
   - **Metrics:** High XP, High Entropy.
   - **Mechanical Value:** The "Risk/Reward Trade-off." Introduces the Science skill and teaches the player that faster progression burns Stability rapidly.
   - **Unlock:** Requires Stealth Level 2.

3. **Scavenge Mundane Spares**
   - **Skill:** Scientific Inquiry
   - **Action:** Search the junkyard for primitive materials (mercury, copper wire) to patch the fluid link.
   - **Metrics:** Moderate XP, Moderate Entropy.
   - **Mechanical Value:** The "Inventory Protocol." Introduces item drops. Yields the "components" required to attempt Phase 2 tasks.
   - **Unlock:** Requires Science Level 2.

---

### Phase 2: System Repair & Survival
*Goal: Power up the TARDIS and manage the ship's failing stability.*

6. **Deflect the Patrolman**
   - **Skill:** Stealth
   - **Action:** A local policeman is nearing the gate. Create a subtle diversion to keep him away.
   - **Metrics:** High XP, Moderate Entropy.
   - **Unlock:** Requires Stealth Level 5.

7. **Siphon Primitive Energy**
   - **Skill:** Scientific Inquiry
   - **Action:** Rig a temporary tap into the local 1963 power grid to charge the ship.
   - **Reward:** Drops **"Raw Energy"** into your inventory periodically.
   - **Unlock:** Requires Science Level 4, Stealth Level 5.

8. **Calibrate the Fluid Link**
   - **Skill:** Scientific Inquiry
   - **Action:** Perform the delicate math required to bridge the damaged fluid link with scavenged scrap.
   - **Metrics:** Massive total progress required.
   - **Unlock:** Requires Science Level 6.

9. **Purge Artron Cells** *(Instant Action)*
   - **Action:** You manually purge the Raw Energy into the Artron Cells to restore **Stability**.
   - **Unlock:** Available once "Siphon Primitive Energy" is unlocked.

---

### Phase 3: The Departure (End-Game)
*Goal: Force a dematerialization despite the intruders and the ship's instability.*

10. **Confront the Teachers**
    - **Skill:** Stealth (Deception/Deflection)
    - **Action:** They've found the box. Step out of the shadows and keep them talking while you finalize the coordinates.
    - **Metrics:** Extreme Entropy drain.
    - **Unlock:** Requires Science Level 8, Stealth Level 8.

11. **Override Isomorphic Controls**
    - **Skill:** Scientific Inquiry
    - **Action:** The MK I computer is flagging error codes. Force your signature onto the console to override the safety locks.
    - **Metrics:** Massive progress requirement, High Entropy drain.
    - **Unlock:** Requires "Confront the Teachers" complete.

12. **Emergency Dematerialization** *(Win Condition)*
    - **Action:** Yank the primary lever to flee 1963, taking the teachers with you into the unknown.
    - **Reward:** Unlocks the "Prehistoric Earth" era and grants a permanent "Temporal Anchor."
    - **Unlock:** Requires "Override Isomorphic Controls" complete.
