<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import GameHeader from './components/GameHeader.vue';
import SkillCard from './components/SkillCard.vue';

// 1. STATE INITIALIZATION
const state = reactive({
  artronEnergy: 1000,
  maxArtronEnergy: 1000,
  activeTaskId: null as string | null,
  skills: {
    scientificInquiry: { 
      name: 'Scientific Inquiry', 
      permanentMastery: 5, 
      currentFocus: 0, 
      focusXP: 0,
      masteryXP: 0 
    },
    stealth: { 
      name: 'Stealth', 
      permanentMastery: 0, 
      currentFocus: 0, 
      focusXP: 0,
      masteryXP: 0 
    }
  },
  tasks: [
    { id: 'lurk', name: 'Lurk in Shadows', skillId: 'stealth', xpPerSec: 10, artronCost: 2 },
    { id: 'analyze', name: 'Analyze Junkyard', skillId: 'scientificInquiry', xpPerSec: 15, artronCost: 5 }
  ]
});

// 2. THE TICK ENGINE
let lastTick = performance.now();
const tick = () => {
  const now = performance.now();
  const delta = (now - lastTick) / 1000;
  lastTick = now;

  if (state.activeTaskId && state.artronEnergy > 0) {
    const task = state.tasks.find(t => t.id === state.activeTaskId);
    const skill = (state.skills as any)[task!.skillId];

    if (task && skill) {
      // Drain Energy
      state.artronEnergy -= task.artronCost * delta;
      
      // Focus XP (Mastery Multiplier)
      const multiplier = 1 + (skill.permanentMastery * 0.1);
      skill.focusXP += task.xpPerSec * multiplier * delta;
      
      // Level Up Logic
      if (skill.focusXP >= 100) {
        skill.focusXP -= 100;
        skill.currentFocus++;
      }
    }
  }

  if (state.artronEnergy <= 0) {
    state.artronEnergy = 0;
    state.activeTaskId = null;
  }

  requestAnimationFrame(tick);
};

onMounted(() => {
  requestAnimationFrame(tick);
});
</script>

<template>
  <div class="app-container">
    <GameHeader :energy="state.artronEnergy" :maxEnergy="state.maxArtronEnergy" />
    
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
</style>