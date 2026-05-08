import type { GameState, Skill } from "../types";

const MASTERY_FACTOR = 0.1; // Mastery makes you learn 10% faster per level
const BASE_STABILITY_DECAY = 0.5; // Base stability decay per second when a task is active
const SCALING_FACTOR = 0.1; // Scaling factor for XP gain to prevent runaway growth

export function tick(state: GameState, delta: number) {
  if (state.isPaused) return; // Don't process if the game is paused

  if (state.collapseTimer > 0) {
    state.collapseTimer -= delta;
    if (state.collapseTimer <= 0) {
      state.collapseTimer = 0;
    }
  }

  if (state.activeTaskId && state.stability > 0) {
    const scalingMultiplier = 1 + (state.timeInLoop / 60) * SCALING_FACTOR; // Increase decay over time
    state.stability -= BASE_STABILITY_DECAY * scalingMultiplier * delta;
  }

  if (state.activeTaskId) {
    const activeTask = state.tasks.find(task => task.id === state.activeTaskId);
    if (activeTask) {
      // Calculate XP gain based on task difficulty and time
      const skill = state.skills[activeTask.skillId];
      if (skill) {
        updateSkill(skill, activeTask.xpPerSec, delta); // Update the skill with XP gain
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
  // 1. Calculate how fast we learn based on Mastery
  const learningMultiplier = 1 + (skill.permanentMastery * MASTERY_FACTOR);
  
  // 2. Add to current loop's Focus XP
  skill.focusXP += taskXP * learningMultiplier * delta;
  
  // 3. Level up Focus if enough XP is gained
  // (Using a simple linear formula for now: Level * 100)
  const xpNeeded = (skill.currentFocus + 1) * 100;
  if (skill.focusXP >= xpNeeded) {
    skill.focusXP -= xpNeeded;
    skill.currentFocus++;
  }
  
  // 4. Always add a tiny bit to Permanent Mastery
  skill.masteryXP += taskXP * 0.01 * delta;
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