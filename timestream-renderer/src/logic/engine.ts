import type { GameState, Skill, Task } from "../types";

const BASE_STABILITY_DECAY = 0.5; // Base stability decay per second when a task is active
const ENTROPY_SCALING_RATE = 1.20; // 20% increase per minute, compounding

export function tick(state: GameState, delta: number) {
  if (!state.activeTaskId && !state.isPaused) {
    state.isPaused = true; // Auto-pause if no active task
  }

  if (state.isPaused) return; // Don't process if the game is paused

  if (state.collapseTimer > 0) {
    state.collapseTimer -= delta;
    if (state.collapseTimer <= 0) {
      state.collapseTimer = 0;
    }
  }

  if (state.activeTaskId && state.stability > 0) {
    const activeTask = state.tasks.find(task => task.id === state.activeTaskId);
    
    if (activeTask) {
      // 1. Process Entropy (Stability Decay)
      const rate = calculateEntropyRate(state);
      state.stability -= rate * delta;

      // 2. Process Task Progress
      const skill = state.skills[activeTask.skillId];
      if (skill) {
        // --- COMPOUNDING MULTIPLIERS (1.01^MST and 1.05^FCS) ---
        const multiplier = Math.pow(1.01, skill.permanentMastery) * Math.pow(1.05, skill.currentFocus);
        
        activeTask.currentProgress += multiplier * delta;

        // Skill Gain logic
        updateSkill(skill, activeTask.xpPerSec, delta);
      }

      // 3. Mission Completion
      if (activeTask.currentProgress >= activeTask.targetProgress) {
        activeTask.currentProgress = 0;
        activeTask.completions++;

        // --- REWARD LOGIC: TRIGGER ONLY ON COMPLETION ---
        if (activeTask.rewards) {
          for (const reward of activeTask.rewards) {
            const roll = Math.random();
            if (roll < reward.chance) {
              const currentAmount = state.inventory[reward.itemId] || 0;
              state.inventory[reward.itemId] = currentAmount + reward.amount;
            }
          }
        }

        // --- DYNAMIC ERA PROGRESSION CHECK ---
        const currentEraDef = state.eras[state.currentEra];
        if (currentEraDef && activeTask.id === currentEraDef.finalTaskId) {
           if (!state.eraCompletions[state.currentEra]) {
             state.eraCompletions[state.currentEra] = 0;
           }
           state.eraCompletions[state.currentEra]++;
           reanchorTimeline(state);
           return; 
        }
        // -------------------------------------

        if (activeTask.maxCompletions > 0 && activeTask.completions >= activeTask.maxCompletions) {
          state.activeTaskId = null;
        }
      }
    }
  } 

  state.timeInLoop += delta; // Track time spent in the current loop

  if (state.stability <= 0) {
    state.stability = 0; // Prevent negative stability
    state.activeTaskId = null; // Stop the active task

    if (state.collapseTimer <= 0) {
      state.collapseTimer = 1.5; // Start collapse timer
    }
  }
}

export function updateSkill(skill: Skill, taskXP: number, delta: number) {
  // 1. Use the compounding multiplier for learning
  const multiplier = Math.pow(1.01, skill.permanentMastery) * Math.pow(1.05, skill.currentFocus);
  
  // 2. Focus XP (accelerated by focus and mastery)
  skill.focusXP += taskXP * multiplier * delta;
  
  const focusThreshold = (skill.currentFocus + 1) * 100;
  if (skill.focusXP >= focusThreshold) {
    skill.focusXP -= focusThreshold;
    skill.currentFocus++;
  }
  
  // 3. Mastery XP (Now ALSO accelerated by the multiplier!)
  // This makes long runs feel mandatory for high-yield permanent progress
  skill.masteryXP += (taskXP * 0.1) * multiplier * delta;

  const masteryThreshold = (skill.permanentMastery + 1) * 100;
  if (skill.masteryXP >= masteryThreshold) {
    skill.masteryXP -= masteryThreshold;
    skill.permanentMastery++;
  }
}

export function reanchorTimeline(state: GameState) {
  state.stability = state.maxStability;
  state.activeTaskId = null;
  state.isPaused = false;
  state.collapseTimer = 0;
  state.timeInLoop = 0; 
  // timelineAdvanced removed (Architectural choice: use eraCompletions instead)

  // Reset all skills' Focus
  for (const skillKey in state.skills) {
    const skill = state.skills[skillKey];
    skill.currentFocus = 0;
    skill.focusXP = 0;
  }

  // Reset all tasks' progress
  for (const task of state.tasks) {
    task.currentProgress = 0;
    task.completions = 0;
  }
}

export function calculateEntropyRate(state: GameState): number {
  if (!state.activeTaskId) return 0; // No active task, no entropy gain

  const activeTask = state.tasks.find(task => task.id === state.activeTaskId);

  const weight = activeTask ? activeTask.entropyWeight : 1; // Default weight is 1 if not specified

  // Compounding Entropy: 20% increase per minute
  const scalingMultiplier = Math.pow(ENTROPY_SCALING_RATE, state.timeInLoop / 60);
  return BASE_STABILITY_DECAY * scalingMultiplier * weight; 
}

export function consumeItem(state: GameState, itemId: string): boolean {
  const currentAmount = state.inventory[itemId] || 0;
  if (currentAmount <= 0) return false;
  
  if (itemId === 'rawEnergy') {
    state.stability += 15;
    if (state.stability > state.maxStability) state.stability = state.maxStability;
    state.inventory[itemId] = currentAmount - 1;
    return true;
  }

  if (itemId === 'temporalRegulator') {
    state.stability += 10;
    if (state.stability > state.maxStability) state.stability = state.maxStability;
    state.inventory[itemId] = currentAmount - 1;
    return true;
  }

  return false;
}

export function isTaskUnlocked(state: GameState, task: Task): boolean {
  if (task.unlocked) return true;

  const reqs = task.unlockRequirements;
  if (!reqs) return true;

  if (reqs.skillLevels) {
    for (const [skillId, level] of Object.entries(reqs.skillLevels)) {
      if ((state.skills[skillId]?.currentFocus || 0) < level) {
        return false;
      }
    }
  }

  if (reqs.taskCompletions) {
    for (const [taskId, count] of Object.entries(reqs.taskCompletions)) {
      const task = state.tasks.find(t => t.id === taskId);
      if (!task || task.completions < count) {
        return false;
      }
    }
  }

  return true;
}
