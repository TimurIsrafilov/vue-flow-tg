<script setup>
import { onMounted, nextTick, ref, watch } from 'vue';
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import Icon from './Icon.vue';
import { useEmployeesStore } from './employeesStore';
import { useLayout } from './useLayout';
import CustomNode from './CustomNode.vue';
import '@vue-flow/core/dist/style.css';

const employeesStore = useEmployeesStore();
const nodes = ref(employeesStore.nodes);
const edges = ref(employeesStore.edges);

const { layout } = useLayout();
const { fitView } = useVueFlow();

const direction = ref('LR');

async function layoutGraph(newDirection) {
  direction.value = newDirection;
  nodes.value = layout(nodes.value, edges.value, newDirection);

  await nextTick();
  fitView({ includeEdges: true });
}

const isHidden = ref(false);
const bossIds = ref([]);

const hideNodesByBossId = (id) => {
  if (bossIds.value.includes(id)) {
    bossIds.value = bossIds.value.filter((bossId) => bossId !== id);
  } else {
    bossIds.value = [...bossIds.value, id];
  }
};

watch([isHidden, bossIds], () => {
  const hiddenNodes = new Set();

  function hideChildren(parentId) {
    nodes.value.forEach((node) => {
      if (node.data.bossId === parentId && !hiddenNodes.has(node.id)) {
        hiddenNodes.add(node.id);
        hideChildren(node.id);
      }
    });
  }

  bossIds.value.forEach((bossId) => hideChildren(bossId));

  nodes.value = nodes.value.map((node) => ({
    ...node,
    hidden: isHidden.value || hiddenNodes.has(node.id),
  }));

  edges.value = edges.value.map((edge) => ({
    ...edge,
    hidden: isHidden.value || hiddenNodes.has(edge.target),
  }));

  const visibleNodes = nodes.value.filter((node) => !hiddenNodes.has(node.id));
  const updatedNodes = layout(visibleNodes, edges.value, direction.value);

  nodes.value = nodes.value.map((node) => {
    if (hiddenNodes.has(node.id)) {
      return node;
    } else {
      const updatedNode = updatedNodes.find(
        (updated) => updated.id === node.id
      );
      return updatedNode ? updatedNode : node;
    }
  });
});
</script>

<template>
  <div class="layout-flow">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      @nodes-initialized="layoutGraph(direction)"
    >
      <template #node-custom="{ data }">
        <CustomNode
          v-bind="data"
          :direction="direction"
          :hide-nodes="hideNodesByBossId"
        />
      </template>

      <Background />
      <Panel class="process-panel" position="top-right">
        <div class="layout-panel">
          <button title="set horizontal layout" @click="layoutGraph('LR')">
            <Icon name="horizontal" />
          </button>

          <button title="set vertical layout" @click="layoutGraph('TB')">
            <Icon name="vertical" />
          </button>
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<style>
.layout-flow {
  background-color: #1a192b;
  height: 100%;
  width: 100%;
}

.process-panel,
.layout-panel {
  display: flex;
  gap: 10px;
}

.process-panel {
  background-color: #2d3748;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.process-panel button {
  border: none;
  cursor: pointer;
  background-color: #4a5568;
  border-radius: 8px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.process-panel button {
  font-size: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-panel {
  display: flex;
  align-items: center;
  gap: 10px;
}

.process-panel button:hover,
.layout-panel button:hover {
  background-color: #2563eb;
  transition: background-color 0.2s;
}

.process-panel label {
  color: white;
  font-size: 12px;
}

.stop-btn svg {
  display: none;
}

.stop-btn:hover svg {
  display: block;
}

.stop-btn:hover .spinner {
  display: none;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
