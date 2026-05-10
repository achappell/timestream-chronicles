import type { GameState, Skill, Task } from "../types";

const BASE_STABILITY_DECAY = 0.5; // Base stability decay per second when a task is active
const SCALING_FACTOR = 0.1; // Scaling factor for XP gain to prevent runaway growth

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
    state.stability -= calculateEntropyRate(state) * delta; // Decay stability based on active task and time in loop
  }

  if (state.activeTaskId) {
    const activeTask = state.tasks.find(task => task.id === state.activeTaskId);
    if (activeTask) {
      const skill = state.skills[activeTask.skillId];

      // 1. Continuous XP Award (Updates Skill Bars smoothly)
      if (skill) {
        updateSkill(skill, activeTask.xpPerSec, delta);
      }

      // 2. Advance Cycle Progress
      const multiplier = (1 + skill.permanentMastery * 0.1) * (1 + skill.currentFocus * 0.05); // Mastery and Focus can speed up progress
      activeTask.currentProgress += delta * multiplier;
      if (activeTask.currentProgress >= activeTask.targetProgress) {
        activeTask.currentProgress = 0;
        activeTask.completions++;

        if (activeTask.rewards) {
          for (const reward of activeTask.rewards) {
            if (Math.random() < reward.chance) {
              const currentAmount = state.inventory[reward.itemId] || 0;
              state.inventory[reward.itemId] = currentAmount + reward.amount;
            }
          }
        }
      }

      // 3. Mission Completion
      if (activeTask.completions >= activeTask.maxCompletions) {
        state.activeTaskId = null;
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
  const multiplier = 1 + (skill.permanentMastery * 0.1) * (1 + skill.currentFocus * 0.05); // Mastery and Focus can speed up learning
  skill.focusXP += taskXP * multiplier * delta;
  const focusThreshold = (skill.currentFocus + 1) * 100;
  if (skill.focusXP >= focusThreshold) {
    skill.focusXP -= focusThreshold;
    skill.currentFocus++;
  }
  
  skill.masteryXP += taskXP * 0.1 * delta;

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
  state.timeInLoop = 0; // Reset loop timer

  // Reset all skills' Focus and add Mastery XP
  for (const skillKey in state.skills) {
    const skill = state.skills[skillKey];
    skill.currentFocus = 0; // Reset Focus level
    skill.focusXP = 0; // Reset Focus XP
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

  const scalingMultiplier = 1 + (state.timeInLoop / 60) * SCALING_FACTOR; // Increase decay over time
  return BASE_STABILITY_DECAY * scalingMultiplier * weight; // Base decay scaled by time in loop
}

export function consumeItem(state: GameState, itemId: string): boolean {
  const currentAmount = state.inventory[itemId] || 0;
  if (currentAmount <= 0) return false;
  
  const restorationValues: Record<string, number> = {
    rawEnergy: 15, // Restores energy
  };

  const amount = restorationValues[itemId] || 0;

  state.inventory[itemId] = currentAmount - 1;
  state.stability = Math.min(state.stability + amount, state.maxStability);
  return true;
}

export function isTaskUnlocked(state: GameState, task: Task): boolean {
  if (task.unlocked) return true; // If already unlocked, return true

  if (!task.unlockRequirements) return false; // No requirements means it can't be unlocked

  const reqs = task.unlockRequirements;

  if (reqs.skillLevels) {
    for (const [skillId, level] of Object.entries(reqs.skillLevels)) {
      if (state.skills[skillId]?.permanentMastery < level) {
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