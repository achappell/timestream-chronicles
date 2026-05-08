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
    <button 
      :class="{ active: isPaused }" 
      class="stasis-btn" 
      @click="emit('pause-toggle')"
      >
      {{ isPaused ? 'RESUME FLOW' : 'STASIS' }}
    </button>
  </header>
</template>

<style scoped>

.stasis-btn {
  background: transparent;
  color: #555;
  border: 1px solid #555;
  padding: 5px 0;
  width: 120px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-family: inherit
}

.stasis-btn.active {
  background: #fff;
  color: #000;
  border-color: #fff;
  box-shadow: 0 0 20px #fff;
}

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