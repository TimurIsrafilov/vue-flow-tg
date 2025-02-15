import { defineStore } from 'pinia';
import { mockUsers } from './mockUsers';

export const useEmployeesStore = defineStore('employees', {
  state: () => ({
    users: mockUsers,
  }),
  actions: {
    setUsers(users) {
      this.users = users;
    },
  },
  getters: {
    nodes: (state) =>
      state.users.map((user) => ({
        id: user.id.toString(),
        position: { x: 0, y: 0 },
        type: 'custom',
        data: {
          id: `${user.id}`,
          name: `${user.first_name} ${user.last_name}`,
          photo: `https://randomuser.me/api/portraits/${user.gender}/${user.id}.jpg`,
          position: user.position,
          grade: user.grade,
          bossId: `${user.bossId || 'null'}`,
        },
      })),
    edges: (state) =>
      state.users.reduce((acc, user) => {
        if (user.bossId !== null) {
          acc.push({
            id: `e${user.bossId}-${user.id}`,
            source: user.bossId.toString(),
            target: user.id.toString(),
          });
        }
        return acc;
      }, []),
  },
});
