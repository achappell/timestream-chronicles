declare global {
  const __APP_VERSION__: string; // Injected at build time
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  permanentMastery: number; // The "Baseline" (Blue Bar)
  currentFocus: number;     // The "Surge" for this life (Gold Bar)
  masteryXP: number;        // XP toward the next permanent level
  focusXP: number;          // XP toward the next focus level
}

export interface GameState {
  stability: number; 
  maxStability: number; 
  isPaused: boolean;
  collapseTimer: number; // Timer to manage collapse duration
  timeInLoop: number; // Total time spent in the current loop
  activeTaskId: string | null;
  currentEra: string;
  skills: Record<string, Skill>;
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
  description: string;
  skillId: string;    // Maps to the key in state.skills (e.g., 'stealth')
  xpPerSec: number;   // Base XP awarded per second
  unlocked: boolean; // for progression logic
  currentProgress: number; // track progress toward completion
  targetProgress: number; // define what "completion" means (e.g., reach Focus level 5)
  completions: number; // track how many times this task has been completed
  maxCompletions: number; // limit how many times this task can be completed
}
