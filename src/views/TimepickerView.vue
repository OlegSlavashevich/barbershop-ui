<template>
  <div class="mt-8 mb-4 mx-4 grid grid-cols-4 gap-4">
    <div
      v-for="time in freeTime"
      :key="time"
      class="flex items-center justify-center rounded border text-sm"
    >
      <button class="w-full h-8" @click="handleSelectTime(time)">
        {{ time }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DatetimeApi from '@/api/datetime.api';
import { useRouter } from 'vue-router';

import { useDateStore } from '../store/date';
import { useServicesStore } from '../store/services';
import { useMastersStore } from '../store/masters';

const router = useRouter();

const dateStore = useDateStore();
const masterStore = useMastersStore();
const servicesStore = useServicesStore();

const freeTime = ref([]);

const handleSelectTime = (time) => {
  dateStore.selectTime(time);
  router.push('/');
};

onMounted(async () => {
  if (!dateStore.date) {
    alert('Pleese choose date');
    router.push('/datepicker');
    return;
  }

  freeTime.value = await DatetimeApi.fetchExcludedTimes({
    masterId: masterStore.master.id,
    services: servicesStore.services,
    date: dateStore.date,
  });
});
</script>
