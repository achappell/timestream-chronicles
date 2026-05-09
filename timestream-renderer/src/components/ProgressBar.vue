<script setup lang="ts">
const props = defineProps<{
  progress: number; // 0 to 100
  label?: string;
  variant?: 'primary' | 'secondary';
  count?: string;
}>();
</script>

<template> 
    <div class="progress-bar">
      <div v-if="label" class="lane-label">{{ label }}</div>
      <div v-if="count" class="count-label">{{ count }}</div>
      <slot></slot>
      <div 
        class="bar-fill"
        :class="variant || 'primary'"
        :style="{ width: progress + '%' }"
      ></div>
      <div class="scanlines"></div>
    </div>
</template>

<style scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 16px; 
  background: var(--color-vortex-black); /* Solid Black */
  border: var(--border-subtle);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  position: absolute;
  transition: var(--transition-heartbeat);
}

.bar-fill.primary {
  background: var(--color-focus-white);
  box-shadow: var(--glow-primary);
}

.bar-fill.secondary {
  background: var(--color-text-dim); 
}

.lane-label {
  position: absolute;
  left: 6px;
  top: 0px;
  font-size: 0.75rem;
  font-weight: 800;
  z-index: 10;
  color: var(--color-focus-white);
  text-shadow: 1px 1px 2px #000;
  pointer-events: none;
  line-height: 16px;
}

.count-label {
  position: absolute;
  right: 6px;
  top: 0px;
  font-size: 0.75rem;
  font-weight: 800;
  z-index: 10;
  color: var(--color-text-bright);
  text-shadow: 1px 1px 2px #000;
  pointer-events: none;
  line-height: 16px;
}

.scanlines {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(255,255,255,0.05) 50%,
    rgba(255,255,255,0) 50%
    ), linear-gradient(
        90deg,
        rgba(255,0,0,0.02),
        rgba(0,255,0,0.01),
        rgba(0,0,255,0.02)
    );
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
  z-index: 5;
}

</style>