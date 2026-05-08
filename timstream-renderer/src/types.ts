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
  artronEnergy: number;
  maxArtronEnergy: number;
  skills: Record<string, Skill>;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  skillId: string;    // Maps to the key in state.skills (e.g., 'stealth')
  xpPerSec: number;   // Base XP awarded per second
  artronCost: number; // Energy drained per second
  unlocked?: boolean; // Optional: for progression logic
}
