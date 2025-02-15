<script setup>
import { nextTick, ref, watch } from 'vue';
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { useEmployeesStore } from './employeesStore';
import { useLayout } from './useLayout';
import CustomNode from './CustomNode.vue';
import '@vue-flow/core/dist/style.css';

const employeesStore = useEmployeesStore();
const nodes = ref(employeesStore.nodes);
const edges = ref(employeesStore.edges);

const { layout } = useLayout();
const { fitView } = useVueFlow();

const direction = ref('RL');

async function layoutGraph(direction) {
  nodes.value = layout(nodes.value, edges.value, direction);

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
    </VueFlow>
  </div>
</template>

<style>
.layout-flow {
  background-color: #1a192b;
  height: 100%;
  width: 100%;
}
</style>
