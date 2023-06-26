import { defineStore } from 'pinia';

export const useServicesStore = defineStore({
  id: 'services',
  state: () => ({
    services: [],
  }),
  actions: {
    selectService(selectedService) {
      this.services.push(selectedService);
    },
    deleteService(id) {
      this.services = this.services.filter((service) => service._id !== id);
    },
    deleteAllServices() {
      this.services = [];
    },
  },
});
