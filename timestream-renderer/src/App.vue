<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import GameHeader from './components/GameHeader.vue';
import SkillCard from './components/SkillCard.vue';
import { calculateEntropyRate, tick as engineTick, reanchorTimeline } from './logic/engine';
import { loadGame, saveGame, clearSave } from './logic/persistence';
import type { GameState } from './types';
import ProgressBar from './components/ProgressBar.vue';
import SystemMenu from './components/SystemMenu.vue';
import { importSave, exportSave } from './logic/persistence';

const appVersion = __APP_VERSION__; // Injected at build time

const DEFAULT_STATE: GameState = {
  stability: 100,
  maxStability: 100,
  isPaused: false,
  collapseTimer: 0,
  timeInLoop: 0,
  activeTaskId: null,
  currentEra: 'hartnell', 
  skills: {
    scientificInquiry: { 
      id: 'scientificInquiry',
      name: 'Scientific Inquiry', 
      description: 'The ability to analyze and understand the world around you, uncovering hidden knowledge and insights.',
      permanentMastery: 5, 
      currentFocus: 0, 
      focusXP: 0,
      masteryXP: 0 
    },
    stealth: { 
      id: 'stealth',
      name: 'Stealth', 
      description: 'The skill of moving unseen and unheard, allowing you to navigate dangerous environments without detection.',
      permanentMastery: 0, 
      currentFocus: 0, 
      focusXP: 0,
      masteryXP: 0 
    }
  },
  tasks: [
    { 
      id: 'lurk', 
      name: 'Lurk in Shadows', 
      description: 'Practice moving unseen through the environment to improve your stealth skills.',
      skillId: 'stealth', 
      xpPerSec: 10, 
      currentProgress: 0,
      targetProgress: 100, 
      completions: 0,
      maxCompletions: 5,
      unlocked: true 
    },
    { 
      id: 'analyze', 
      name: 'Analyze Junkyard', 
      description: 'Examine the junkyard to uncover hidden knowledge and boost your scientific inquiry skills.',
      skillId: 'scientificInquiry', 
      xpPerSec: 15, 
      currentProgress: 0,
      targetProgress: 100, 
      completions: 0,
      maxCompletions: 5,
      unlocked: true
    }
  ]
};

const state: GameState = reactive(loadGame(DEFAULT_STATE));

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
  const newState = importSave(str);
  if (newState) {
    state.stability = newState.stability;
    state.skills = newState.skills;
    state.tasks = newState.tasks;
    state.timeInLoop = newState.timeInLoop;
    
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
  <div class="app-container" :data-era="state.currentEra" :class="{ shake: state.collapseTimer > 0
   }">
    <GameHeader 
      :isPaused="state.isPaused" 
      :stability="state.stability"
      :timeInLoop="state.timeInLoop"
      :entropyRate="calculateEntropyRate(state)"
      @pause-toggle="state.isPaused = !state.isPaused"
      @menu-toggle="isMenuOpen = !isMenuOpen"
    />
    <SystemMenu v-if="isMenuOpen" 
      @save="handleManualSave" 
      @hard-reset="handleHardReset" 
      @import-save="handleImport" 
      @export-save="handleExport"/>
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
        <button 
          v-for="task in state.tasks" 
          :key="task.id"
          @click="state.activeTaskId = task.id"
          :class="{ 
            active: state.activeTaskId === task.id 
          }"
        >
        <ProgressBar 
          :progress="task.currentProgress / task.targetProgress * 100" 
          variant="secondary"
          :label="task.name"
          :count="`${task.completions}/${task.maxCompletions}`"
        >
        </ProgressBar>
        </button>
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

.console-grid { padding: 20px; flex-grow: 1; }

.task-list { display: flex; gap: 10px; margin-bottom: 30px; }

.skills-grid { display: flex; flex-wrap: wrap; gap: 15px; }

/* Buttons */
button:hover { border-color: var(--color-focus-white); color: var(--color-focus-white); }
button.active { background: var(--color-focus-white); color: var(--color-vortex-black); box-shadow: var(--glow-active); }

.section-label {
  color: var(--color-text-dim); 
  font-size: 0.75rem; 
  font-weight: 800;
  letter-spacing: 2px;
  margin: 25px 0 12px 0; 
  border-left: 4px solid var(--color-focus-white); 
  padding-left: 12px;
  text-shadow: 0 0 5px rgba(255,255,255,0.1);
}

button {
  background: var(--color-panel-dark);
  border: var(--border-standard);
  color: var(--color-text-mid); 
  display: flex;
  flex-direction: column;
  min-width: 160px;
  min-height: 48px;
  padding: 12px;
  transition: var(--transition-smooth);
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
  color: #ff0000; /* Warning red */
  text-decoration: underline;
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

</style>