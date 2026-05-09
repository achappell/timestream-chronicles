import { describe, it, expect, beforeEach, vi } from "vitest";
import { saveGame, loadGame } from "./persistence";
import { createMockState } from "./test-utils";

describe("TARDIS Memory (Persistence)", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should save the state to localStorage", () => {
    const state = createMockState({ stability: 42 });
    saveGame(state);
    
    const saved = localStorage.getItem("timestream_chronicles_v1");
    expect(saved).toBeDefined();
    expect(JSON.parse(saved!).stability).toBe(42);
  });

  it("should hydrate the state from localStorage", () => {
    const savedState = createMockState({ stability: 88 });
    localStorage.setItem("timestream_chronicles_v1", JSON.stringify(savedState));
    
    const defaultState = createMockState({ stability: 100 });
    const hydrated = loadGame(defaultState);
    
    expect(hydrated.stability).toBe(88);
  });

  it("should merge new default skills if they are missing from save", () => {
    // Save state with only one skill
    const savedState = {
      skills: { "old-skill": { name: "Old", permanentMastery: 1 } }
    };
    localStorage.setItem("timestream_chronicles_v1", JSON.stringify(savedState));
    
    const defaultState = createMockState({
      skills: {
        "old-skill": { id: "old-skill", name: "Old", permanentMastery: 0, currentFocus: 0, focusXP: 0, masteryXP: 0, description: "" },
        "new-skill": { id: "new-skill", name: "New", permanentMastery: 0, currentFocus: 0, focusXP: 0, masteryXP: 0, description: "" }
      }
    });
    
    const hydrated = loadGame(defaultState as any);
    
    expect(hydrated.skills["old-skill"].permanentMastery).toBe(1);
    expect(hydrated.skills["new-skill"]).toBeDefined();
    expect(hydrated.skills["new-skill"].name).toBe("New");
  });

  it("should return default state if memory is empty", () => {
    const defaultState = createMockState({ stability: 100 });
    const hydrated = loadGame(defaultState);
    expect(hydrated.stability).toBe(100);
  });

  it("should handle corrupted JSON gracefully", () => {
    localStorage.setItem("timestream_chronicles_v1", "corrupted-vortex-data");
    const defaultState = createMockState({ stability: 100 });
    
    const hydrated = loadGame(defaultState);
    expect(hydrated.stability).toBe(100);
  });
});
