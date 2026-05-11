import { describe, it, expect } from "vitest";
import { updateSkill } from "./engine";
import { createMockSkill } from "./test-utils";

describe("Compounding Progression Math (Increlution Style)", () => {
  it("should calculate the multiplier compounding for Mastery (1% per level)", () => {
    const skill = createMockSkill({ permanentMastery: 10, focusXP: 0, currentFocus: 0 });
    // Total Mult = 1.01^10 * 1.05^0 = 1.1046...
    // Base task XP = 100.
    // Mastery XP gain (static 10% of base) * multiplier
    // Expected Mastery XP = 100 * 0.1 * 1.1046... = 11.046
    updateSkill(skill, 100, 1.0);
    expect(skill.masteryXP).toBeCloseTo(11.046, 3);
  });

  it("should calculate the multiplier compounding for Focus (5% per level)", () => {
    const skill = createMockSkill({ permanentMastery: 0, currentFocus: 10 });
    // Total Mult = 1.01^0 * 1.05^10 = 1.62889...
    // Base task XP = 100.
    // Focus XP gain = 100 * 1.62889... = 162.889
    updateSkill(skill, 100, 1.0);
    expect(skill.focusXP).toBeCloseTo(162.889, 3);
  });

  it("should be multiplicative between Focus and Mastery", () => {
    const skill = createMockSkill({ permanentMastery: 10, currentFocus: 10 });
    // Total Mult = (1.01^10) * (1.05^10) = 1.1046 * 1.6288 = 1.799...
    // Focus XP gain = 100 * 1.799 = 179.9
    updateSkill(skill, 100, 1.0);
    expect(skill.focusXP).toBeCloseTo(179.9, 1);
  });
});
