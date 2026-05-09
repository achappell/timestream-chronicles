import { describe, it, expect } from "vitest";
import { reanchorTimeline } from "./engine";
import { createMockState, createMockTask } from "./test-utils";

describe("Timeline Re-Anchoring (Reset)", () => {
  it("should reset currentProgress and completions for all tasks", () => {
    const task = createMockTask({ currentProgress: 5, completions: 3 });
    const state = createMockState({ tasks: [task] });
    
    reanchorTimeline(state);
    
    expect(state.tasks[0].currentProgress).toBe(0);
    expect(state.tasks[0].completions).toBe(0);
  });

  it("should preserve permanentMastery while resetting focusXP and currentFocus", () => {
    const state = createMockState();
    const skillKey = Object.keys(state.skills)[0];
    const skill = state.skills[skillKey];
    
    skill.permanentMastery = 5;
    skill.currentFocus = 10;
    skill.focusXP = 250;
    
    reanchorTimeline(state);
    
    expect(skill.permanentMastery).toBe(5);
    expect(skill.currentFocus).toBe(0);
    expect(skill.focusXP).toBe(0);
  });
});
