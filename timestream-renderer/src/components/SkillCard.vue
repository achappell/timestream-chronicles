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
    masteryXP: number; 
  }
}>();

const mstMult = computed(() => 1 + props.skill.permanentMastery * 0.1);
const fcsMult = computed(() => 1 + props.skill.currentFocus * 0.05);
const totalMult = computed(() => (mstMult.value * fcsMult.value).toFixed(2));

const fcsXpTotal = computed(() => (props.skill.currentFocus + 1) * 100);
const masteryXpTotal = computed(() => (props.skill.permanentMastery + 1) * 100);

// We use 100 as the base XP for Focus levels in the MVP
const focusProgress = computed(() => {
  const xpNeeded = (props.skill.currentFocus + 1) * 100; // XP needed for next focus level
  return (props.skill.focusXP / xpNeeded) * 100;
});

// Mastery Progress - each level is 5% of the bar width
const masteryProgress = computed(() => Math.min(props.skill.permanentMastery * 5, 100));
</script>

<template>
  <div class="skill-card">
    <div class="card-top">
      <span class="skill-icon">⌬</span>
      <span class="skill-name">{{ skill.name }}</span>
      <div class="multiplier-container">
        <span class="multiplier">× {{ totalMult }}</span>
        <div class="multiplier-tooltip">
          <div class="tooltip-header">Mastery Diagnostics</div>
          <div class="tooltip-row">MST LVL: +{{ skill.permanentMastery }}</div>
          <div class="tooltip-row">MST XP: {{ Math.floor(skill.masteryXP) }} / {{ masteryXpTotal }}</div>
          <div class="tooltip-row">MST MULT: {{ mstMult .toFixed(2) }}</div>
          <div class="tooltip-divider"></div>
          <div class="tooltip-header">Focus Diagnostics</div>
          <div class="tooltip-row">FCS LVL: +{{ skill.currentFocus }}</div>
          <div class="tooltip-row">FCS XP: {{ Math.floor(skill.focusXP) }} / {{ fcsXpTotal }}</div>
          <div class="tooltip-row">FCS MULT: {{ fcsMult .toFixed(2) }}</div>
          <div class="tooltip-divider"></div>
          <div class="tooltip-row total">TOTAL: {{ totalMult }}x</div>
        </div>
      </div>
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
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
}

.multiplier { 
  background: var(--color-focus-white); 
  color: var(--color-vortex-black);
  padding: 2px 6px;
  font-size: 0.75rem;
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

.multiplier-container {
  position: relative;
  cursor: help;
}

.multiplier-tooltip {
  position: absolute;
  display: none;
  top: 100%;
  right: 0;
  z-index: 10;
  background: var(--color-vortex-black);
  border: var(--border-active);
  padding: 8px;
  font-family: var(--font-technical);
  min-width: 160px;
  box-shadow: var(--shadow-elevation);
  margin-top: 8px;
}

.multiplier-container:hover .multiplier-tooltip {
  display: block;
}

.tooltip-header {
  font-size: 0.7rem;
  color: var(--color-accent-blue);
  margin-bottom: 4px;
  text-transform: uppercase;
}

.tooltip-row {
  font-size: 0.75rem;
  color: var(--color-text-mid);
}

.tooltip-divider {
  border-top: var(--border-subtle);
  margin: 4px 0;
}

.tooltip-row.total {
  color: var(--color-text-bright);
  font-weight: bold;
}
</style>