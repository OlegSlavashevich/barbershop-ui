<template>
  <Datepicker
    :modelValue="date"
    @update:modelValue="handleSelectDate"
    :minDate="minDate"
    :allowedDates="allowedDates.dates"
  >
  </Datepicker>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DatetimeApi from '@/api/datetime.api';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import { useDateStore } from '../store/date';
import { useServicesStore } from '../store/services';
import { useMastersStore } from '../store/masters';

const router = useRouter();

const dateStore = useDateStore();
const masterStore = useMastersStore();
const servicesStore = useServicesStore();

const dateString = (date) => new Date(
  date - new Date().getTimezoneOffset() * 60000,
).toISOString().substr(0, 10);

const minDate = new Date().toISOString().substr(0, 10);

const allowedDates = ref([]);

onMounted(async () => {
  allowedDates.value = await DatetimeApi.fetchAllowedDates({
    masterId: masterStore.master.id,
    services: servicesStore.services,
  });
});

const handleSelectDate = (date) => {
  dateStore.selectDate(dateString(date));
  router.push('/datepicker/timepicker');
};
</script>
