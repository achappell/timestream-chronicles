<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import GameHeader from './components/GameHeader.vue';
import SkillCard from './components/SkillCard.vue';
import { calculateEntropyRate, tick as engineTick, reanchorTimeline, consumeItem, isTaskUnlocked } from './logic/engine';
import { loadGame, saveGame, clearSave } from './logic/persistence';
import type { GameState, Skill, Task, Era } from './types';
import ProgressBar from './components/ProgressBar.vue';
import SystemMenu from './components/SystemMenu.vue';
import { importSave, exportSave } from './logic/persistence';
import defaultSkills from './data/skills.json';
import defaultTasks from './data/tasks.json';
import defaultEras from './data/eras.json';
import TaskTooltip from './components/TaskTooltip.vue';

const appVersion = __APP_VERSION__; // Injected at build time

const DEFAULT_STATE: GameState = {
  stability: 100,
  maxStability: 100,
  isPaused: false,
  collapseTimer: 0,
  timeInLoop: 0,
  activeTaskId: null,
  currentEra: 'hartnell', 
  skills: defaultSkills as Record<string, Skill>,
  tasks: defaultTasks as Task[],
  inventory: { },
  eraCompletions: { },
  eras: defaultEras as Record<string, Era>
};

const state: GameState = reactive(loadGame(DEFAULT_STATE));
const inspectedTask = ref<Task | null>(null);

// TARDIS Auto-Save Protocol: Every 30 seconds
setInterval(() => {
  saveGame(state);
}, 30000);

let lastTick = performance.now();
const tick = () => {
  const now = performance.now();
  const delta = (now - lastTick) / 1000;
  lastTick = now;
  
  engineTick(state, delta);
  requestAnimationFrame(tick);
};

const handleReanchor = () => {
  reanchorTimeline(state);
};

onMounted(() => {
  requestAnimationFrame(tick);
});

const isMenuOpen = ref(false);

const handleManualSave = () => saveGame(state);
const handleHardReset = () => clearSave();
const handleImport = (str: string) => {
  const newState = importSave(str, DEFAULT_STATE);
  if (newState) {
    Object.assign(state, newState); // Update reactive state with imported data
    
    saveGame(state); // Immediately save the imported state
    alert('TIMELINE IMPORTED SUCCESSFULLY!');
    isMenuOpen.value = false; // Close menu after import
  } else {
    alert('FAILED TO IMPORT TIMELINE');
  }
}

const handleExport = () => {
  const saveString = exportSave(state);
  console.log('Exported Save String:', saveString);
  navigator.clipboard.writeText(saveString)
  .then(() => {
    alert('TIMELINE STRING (BASE64) COPIED TO CLIPBOARD:\n\n' + saveString);
  })
  .catch(() => {
    alert('FAILED TO COPY TIMELINE STRING TO CLIPBOARD');
  });
};

</script>

<template>
  <div class="app-container" :data-era="state.currentEra" :class="{ shake: state.collapseTimer > 0 }">
    <GameHeader 
      :isPaused="state.isPaused" 
      :stability="state.stability"
      :timeInLoop="state.timeInLoop"
      :entropyRate="calculateEntropyRate(state)"
      @pause-toggle="state.isPaused = !state.isPaused"
      @menu-toggle="isMenuOpen = !isMenuOpen"
    />
    <SystemMenu 
      v-if="isMenuOpen" 
      @save="handleManualSave" 
      @hard-reset="handleHardReset" 
      @import-save="handleImport" 
      @export-save="handleExport"
    />
    <button
      v-if="state.stability <= 0"
      @click="handleReanchor"
      class="reanchor-btn"
    >
      RE-ANCHOR TIMELINE
    </button>

    <main class="console-grid">
      <div class="section-label">MISSION PROTOCOLS</div>
      <div class="task-list">
        <template v-for="task in state.tasks" :key="task.id">
          <button 
            class="task-action-btn"
            v-if="isTaskUnlocked(state, task)"
            @click="state.activeTaskId = task.id"
            :class="{ 
              active: state.activeTaskId === task.id 
            }">
            <ProgressBar 
              :progress="(task.currentProgress / task.targetProgress) * 100" 
              variant="secondary"
              :label="task.name"
              :count="task.maxCompletions > 0 ? `${task.completions}/${task.maxCompletions}` : ''">
            </ProgressBar>
            <button class="info-btn" @click.stop="inspectedTask = task" aria-label="Task Details"
                    v-if="isTaskUnlocked(state, task)">
              ?
            </button>
          </button>
        </template>
      </div>

      <div class="section-label">SYSTEM SURPLUS</div>
      <div class="inventory-grid">
        <div v-if="Object.keys(state.inventory).length === 0" class="empty-inventory">
          NO ITEMS RECOVERED
        </div>
        <template v-for="(amount, itemId) in state.inventory" :key="itemId">
          <button 
            @click="consumeItem(state, itemId)"
            class="inventory-btn"
            v-show="amount > 0"
          >
            <span class="item-name">PURGE {{ itemId.toUpperCase() }}</span>
            <span class="item-count">QTY: {{ amount }}</span>
          </button>
        </template>
      </div>

      <div class="section-label">COGNITIVE MASTERY</div>
      <div class="skills-grid">
        <SkillCard 
          v-for="skill in state.skills" 
          :key="skill.name" 
          :skill="skill" 
        />
      </div>
    </main>
    <div class="version-info">
      <button class="reset-btn" @click="clearSave">HARD RESET</button>
      Version: {{ appVersion }}
    </div>
    <div class="crt-overlay"></div>
    <TaskTooltip
    v-if="inspectedTask"
    :task="inspectedTask"
    @close="inspectedTask = null"
    />
  </div>
