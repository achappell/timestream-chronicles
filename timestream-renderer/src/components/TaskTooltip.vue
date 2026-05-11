<script setup lang="ts">
import type { Task } from '../types';
import BaseTooltip from './BaseTooltip.vue';

defineProps<{
  task: Task;
}>();
</script>

<template>
  <BaseTooltip class="task-readout" width="240px">
    <div class="tooltip-header">[PROTOCOL]: {{ task.name }}</div>
    
    <div class="tooltip-row">
      <div style="color: var(--color-text-dim); font-size: 0.7rem;">[NARRATIVE]</div>
      <p style="margin: 0; line-height: 1.2; color: var(--color-text-bright);">{{ task.description }}</p>
    </div>

    <div class="tooltip-divider"></div>

    <div class="tooltip-header" style="border: none; margin-bottom: 0;">[METRICS]</div>
    <div class="tooltip-row">ENTROPY: {{ task.entropyWeight.toFixed(1) }}/s</div>
    <div class="tooltip-row">BASE XP: {{ task.xpPerSec }}/s</div>

    <template v-if="task.rewards || task.requiredItemId">
      <div class="tooltip-divider"></div>
      <div class="tooltip-header" style="border: none; margin-bottom: 0;">[CARGO]</div>
      <div v-if="task.requiredItemId" class="tooltip-row">
        REQ: {{ task.requiredItemId.toUpperCase() }}
      </div>
      <div v-for="reward in task.rewards" :key="reward.itemId" class="tooltip-row">
        YIELD: {{ reward.itemId.toUpperCase() }} ({{ reward.chance * 100 }}%)
      </div>
    </template>
  </BaseTooltip>
</template>
