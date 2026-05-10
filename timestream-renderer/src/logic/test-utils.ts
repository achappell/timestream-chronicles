import type { GameState, Skill, Task } from "../types";

export function createMockSkill(overrides: Partial<Skill> = {}): Skill {
  return {
    id: "test-skill",
    name: "Test Skill",
    description: "A skill for testing",
    permanentMastery: 0,
    currentFocus: 0,
    masteryXP: 0,
    focusXP: 0,
    ...overrides,
  };
}

export function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "test-task",
    name: "Test Task",
    description: "A task for testing",
    skillId: "test-skill",
    xpPerSec: 10,
    unlocked: true,
    currentProgress: 0,
    targetProgress: 10,
    completions: 0,
    maxCompletions: 5,
    entropyWeight: 1,
    ...overrides,
  };
}

export function createMockState(overrides: Partial<GameState> = {}): GameState {
  return {
    stability: 100,
    maxStability: 100,
    isPaused: false,
    collapseTimer: 0,
    timeInLoop: 0,
    activeTaskId: null,
    currentEra: "hartnell",
    skills: {
      "test-skill": createMockSkill(),
    },
    tasks: [createMockTask()],
    inventory: {},
    ...overrides,
  };
}
