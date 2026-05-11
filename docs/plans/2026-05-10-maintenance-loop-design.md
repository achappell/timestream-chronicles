# Timestream Chronicles: Maintenance Loop Design

## 🛠️ Objective
To deepen the early-game experience by introducing a "Gather/Build/Apply" loop. This shifts the gameplay from passive waiting to active resource management, fitting the narrative of the First Doctor scavenging a 1963 junkyard to keep the TARDIS stable.

## ⚙️ Core Mechanics

### 1. New Skills
- **Scavenging (SCV):** Efficiency in finding raw materials. Higher levels increase item drop chances/amounts.
- **Tinkering (TNK):** Speed and resource efficiency in assembling components. Higher levels reduce crafting time and material costs.

### 2. The Loop Sequence
1.  **GATHER:** Perform scavenging tasks to obtain `scrap`.
2.  **BUILD:** Perform tinkering tasks that consume `scrap` to produce `temporalRegulator` units.
3.  **MAINTAIN:** Manually (or eventually automatically) consume `temporalRegulator` units from the inventory to restore **10% Stability**.

### 3. The "Top-Off" Rhythm
As the **Scaling Entropy** (+20% compounding per minute) increases, the base decay rate accelerates. The player must use Regulators more frequently to "top off" the stability. 
- Early run: 1 Regulator every 60 seconds.
- Late run: 1 Regulator every 10 seconds.
- End run: Decay exceeds the rate of possible "Top-Offs."

## 📄 Data Specifications

### Skills (`skills.json`)
- `scavenging`: "Finding useable components in primitive environments."
- `tinkering`: "Assembling complex temporal technology from simple scrap."

### Tasks (`tasks.json` - Phase 0 Additions)
- **Scavenge Junkyard Perimeter:** Low entropy, yields `scrap`.
- **Assemble Crude Regulator:** Medium entropy, consumes `scrap`, yields `temporalRegulator`.

## 🧪 Implementation Strategy
1.  **Data Injection:** Add the new skills and maintenance tasks to the JSON files.
2.  **Engine Update:** Ensure `consumeItem` provides the correct Stability burst.
3.  **UI Sync:** Ensure the "System Surplus" displays the new items and allows for the "Top-Off" action.

## ✅ Success Criteria
- The player has meaningful tasks to perform immediately upon starting a new game.
- Long-term survival depends on the stockpile of regulators built during the early run.
- High-entropy "Big Tasks" are survivable only by spending regulators.
