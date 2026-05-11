import { describe, it, expect } from "vitest";
import { tick, calculateEntropyRate, isTaskUnlocked } from "./engine";
import { createMockState, createMockTask, createMockSkill } from "./test-utils";

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

    it("should scale decay by the task's entropyWeight", () => {
      const task = createMockTask({ entropyWeight: 2 });
      const state = createMockState({ activeTaskId: task.id, tasks: [task], timeInLoop: 0 });
      const rate = calculateEntropyRate(state);
      expect(rate).toBe(1.0); // 0.5 base * 2 weight
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

    it("should increment eraCompletions and reanchor when the era's final task completes", () => {
      const task = createMockTask({ 
        id: 'final-era-task',
        currentProgress: 99.5, 
        targetProgress: 100, 
        completions: 0, 
        maxCompletions: 1 
      });
      const state = createMockState({ 
        activeTaskId: task.id, 
        tasks: [task], 
        currentEra: 'test-era',
        eraCompletions: { 'test-era': 0 },
        eras: {
          'test-era': { id: 'test-era', name: 'Test', description: 'Test', finalTaskId: 'final-era-task' }
        }
      } as any); // Cast to any to bypass type check temporarily until user updates types.ts
      tick(state, 1.0);
      expect(state.eraCompletions['test-era']).toBe(1);
      expect(state.activeTaskId).toBe(null); // Reanchored
      expect(state.timeInLoop).toBe(0); // Reanchored
    });
  });

  describe("Task Unlock Logic", () => {
    it("should be unlocked if unlocked property is true", () => {
      const task = createMockTask({ unlocked: true });
      const state = createMockState();
      expect(isTaskUnlocked(state, task)).toBe(true);
    });

    it("should be unlocked if skill Focus level requirement is met", () => {
      const state = createMockState({
        skills: {
          "test-skill": createMockSkill({ currentFocus: 2 })
        }
      });
      const task = createMockTask({
        unlocked: false,
        unlockRequirements: {
          skillLevels: { "test-skill": 2 }
        }
      });
      expect(isTaskUnlocked(state, task)).toBe(true);
    });

    it("should NOT be unlocked if skill Focus level requirement is not met", () => {
      const state = createMockState({
        skills: {
          "test-skill": createMockSkill({ currentFocus: 1 })
        }
      });
      const task = createMockTask({
        unlocked: false,
        unlockRequirements: {
          skillLevels: { "test-skill": 2 }
        }
      });
      expect(isTaskUnlocked(state, task)).toBe(false);
    });

    it("should be unlocked if task completion requirement is met", () => {
      const completedTask = createMockTask({ id: "prereq-task", completions: 1 });
      const state = createMockState({
        tasks: [completedTask]
      });
      const task = createMockTask({
        unlocked: false,
        unlockRequirements: {
          taskCompletions: { "prereq-task": 1 }
        }
      });
      expect(isTaskUnlocked(state, task)).toBe(true);
    });

    it("should NOT be unlocked if task completion requirement is not met", () => {
      const completedTask = createMockTask({ id: "prereq-task", completions: 0 });
      const state = createMockState({
        tasks: [completedTask]
      });
      const task = createMockTask({
        unlocked: false,
        unlockRequirements: {
          taskCompletions: { "prereq-task": 1 }
        }
      });
      expect(isTaskUnlocked(state, task)).toBe(false);
    });
  });

});
