<script setup lang="ts">
import { computed } from 'vue';
import ProgressBar from './ProgressBar.vue';
import BaseTooltip from './BaseTooltip.vue';

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

// --- COMPOUNDING MULTIPLIERS (1.01^MST and 1.05^FCS) ---
const mstMult = computed(() => Math.pow(1.01, props.skill.permanentMastery));
const fcsMult = computed(() => Math.pow(1.05, props.skill.currentFocus));
const totalMult = computed(() => (mstMult.value * fcsMult.value).toFixed(2));

const fcsXpTotal = computed(() => (props.skill.currentFocus + 1) * 100);
const masteryXpTotal = computed(() => (props.skill.permanentMastery + 1) * 100);

const focusProgress = computed(() => {
  const xpNeeded = (props.skill.currentFocus + 1) * 100;
  return (props.skill.focusXP / xpNeeded) * 100;
});

const masteryProgress = computed(() => {
  const xpNeeded = (props.skill.permanentMastery + 1) * 100;
  return (props.skill.masteryXP / xpNeeded) * 100;
});
</script>

<template>
  <div class="skill-card">
    <div class="card-top">
      <span class="skill-icon">⌬</span>
      <span class="skill-name">{{ skill.name }}</span>
      
      <div class="multiplier-container" tabindex="0">
        <span class="multiplier">× {{ totalMult }}</span>
        
        <BaseTooltip class="multiplier-readout" width="180px">
          <div class="tooltip-header">Mastery Diagnostics</div>
          <div class="tooltip-row">MST LVL: {{ skill.permanentMastery }}</div>
          <div class="tooltip-row">MST XP: {{ Math.floor(skill.masteryXP) }} / {{ masteryXpTotal }}</div>
          <div class="tooltip-row">MST MULT: {{ mstMult.toFixed(2) }}x</div>
          
          <div class="tooltip-divider"></div>
          
          <div class="tooltip-header">Focus Diagnostics</div>
          <div class="tooltip-row">FCS LVL: {{ skill.currentFocus }}</div>
          <div class="tooltip-row">FCS XP: {{ Math.floor(skill.focusXP) }} / {{ fcsXpTotal }}</div>
          <div class="tooltip-row">FCS MULT: {{ fcsMult.toFixed(2) }}x</div>
          
          <div class="tooltip-divider"></div>
          
          <div class="tooltip-row" style="color: var(--color-text-bright); font-weight: bold;">
            TOTAL: {{ totalMult }}x
          </div>
        </BaseTooltip>
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
  background: var(--color-panel-dark);
  border: var(--border-standard);
  width: 100%;
  max-width: 300px;
  padding: var(--panel-padding);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  box-shadow: var(--shadow-elevation);
  padding-bottom: var(--space-xs);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-subtle);
  padding-bottom: var(--space-xs);
}

.skill-name { 
  color: var(--color-text-bright); 
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
}

.multiplier-container {
  position: relative;
  display: flex;
  align-items: center;
  cursor: help;
}

.multiplier { 
  background: var(--color-focus-white); 
  color: var(--color-vortex-black);
  padding: 2px var(--space-sm);
  font-size: 0.75rem;
  font-weight: bold;
}

.bars-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-vortex-black);
  border: var(--border-standard);
  overflow: hidden;
}

/* Tooltip Trigger Logic */
.multiplier-readout {
  display: none !important;
}

/* For SkillCard, we want it on the right to stay inside the card footprint */
.multiplier-readout :deep(.base-tooltip) {
  left: auto;
  right: 0;
}

.multiplier-container:hover .multiplier-readout,
.multiplier-container:focus .multiplier-readout,
.multiplier-container:focus-within .multiplier-readout {
  display: block !important;
}
</style>
