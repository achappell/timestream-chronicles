<script setup lang="ts">

import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'save'): void;
  (e: 'hard-reset'): void;
  (e: 'import-save', payload: string): void;
  (e: 'export-save'): void;
}>();

const handleExport = () => {
  emit('export-save');
};

const isImporting = ref(false);
const importString = ref('');

const processImport = () => {
  if (importString.value.trim()) {
    emit('import-save', importString.value.trim());
    isImporting.value = false;
  } else {
    alert('PLEASE ENTER A VALID TIMELINE STRING TO IMPORT');
  }
};

</script>

<template>
    <div class="system-panel">
        <h3>SYSTEM CONTROL PROTOCOLS</h3>
        <div v-if="!isImporting" class="control-grid">
            <button @click="$emit('save')">MANUAL MATERIALIZATION (SAVE)</button>
            <button @click="handleExport">EXPORT TIMELINE (STRING)</button>
            <button @click="isImporting = true">IMPORT TIMELINE (STRING)</button>
            <button class="danger" @click="$emit('hard-reset')">HARD RESET TIMELINE</button>
        </div>

        <div v-else class="import-console">
            <textarea v-model="importString" placeholder="PASTE TIMELINE DATA HERE..."></textarea>
            <div class="import-actions">
                <button @click="processImport">PASTE & IMPORT</button>
                <button @click="isImporting = false">CANCEL</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.system-panel {
  position: absolute;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-panel-dark);
  border: var(--border-active);
  padding: var(--space-lg);
  z-index: 1000;
  width: 400px;
  box-shadow: var(--glow-active);
  gap: var(--space-md);
}

.control-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

.control-grid button {
  background: var(--color-panel-mid);
  color: var(--color-text-bright);
  border: var(--border-standard);
  padding: var(--space-sm) var(--space-md);
  cursor: pointer;
  transition: var(--transition-smooth);
  font-family: var(--font-technical)
}

.control-grid button:hover {
  background: var(--color-panel-light);
  border-color: var(--color-focus-white);  
}

.control-grid button.danger:hover {
  background: var(--color-warning-bg);
  border-color: var(--color-warning);
}

.h3 {
  color: var(--color-text-dim);
  font-family: var(--font-technical);
  margin-bottom: 15px;
  font-size: 0.8rem;
  letter-spacing: 2px;
}

.import-console textarea {
  width: 100%;
  height: 100px;
  background: var(--color-vortex-black);
  border: var(--border-standard);
  color: var(--color-accent-blue);
  padding: var(--space-sm);
  font-family: var(--font-technical);
  resize: none;
  margin-bottom: var(--space-sm);
  box-sizing: border-box;
  outline: none;
}

.import-console textarea:focus {
  border-color: var(--color-focus-white);
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
}

.import-console .import-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}

</style>