</template>

<style>
/* Reset and Container */
.app-container { 
  min-height: 100vh; 
  display: flex; 
  flex-direction: column; 
  background: var(--color-vortex-black); 
  color: var(--color-text-bright); 
  position: relative;
  padding-bottom: 40px; 
  box-sizing: border-box;
  backface-visibility: hidden; 
  transform: translateZ(0); 
}

.console-grid { 
  padding: var(--container-padding); 
  flex-grow: 1; 
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.task-list { 
  display: flex; 
  gap: var(--grid-gap); 
  margin-bottom: var(--space-lg); 
  flex-wrap: wrap;
}

.skills-grid { display: flex; flex-wrap: wrap; gap: var(--space-md); }

/* Buttons */
button:hover { border-color: var(--color-focus-white); color: var(--color-focus-white); }
button.active { background: var(--color-focus-white); color: var(--color-vortex-black); box-shadow: var(--glow-active); }

.section-label {
  color: var(--color-text-dim); 
  font-size: 0.75rem; 
  font-weight: 800;
  letter-spacing: 2px;
  margin: var(--space-lg) 0 var(--space-sm) 0; 
  border-left: 4px solid var(--color-focus-white); 
  padding-left: var(--space-sm);
  text-shadow: 0 0 5px rgba(255,255,255,0.1);
}

button {
  background: var(--color-panel-dark);
  border: var(--border-standard);
  color: var(--color-text-mid); 
  display: flex;
  flex-direction: column;
  min-width: 176px;
  min-height: 48px;
  padding: var(--space-sm);
  justify-content: center;
  align-items: stretch;
  transition: var(--transition-smooth);
  gap: var(--space-xs);
}

.reset-btn {
  background: transparent;
  border: none;
  color: var(--color-text-dim);
  font-size: 0.65rem;
  cursor: pointer;
  margin-right: 15px;
  padding: 0;
  min-width: auto;
  min-height: auto;
}

.reset-btn:hover {
  color: var(--color-warning); /* Warning red */
  text-decoration: underline;
}

.inventory-grid {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.inventory-btn {
  background: var(--color-panel-mid);
  border: 1px solid var(--color-accent-blue);
  color: var(--color-accent-blue);
  padding: var(--space-sm) var(--space-md);
  flex-direction: row;      /* Align QTY and NAME horizontally */
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
}

.inventory-btn:hover {
  background: var(--color-accent-blue);
  color: var(--color-vortex-black); 
}

.empty-inventory {
  font-size: 0.75rem;
  color: var(--color-text-dim);
  font-style: italic;
  padding: 10px;
}

.item-count {
  font-size: 0.7rem;
  opacity: 0.8;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg);}
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, 1px) rotate(1deg); }
  90% { transform: translate(1px, 1px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.shake {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

.shake::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(255, 0, 0, 0.05); 
  pointer-events: none; 
  z-index: 100;
}

.version-info {
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 0.75rem;
  color: var(--color-text-dim); 
  display: flex;
  align-items: center;
}

.crt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: 
  linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%),
  radial-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 999;
  pointer-events: none;
  background-size: 100% 4px, 100% 100%;
}

.crt-overlay::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 200%;
  background: linear-gradient(rgba(255, 255, 255, 0.08), transparent 25%, transparent);
  pointer-events: none;
  animation: scanline-roll 12s linear infinite;
  opacity: 0.1;
}

.crt-overlay::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  opacity: 0.02;
  animation: crt-flicker 0.1s infinite;
}

.task-container {
  position: relative;
  display: flex;
}

.info-btn {
  width: 24px; height: 24px;
  min-width: 24px; min-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-vortex-black);
  border: 1px solid var(--color-text-dim);
  color: var(--color-text-dim);
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  top: var(--space-xs);
  right: var(--space-xs);
}

.info-btn:hover {
  color: var(--color-focus-white);
  border-color: var(--color-focus-white);
}

@media (max-width: 600px) {
  .console-grid {
    padding: 10px;
  }
  
  .task-list {
    flex-direction: column;
    gap: 8px;
  }
  
  .skills-grid {
    justify-content: center;
  }
}
</style>