<template>
  <div class="mx-8 mt-8">
    <div>
      <h1 class="text-lg">Детали заказа:</h1>
      <div class="text-sm mt-2">Услуги: {{ serviceNames }}</div>
      <div class="mt-2 text-sm">Сотрудник: {{ masterStore.master.name }}</div>
      <div class="mt-2 text-sm">Дата и время: {{ dateStore.date }}, {{ dateStore.time }}</div>
    </div>
    <div class="mt-4">Контактные данные:</div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="name"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="phoneNumber"
        label="Phone Number"
        required
      ></v-text-field>
      <v-btn class="mr-4 mt-4 submit-button" type="submit"> Записаться </v-btn>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BookingApi from '@/api/booking.api';
import { useRouter } from 'vue-router';

import { useDateStore } from '../store/date';
import { useServicesStore } from '../store/services';
import { useMastersStore } from '../store/masters';

const router = useRouter();

const dateStore = useDateStore();
const masterStore = useMastersStore();
const servicesStore = useServicesStore();

const name = ref('');
const phoneNumber = ref('');

const allDataIsFieldIn = computed(() => dateStore.date
  && dateStore.time
  && masterStore.master.id
  && servicesStore.services.length);

const serviceNames = computed(() => servicesStore.services.map((service) => service.name).join(', '));

onMounted(() => {
  if (!allDataIsFieldIn.value) {
    alert('Please fill all fields');
    router.push('/');
  }
});

const submit = async () => {
  if (name.value && phoneNumber.value) {
    const bookingInfo = {
      client: {
        name: name.value,
        phone: phoneNumber.value,
      },
      reception: {
        date: dateStore.date,
        startTime: dateStore.time,
        masterId: masterStore.master.id,
        services: servicesStore.services.map((service) => service._id),
      },
    };
    const result = await BookingApi.booking(bookingInfo);
    if (result.success) {
      dateStore.deleteDateTime();
      masterStore.deleteMaster();
      servicesStore.deleteAllServices();
      // eslint-disable-next-line no-alert
      alert('Reception was added');
      router.push('/');
    } else {
      alert(result.message);
    }
  } else {
    alert('Please fill all fields');
  }
};
</script>

<style scoped>
.submit-button {
  width: 100%
}
</style>
