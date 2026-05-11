<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  stability: number;
  isPaused: boolean;
  timeInLoop: number;
  entropyRate: number;
}>();

const emit = defineEmits<{
  (e: 'pause-toggle'): void;
  (e: 'menu-toggle'): void;
}>();

const formattedTime = computed(() => {
  // Simple "Loop Timer" for the Hartnell MVP
  const mins = Math.floor(props.timeInLoop / 60);
  const secs = Math.floor(props.timeInLoop % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
});
</script>

<template>
  <header class="tardis-header">
    <div class="stats-group">
      <div class="stat">
        <span class="label">TIMELINE</span>
        <span class="value">{{ formattedTime }}</span>
      </div>
      <div class="stat">
        <span class="label">STABILITY</span>
        <span class="value">{{ stability.toFixed(1) }}%</span>
      </div>
      <div class="stat">
        <span class="label">ENTROPY RATE</span>
        <span class="value">{{ entropyRate.toFixed(2) }}%/s</span>
      </div>
    </div>
    <div class="controls-group">
      <button 
        :class="{ active: isPaused }" 
        class="stasis-btn" 
        @click="emit('pause-toggle')"
        >
        {{ isPaused ? 'RESUME FLOW' : 'STASIS' }}
      </button>
      <button class="stasis-btn" @click="emit('menu-toggle')">SYSTEM</button>
    </div>
  </header>
</template>

<style scoped>

.stasis-btn {
  background: transparent;
  color: var(--color-text-dim);
  border: var(--border-standard);
  padding: var(--space-xs) 0;
  width: 128px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-family: inherit
}

.stasis-btn.active {
  background: var(--color-focus-white);
  color: var(--color-vortex-black);
  border-color: var(--color-focus-white);
  box-shadow: var(--glow-active);
}

.tardis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: var(--color-panel-dark);
  border-bottom: 2px solid var(--color-panel-light);
  padding: var(--space-sm) var(--container-padding);;
  font-family: var(--font-technical);
  gap: var(--space-md)
}

.stats-group {
  display: flex;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.controls-group {
  display: flex;
  gap: var(--space-sm);
}

.stat { display: flex; flex-direction: column; align-items: center; }
.mini-bar { width: 100px; height: 4px; background: var(--color-panel-mid); margin-top: var(--space-xs); }
.fill { height: 100%; background: var(--color-text-bright); }

/* Inside GameHeader.vue <style> */
.label { 
  font-size: 0.75rem; 
  color: var(--color-text-mid); /* Much more readable */
  text-transform: uppercase;
  letter-spacing: 1px;
}
.value { 
  font-size: 1.2rem; 
  color: var(--color-text-bright); 
  font-weight: bold;
  text-shadow: 0 0 8px rgba(255,255,255,0.2); 
}

@media (max-width: 600px) {
  .tardis-header { 
    flex-direction: column; 
    padding: 15px 10px;
    gap: 20px;
  }

  .stats-group { 
    width: 100%;
    justify-content: space-around;
    gap: 10px; 
  }

  .controls-group { 
    width: 100%;
    justify-content: stretch;
    gap: 15px; 
  }

  .stasis-btn { 
    width: auto; 
    font-size: 0.8rem; 
    flex: 1;
  }

  .label { font-size: 0.65rem; }
  .value { font-size: 1rem; }
}
</style>