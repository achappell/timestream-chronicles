import type { GameState, Skill } from "../types";

const MASTERY_FACTOR = 0.1; // Mastery makes you learn 10% faster per level
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
      activeTask.currentProgress += delta;
      if (activeTask.currentProgress >= activeTask.targetProgress) {
        activeTask.currentProgress = 0;
        activeTask.completions++;
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
  const learningMultiplier = 1 + (skill.permanentMastery * MASTERY_FACTOR);
  
  skill.focusXP += taskXP * learningMultiplier * delta;
  const focusThreshold = (skill.currentFocus + 1) * 100;
  if (skill.focusXP >= focusThreshold) {
    skill.focusXP -= focusThreshold;
    skill.currentFocus++;
  }
  
  skill.masteryXP += taskXP * 0.01 * delta;

  const masteryThreshold = 100;
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
}

export function calculateEntropyRate(state: GameState): number {
  if (!state.activeTaskId) return 0; // No active task, no entropy gain
  const scalingMultiplier = 1 + (state.timeInLoop / 60) * SCALING_FACTOR; // Increase decay over time
  return BASE_STABILITY_DECAY * scalingMultiplier; // Base decay scaled by time in loop
}