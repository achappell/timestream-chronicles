import { describe, it, expect } from "vitest";
import { updateSkill } from "./engine";
import { createMockState } from "./test-utils";

describe("Mastery Progression (Real-Time)", () => {
  it("should increment permanentMastery immediately when masteryXP hits the threshold", () => {
    const state = createMockState();
    const skillKey = Object.keys(state.skills)[0];
    const skill = state.skills[skillKey];
    
    skill.masteryXP = 99.9; 
    skill.permanentMastery = 0;
    
    // updateSkill(skill, taskXP, delta)
    // We need 0.1 more masteryXP. 
    // Mastery XP gain is taskXP * 0.01 * delta.
    // If taskXP is 100 and delta is 0.1, gain is 100 * 0.01 * 0.1 = 0.1
    updateSkill(skill, 100, 0.1);
    
    expect(skill.permanentMastery).toBe(1);
    expect(skill.masteryXP).toBeCloseTo(0, 5);
  });
});
