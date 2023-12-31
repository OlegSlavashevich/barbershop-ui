<template>
  <div>
    <v-list app>
      <div>{{ user }}</div>
      <div v-for="item in items" :key="item.id">
        <v-list-item
          @click="$router.push(item.link)"
          class="py-4"
          :prepend-icon="item.icon"
          >
          <v-list-item-header>
            <v-list-item-title v-text="item.text"></v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-list-item-header>
          <v-list-item-avatar
            end
            v-if="item.showDeleteButton"
            @click.stop="item.onClickDeleteButton"
          >
            <v-btn
              variant="text"
              color="grey lighten-1"
              icon="mdi-trash-can-outline"
            ></v-btn>
          </v-list-item-avatar>
        </v-list-item>
        <v-divider class="mx-4"></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script setup>
import { computed, onMounted, watchEffect } from 'vue';
import BookingApi from '@/api/booking.api';
import { useDateStore } from '../store/date';
import { useServicesStore } from '../store/services';
import { useMastersStore } from '../store/masters';
import { useTelegram } from '../composables/useTelegram';

const dateStore = useDateStore();
const masterStore = useMastersStore();
const servicesStore = useServicesStore();

const { user, tg, queryId } = useTelegram();

const items = computed(() => [
  {
    id: 0,
    text: 'Сотрудник',
    subtitle: masterStore.master.name,
    icon: 'mdi-account-supervisor',
    link: '/master',
    showDeleteButton: !!masterStore.master.id,
    onClickDeleteButton: masterStore.deleteMaster,
  },
  {
    id: 1,
    text: 'Услуга',
    subtitle: servicesStore.services.reduce(
      (acc, service) => `${acc}${acc ? ',' : ''} ${service.name}`,
      '',
    ),
    icon: 'mdi-check',
    link: '/service',
    showDeleteButton: servicesStore.services.length > 0,
    onClickDeleteButton: servicesStore.deleteAllServices,
  },
  {
    id: 2,
    text: 'Дата и время',
    subtitle: !!dateStore.date && !!dateStore.time ? `${dateStore.date}, ${dateStore.time}` : '',
    icon: 'mdi-update',
    link: '/datepicker',
    showDeleteButton: !!dateStore.date && !!dateStore.time,
    onClickDeleteButton: dateStore.deleteDateTime,
  },
]);

const allDataIsFieldIn = computed(
  () => dateStore.date && dateStore.time && masterStore.master.id && servicesStore.services.length,
);

const submit = async () => {
  const bookingInfo = {
    queryId,
    client: {
      name: user.first_name || 'test',
      phone: user.last_name || 'test',
    },
    reception: {
      date: dateStore.date,
      startTime: dateStore.time,
      masterId: masterStore.master.id,
      services: servicesStore.services.map((service) => service._id),
    },
  };
  await BookingApi.booking(bookingInfo);
};

onMounted(() => {
  tg.MainButton.setParams({
    text: 'Забронировать',
  });

  tg.onEvent('mainButtonClicked', submit);
  return () => {
    tg.offEvent('mainButtonClicked', submit);
  };
});

watchEffect(() => {
  if (allDataIsFieldIn.value) {
    tg.MainButton.show();
  } else {
    tg.MainButton.hide();
  }
});
</script>
