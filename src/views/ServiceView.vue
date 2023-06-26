<template>
  <div>
    <SelectedServiceListVue />
    <ServiceAccordionVue :categories="categories" />
    <ServiceFinalAmountVue />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SelectedServiceListVue from '../components/Service/SelectedServiceList.vue';
import ServiceAccordionVue from '../components/Service/ServiceAccordion.vue';
import ServiceFinalAmountVue from '../components/Service/ServiceFinalAmount.vue';

import ServiceApi from '../api/service.api';

import { useDateStore } from '../store/date';
import { useMastersStore } from '../store/masters';

const dateStore = useDateStore();
const masterStore = useMastersStore();

const categories = ref([]);

onMounted(async () => {
  const categoriesFromApi = await ServiceApi.fetchServices({
    date: dateStore.date,
    time: dateStore.time,
    masterId: masterStore.master.id,
  });
  categories.value = categoriesFromApi;
});
</script>
