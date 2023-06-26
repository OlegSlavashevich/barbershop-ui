<template>
  <v-list-item @click="handleServiceClick(service)" :disabled="service.invalid">
    <v-list-item-action>
      <v-checkbox v-model="active" :disabled="service.invalid"></v-checkbox>
    </v-list-item-action>

    <v-list-item-header class="ml-4">
      <v-list-item-title>{{ service.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ service.price }}</v-list-item-subtitle>
    </v-list-item-header>
  </v-list-item>
</template>

<script setup>
import { computed } from 'vue';

import { useServicesStore } from '../../store/services';

const servicesStore = useServicesStore();

const props = defineProps({
  service: Object,
});

const active = computed(
  () => !!servicesStore.services.find(
    (selectedService) => props.service._id === selectedService._id,
  ),
);

const handleServiceClick = (service) => {
  if (active.value) {
    servicesStore.deleteService(service._id);
    return;
  }
  servicesStore.selectService(service);
};
</script>
