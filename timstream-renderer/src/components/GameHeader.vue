<script setup lang="ts">
import { computed } from 'vue';

// 1. Define the props so the template can see 'energy' and 'maxEnergy'
const props = defineProps<{
  energy: number;
  maxEnergy: number;
}>();

// 2. Create the formattedTime logic
const formattedTime = computed(() => {
  // Simple "Loop Timer" for the Hartnell MVP
  // Converts energy remaining into a mock "Time" format
  const totalSeconds = Math.floor(props.energy / 10); 
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
});
</script>

<template>
  <header class="tardis-header">
    <div class="stat">
      <span class="label">TIMELINE</span>
      <span class="value">{{ formattedTime }}</span>
    </div>
    <div class="stat energy-stat">
      <span class="label">ARTRON ENERGY</span>
      <span class="value">{{ Math.floor(energy) }} / {{ maxEnergy }}</span>
      <div class="mini-bar">
        <div class="fill" :style="{ width: (energy / maxEnergy) * 100 + '%' }"></div>
      </div>
    </div>
    <div class="stat">
      <span class="label">STABILITY</span>
      <span class="value">98.2%</span>
    </div>
  </header>
</template>

<style scoped>
.tardis-header {
  display: flex;
  justify-content: space-around;
  background: #111;
  border-bottom: 2px solid #333;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
}
.stat { display: flex; flex-direction: column; align-items: center; }
.mini-bar { width: 100px; height: 4px; background: #222; margin-top: 4px; }
.fill { height: 100%; background: #fff; }

/* Inside GameHeader.vue <style> */
.label { 
  font-size: 0.65rem; 
  color: #aaa; /* Much more readable */
  text-transform: uppercase;
  letter-spacing: 1px;
}
.value { 
  font-size: 1.2rem; 
  color: #fff; 
  font-weight: bold;
  text-shadow: 0 0 8px rgba(255,255,255,0.2); 
}
</style>