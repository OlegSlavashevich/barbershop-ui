import { defineStore } from 'pinia';

export const useDateStore = defineStore({
  id: 'date',
  state: () => ({
    date: '',
    time: '',
  }),
  actions: {
    selectDate(date) {
      this.date = date;
    },
    selectTime(time) {
      this.time = time;
    },
    deleteDateTime() {
      this.date = new Date()
        .toISOString()
        .substr(0, 10);
      this.time = '';
    },
  },
});
