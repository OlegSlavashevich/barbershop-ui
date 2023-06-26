<template>
  <v-list>
    <div v-for="service in props.services" :key="service._id" multiple>
      <ServiceItemVue :service="service"/>
    </div>
  </v-list>
</template>

<script setup>
import ServiceItemVue from './ServiceItem.vue';

const props = defineProps({
  services: Array,
});
</script>
