<template>
  <div class="skill-row">
    <div class="skill-header">
      <span class="skill-name">{{ skill.name }}</span>
      <span class="skill-levels">
        MASTERED: <span class="text-white">{{ skill.permanentMastery }}</span>
        <span class="text-focus"> +{{ skill.currentFocus }}</span>
      </span>
    </div>

    <div class="progress-container">
      <div class="progress-track">
        <div 
          class="bar-mastery" 
          :style="{ width: masteryLevelWidth + '%' }"
        ></div>

        <div 
          class="bar-mastery-xp" 
          :style="{ 
            left: masteryLevelWidth + '%', 
            width: (masteryXPWidth) + '%' 
          }"
        ></div>
        
        <div 
          class="bar-focus" 
          :style="{ width: focusProgress + '%' }"
        ></div>
      </div>
      <div class="scanlines"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  skill: {
    name: string;
    permanentMastery: number;
    currentFocus: number;
    focusXP: number;
    masteryXP: number; // Ensure this is passed from state
  }
}>();

// Assuming 100 XP per level for MVP simplicity
const focusProgress = computed(() => (props.skill.focusXP % 100));

// Mastery Level width (each level is 5% of the total bar for visibility)
const masteryLevelWidth = computed(() => Math.min(props.skill.permanentMastery * 5, 100));

// Mastery XP progress (how close to the NEXT mastery level)
// We scale this to fill the space of "one level" (5%)
const masteryXPWidth = computed(() => (props.skill.masteryXP % 1000) / 1000 * 5);
</script>

<style scoped>
/* ... (existing styles) ... */

.bar-mastery {
  position: absolute;
  height: 100%;
  background: #444; /* Solid Grey */
  z-index: 3;
}

.bar-mastery-xp {
  position: absolute;
  height: 100%;
  background: #222; /* Very Dark Grey/Ghost bar */
  border-right: 1px solid #333;
  z-index: 2;
}

.bar-focus {
  position: absolute;
  height: 100%;
  background: #fff;
  box-shadow: 0 0 10px #fff;
  z-index: 4; /* Sits on top of everything */
}

.progress-container {
  position: relative;
  height: 16px; /* FIXED HEIGHT is the key here */
  width: 100%;
  border: 1px solid #444;
  background: #111;
  overflow: hidden;
}
</style>