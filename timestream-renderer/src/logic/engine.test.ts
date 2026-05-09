import { describe, it, expect } from "vitest";
import { tick, calculateEntropyRate } from "./engine";
import { createMockState, createMockTask } from "./test-utils";

describe("Temporal Engine Heartbeat", () => {
  
  describe("Safety Stasis (Auto-Pause)", () => {
    it("should engage stasis if no task is active", () => {
      const state = createMockState({ activeTaskId: null, isPaused: false });
      tick(state, 1.0);
      expect(state.isPaused).toBe(true);
    });

    it("should NOT engage stasis if a task is active", () => {
      const state = createMockState({ activeTaskId: "test-task", isPaused: false });
      tick(state, 1.0);
      expect(state.isPaused).toBe(false);
    });
  });

  describe("Entropy Scaling Curve", () => {
    it("should calculate base decay (0.5) at the start of a loop", () => {
      const state = createMockState({ activeTaskId: "test-task", timeInLoop: 0 });
      const rate = calculateEntropyRate(state);
      expect(rate).toBe(0.5);
    });

    it("should scale decay by 10% (0.55) after 60 seconds", () => {
      const state = createMockState({ activeTaskId: "test-task", timeInLoop: 60 });
      const rate = calculateEntropyRate(state);
      expect(rate).toBeCloseTo(0.55, 5);
    });

    it("should correctly reduce stability based on scaled rate", () => {
      const state = createMockState({ 
        activeTaskId: "test-task", 
        timeInLoop: 60, 
        stability: 100 
      });
      // At 60s, decay is 0.55/s. A 1s tick should result in 99.45
      tick(state, 1.0);
      expect(state.stability).toBeCloseTo(99.45, 5);
    });
  });

  describe("Mission Cycles & XP", () => {
    it("should advance task progress by delta", () => {
      const task = createMockTask({ currentProgress: 0 });
      const state = createMockState({ activeTaskId: task.id, tasks: [task] });
      tick(state, 0.5);
      expect(state.tasks[0].currentProgress).toBe(0.5);
    });

    it("should increment completions and reset progress when cycle finishes", () => {
      const task = createMockTask({ currentProgress: 9.5, targetProgress: 10, completions: 0 });
      const state = createMockState({ activeTaskId: task.id, tasks: [task] });
      tick(state, 1.0); // Overshoot by 0.5
      expect(state.tasks[0].completions).toBe(1);
      expect(state.tasks[0].currentProgress).toBe(0);
    });

    it("should auto-pause when max completions are reached", () => {
      const task = createMockTask({ 
        currentProgress: 9, 
        targetProgress: 10, 
        completions: 4, 
        maxCompletions: 5 
      });
      const state = createMockState({ activeTaskId: task.id, tasks: [task] });
      tick(state, 1.0);
      expect(state.activeTaskId).toBe(null);
      // Next tick will trigger Safety Stasis
      tick(state, 0.1);
      expect(state.isPaused).toBe(true);
    });
  });

});
