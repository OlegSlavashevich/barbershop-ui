<template>
  <div>
    <div class="my-2 mx-4 text-slate-500">Доступные сервисы:</div>
    <v-expansion-panels v-model="panel" variant="accordion" multiple class="mb-2">
      <v-expansion-panel v-for="(services, name) in props.categories" :key="name">
        <v-expansion-panel-title>{{ name }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <ServiceListVue :services="services"/>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ServiceListVue from './ServiceList.vue';

const props = defineProps({
  categories: Object,
});

const panel = ref([0]);

</script>
