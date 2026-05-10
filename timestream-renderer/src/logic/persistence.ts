import type { GameState } from "../types";

const SAVE_KEY = "timestream_chronicles_v1";

/**
 * Materializes the current state into the TARDIS permanent memory (LocalStorage).
 */
export function saveGame(state: GameState) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, serialized);
  } catch (e) {
    console.error("TARDIS Memory Error: Failed to materialize save file.", e);
  }
}

/**
 * Retrieves the state from memory and hydrates it, ensuring new schema properties 
 * from the default state are preserved.
 */
export function loadGame(defaultState: GameState): GameState {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (!saved) return defaultState;

    const parsed = JSON.parse(saved);
    
    // Merge strategy: Start with default, overwrite with saved values
    return {
      ...defaultState,
      ...parsed,
      inventory: { ...defaultState.inventory, ...parsed.inventory }, // Merge inventory
      // Ensure skills map is merged correctly
      skills: { ...defaultState.skills, ...parsed.skills },
      // Ensure task progress is merged by ID
      tasks: defaultState.tasks.map(dt => {
        const savedTask = parsed.tasks?.find((st: any) => st.id === dt.id);
        return savedTask ? { ...dt, ...savedTask } : dt;
      })
    };
  } catch (e) {
    console.error("TARDIS Memory Error: Save file corrupted in the Vortex.", e);
    return defaultState;
  }
}

export function hydrateState(defaultState: GameState, parsed: any): GameState {
  return {
    ...defaultState,
    ...parsed,
    inventory: { ...defaultState.inventory, ...parsed.inventory },
    // Ensure skills map is merged correctly
    skills: { ...defaultState.skills, ...parsed.skills },
    // Ensure task progress is merged by ID
    tasks: defaultState.tasks.map(dt => {
      const savedTask = parsed.tasks?.find((st: any) => st.id === dt.id);
      return savedTask ? { ...dt, ...savedTask } : dt;
    })
  };
}

export function exportSave(state: GameState): string {
  const serialized = JSON.stringify(state);
  return btoa(serialized);
}

export function importSave(encoded: string, defaultState: GameState): GameState | null {
  try {
    const decoded = atob(encoded);
    const parsed = JSON.parse(decoded);
    return hydrateState(defaultState, parsed);
  } catch (e) {
    console.error("TARDIS Memory Error: Failed to decode imported save.", e);
    return null;
  }
}

/**
 * Erases the TARDIS memory. Use with caution.
 */
export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
  window.location.reload();
}
