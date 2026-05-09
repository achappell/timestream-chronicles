<script setup lang="ts">
import { computed } from 'vue';
import ProgressBar from './ProgressBar.vue';

// 1. Define the props
const props = defineProps<{
  skill: {
    name: string;
    permanentMastery: number;
    currentFocus: number;
    focusXP: number;
  }
}>();

// 2. Define the computed math for the bars
// We use 100 as the base XP for Focus levels in the MVP
const focusProgress = computed(() => (props.skill.focusXP % 100));

// Mastery Progress - each level is 5% of the bar width
const masteryProgress = computed(() => Math.min(props.skill.permanentMastery * 5, 100));
</script>

<template>
  <div class="skill-card">
    <div class="card-top">
      <span class="skill-icon">⌬</span>
      <span class="skill-name">{{ skill.name }}</span>
      <span class="multiplier">× {{ (1 + skill.permanentMastery * 0.1).toFixed(2) }}</span>
    </div>
    <div class="bars-container">
    <ProgressBar 
      :progress="masteryProgress" 
      label="MST" 
      variant="secondary"
    />
    <ProgressBar 
      :progress="focusProgress" 
      label="FCS" 
      variant="primary"
    />
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  background: var(--color-panel-dark); /* Slightly lighter background */
  border: var(--border-standard);
  width: 240px; /* Bit more width for text breathing room */
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: var(--shadow-elevation);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-subtle);
  padding-bottom: 6px;
}

.skill-name { 
  color: var(--color-text-bright); 
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
}

.multiplier { 
  background: var(--color-focus-white); 
  color: var(--color-vortex-black);
  padding: 1px 5px;
  font-size: 0.7rem;
  font-weight: bold;
}

.bars-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-vortex-black); /* Deep black for the "Empty" part */
  border: var(--border-standard);
  overflow: hidden;
}
</style>