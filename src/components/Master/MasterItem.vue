<template>
  <div class="my-2">
    <v-list-item :disabled="props.master.invalid" @click="handleMasterClick(props.master)">
      <v-list-item-avatar :size="60">
        <v-img :alt="`${props.master.name} avatar`" :src="props.master.photo"></v-img>
      </v-list-item-avatar>

      <v-list-item-header class="ml-4">
        <v-list-item-title
          :class="{ 'line-through': props.master.invalid }"
          v-text="props.master.name"
        ></v-list-item-title>
        <h4 class="text-sm text-gray-500">Барбер</h4>
      </v-list-item-header>
    </v-list-item>
    <div v-if="!dateStore.time && !props.master.invalid">
      <div class="text-sm mt-1 mx-4 text-gray-500">
        Ближайшее время для записи на {{ freeDateText }}:
      </div>
      <div class="mt-2 mb-4 mx-4 grid grid-cols-4 gap-4 sm:grid-cols-6">
        <div
          v-for="time in freeTime"
          :key="time"
          class="flex items-center justify-center rounded border text-sm"
        >
          <button class="w-full h-8" @click="handleSelectDateTime(time, props.master)">
            {{ time }}
          </button>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MasterApi from '../../api/master.api';

import { useDateStore } from '../../store/date';
import { useMastersStore } from '../../store/masters';
import { useServicesStore } from '../../store/services';

const dateStore = useDateStore();
const servicesStore = useServicesStore();
const masterStore = useMastersStore();

const router = useRouter();

const props = defineProps({
  master: {
    name: String,
    photo: String,
  },
});

const freeTime = ref([]);
const freeDate = ref('');

const freeDateText = computed(() => (freeDate.value === new Date().toISOString().substr(0, 10) ? 'сегодня' : freeDate.value));

const handleMasterClick = (master) => {
  masterStore.selectMaster({
    id: master._id,
    name: master.name,
  });
  router.push('/');
};

const handleSelectDateTime = (time, master) => {
  dateStore.selectDate(freeDate.value);
  dateStore.selectTime(time);
  handleMasterClick(master);
};

onMounted(async () => {
  if (dateStore.time || props.master.invalid) return;

  const result = await MasterApi.fetchMasterNearestReceptions({
    masterId: props.master._id,
    services: servicesStore.services,
  });

  freeTime.value = result.data[0].times;
  freeDate.value = result.data[0].date;
});
</script>
