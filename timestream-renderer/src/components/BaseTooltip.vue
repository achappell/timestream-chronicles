<script setup lang="ts">
defineProps<{
  width?: string
}>();
</script>

<template>
  <div class="base-tooltip" :style="{ width: width }">
    <slot />
  </div>
</template>

<style scoped>
.base-tooltip {
  /* SHARED POSITIONING - Default to top/left but allow override */
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2000;
  margin-top: var(--space-xs);
  
  /* SHARED AESTHETIC */
  background: var(--color-vortex-black) !important;
  border: 1px solid var(--color-focus-white);
  padding: var(--space-sm);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  font-family: var(--font-technical);
  pointer-events: none;
  text-align: left;
}

:deep(.tooltip-header) {
  color: var(--color-accent-blue);
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: var(--space-xs);
  border-bottom: 1px solid var(--color-panel-mid);
  text-transform: uppercase;
  display: block;
}

:deep(.tooltip-row) {
  font-size: 0.75rem;
  color: var(--color-text-mid);
  margin-bottom: 2px;
  display: block;
}

:deep(.tooltip-divider) {
  height: 1px;
  background: var(--color-panel-mid);
  margin: var(--space-xs) 0;
}
</style>
