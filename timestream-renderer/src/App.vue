<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import GameHeader from './components/GameHeader.vue';
import SkillCard from './components/SkillCard.vue';
import { tick as engineTick, reanchorTimeline } from './logic/engine';
import type { GameState } from './types';

const state: GameState = reactive({
  stability: 100,
  maxStability: 100,
  isPaused: false,
  collapseTimer: 0,
  timeInLoop: 0,
  activeTaskId: null,
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
      artronCost: 2 
    },
    { 
      id: 'analyze', 
      name: 'Analyze Junkyard', 
      description: 'Examine the junkyard to uncover hidden knowledge and boost your scientific inquiry skills.',
      skillId: 'scientificInquiry', 
      xpPerSec: 15, 
      artronCost: 5 
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
  <div class="app-container" :class="{ shake: state.collapseTimer > 0
   }">
    <GameHeader 
      :isPaused="state.isPaused" 
      :stability="state.stability"
      :timeInLoop="state.timeInLoop"
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
          :class="{ active: state.activeTaskId === task.id }"
        >
          {{ task.name }}
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
  </div>
</template>

<style>
/* Reset and Container */
body { margin: 0; background: #0a0a0a; color: #eee; font-family: 'Courier New', Courier, monospace; }

.app-container { min-height: 100vh; display: flex; flex-direction: column; }

.console-grid { padding: 20px; flex-grow: 1; }

.task-list { display: flex; gap: 10px; margin-bottom: 30px; }

.skills-grid { display: flex; flex-wrap: wrap; gap: 15px; }

/* Buttons */

button:hover { border-color: #fff; color: #fff; }
button.active { background: #fff; color: #000; box-shadow: 0 0 15px rgba(255,255,255,0.3); }
/* Inside App.vue <style> */
.section-label {
  color: #ccc; /* Light grey */
  font-size: 0.75rem; 
  font-weight: 800;
  letter-spacing: 2px;
  margin: 25px 0 12px 0; 
  border-left: 4px solid #fff; /* Bright white accent */
  padding-left: 12px;
  text-shadow: 0 0 5px rgba(255,255,255,0.1);
}

button {
  background: #111;
  border: 1px solid #555;
  color: #ccc; /* Brighter default text */
  /* ... existing styles ... */
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
  background-color: rgba(255, 0, 0, 0.05); /* Subtle red tint during collapse */
}

</style>