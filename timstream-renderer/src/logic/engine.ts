import type { Skill } from "../types";

const MASTERY_FACTOR = 0.1; // Mastery makes you learn 10% faster per level

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