import { defineStore } from 'pinia';

export const useMastersStore = defineStore({
  id: 'masters',
  state: () => ({
    master: {
      id: '',
      name: '',
    },
  }),
  actions: {
    selectMaster(master) {
      this.master = master;
    },
    deleteMaster() {
      this.master = {
        id: '',
        name: '',
      };
    },
  },
});
