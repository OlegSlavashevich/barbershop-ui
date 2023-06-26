<template>
  <div
    v-if="totalAmount"
    class="absolute bottom-0 left-0 flex w-full h-14 items-center
      z-20 px-8 justify-between border-t-2 bg-white"
  >
    <div>Выбрано ({{ totalCount }}): {{ totalAmount }} BYN</div>
    <router-link :to="'/'"><span class="text-black">Продолжить</span></router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useServicesStore } from '../../store/services';

const servicesStore = useServicesStore();

const totalAmount = computed(() => {
  if (servicesStore.services.length === 0) return 0;
  return servicesStore.services.reduce((acc, current) => acc + parseInt(current.price, 10), 0);
});

const totalCount = computed(() => servicesStore.services.length);
</script>
