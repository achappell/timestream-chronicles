<script setup lang="ts">
import { computed } from 'vue';

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
        <div class="lane-label">MST</div>
        <div class="bar-mastery" :style="{ width: masteryProgress + '%' }"></div>
  
        <div class="lane-label bottom">FCS</div>
        <div class="bar-focus" :style="{ width: focusProgress + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  background: #1a1a1a; /* Slightly lighter background */
  border: 1px solid #444;
  width: 240px; /* Bit more width for text breathing room */
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 6px;
}

.skill-name { 
  color: #fff; 
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
}

.multiplier { 
  color: #000; 
  background: #fff; /* High-contrast badge */
  padding: 1px 5px;
  font-size: 0.7rem;
  font-weight: bold;
}

.bars-container {
  width: 100%;
  height: 32px; /* Taller for better label visibility */
  background: #050505; /* Deep black for the "Empty" part */
  border: 1px solid #555;
  position: relative;
  overflow: hidden;
}

/* Labels: MST and FCS */
.lane-label {
  position: absolute;
  left: 6px;
  font-size: 0.6rem;
  font-weight: 900;
  z-index: 10;
  color: #fff; /* White text on dark bars */
  text-shadow: 1px 1px 2px #000; /* Shadow ensures it's readable on white bars too */
  pointer-events: none;
  line-height: 16px;
}
.lane-label.bottom { bottom: 0; }

.bar-mastery {
  position: absolute;
  top: 0; left: 0;
  height: 16px;
  background: #666; /* Brightened the grey */
  border-bottom: 1px solid #333;
  transition: width 0.3s ease;
}

.bar-focus {
  position: absolute;
  bottom: 0; left: 0;
  height: 16px;
  background: #fff;
  box-shadow: 0 0 10px rgba(255,255,255,0.5);
}
</style>