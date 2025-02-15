import { defineStore } from 'pinia';
import { mockUsers } from './mockUsers';
import { ref } from 'vue';

export const useEmployeesStore = defineStore('mainStore', () => {
  const initialNodes = [];
  const initialEdges = [];

  mockUsers.forEach((item) => {
    initialNodes.push({
      id: item.id.toString(),
      position: { x: 0, y: 0 },
      type: 'custom',
      data: {
        id: `${item.id}`,
        name: `${item.first_name} ${item.last_name}`,
        photo: `https://randomuser.me/api/portraits/${item.gender}/${item.id}.jpg`,
        position: item.position,
        grade: item.grade,
        bossId: `${item.bossId || 'null'}`,
      },
    });

    if (item.bossId !== null) {
      initialEdges.push({
        id: `e${item.id}-${item.bossId}`,
        source: `${item.id}`,
        target: `${item.bossId}`,
      });
    }
  });

  const nodes = ref(initialNodes);
  const edges = ref(initialEdges);

  return {
    nodes,
    edges,
  };
});
