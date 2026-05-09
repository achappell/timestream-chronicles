<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import GameHeader from './components/GameHeader.vue';
import SkillCard from './components/SkillCard.vue';
import { calculateEntropyRate, tick as engineTick, reanchorTimeline } from './logic/engine';
import type { GameState } from './types';
import ProgressBar from './components/ProgressBar.vue';

const appVersion = __APP_VERSION__; // Injected at build time

const state: GameState = reactive({
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
});

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
    <div class="version-info">Version: {{ appVersion }}</div>
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
  padding-bottom: 30px; /* Space for version info */
  box-sizing: border-box;
  backface-visibility: hidden; /* Prevent flicker during shake */
  transform: translateZ(0); /* Force GPU acceleration */
}

.version-info {
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 0.75rem;
  color: var(--color-text-dim); 
}

</style>