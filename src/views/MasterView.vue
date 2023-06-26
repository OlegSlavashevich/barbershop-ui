<template>
  <MasterListVue v-if="masters.length" :masters="masters" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MasterApi from '../api/master.api';
import MasterListVue from '../components/Master/MasterList.vue';

import { useDateStore } from '../store/date';
import { useServicesStore } from '../store/services';

const dateStore = useDateStore();
const servicesStore = useServicesStore();

const masters = ref([]);

onMounted(async () => {
  const mastersFromApi = await MasterApi.fetchMasters({
    services: servicesStore.services,
    date: dateStore.date,
    time: dateStore.time,
  });
  masters.value = mastersFromApi;
});
</script>
