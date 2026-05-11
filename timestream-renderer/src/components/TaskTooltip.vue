<script setup lang="ts">
import type { Task } from '../types';

defineProps<{
  task: Task;
}>();

defineEmits(['close']);

</script>

<template>
  <div class="task-tooltip-modal" @click.self="$emit('close')">

    <div class="task-tooltip-content">

        <div class="tooltip-header">
            <span>[PROTOCOL]: {{ task.name }}</span>
            <button class="close-btn" @click="$emit('close')">X</button>
        </div>

        <div class="tooltip-section">
            <div class="section-label">[NARRATIVE]</div>
            <p class="description">{{ task.description }}</p>
        </div>

        <div class="tooltip-section">
            <div class="section-label">[METRICS]</div>
            <div>ENTROPY: {{  task.entropyWeight.toFixed(1) }}/s</div>
            <div>BASE XP: {{  task.xpPerSec }}/s</div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.task-tooltip-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-tooltip-content {
    background: var(--color-panel-dark);
    border: 2px solid var(--color-focus-white);
    padding: 1rem;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.tooltip-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: var(--color-accent-blue);
    font-weight: bold;
    border-bottom: 1px solid var(--color-panel-mid);
    padding-bottom: 0.5rem;
}

.close-btn {
    background: transparent;
    border: 1px solid var(--color-text-dim);
    color: var(--color-text-dim);
    padding: 0;
    min-width: 30px;
    min-height: 30px;
    cursor: pointer;
}

.close-btn:hover {
    color: var(--color-warning);
    border-color: var(--color-warning);
}

.tooltip-section {
    margin-bottom: 1rem;
}

.section-label {
    color: var(--color-text-dim);
    font-size: 0.8rem;
    margin-bottom: 0.25rem;
}

.description {
    color: var(--color-text-bright);
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0;
}

</style>