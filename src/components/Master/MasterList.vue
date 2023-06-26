<template>
  <v-list subheader>
    <div v-for="master in props.masters" :key="master.title">
      <MasterItemVue :master="master"/>
    </div>
  </v-list>
</template>

<script setup>
import MasterItemVue from './MasterItem.vue';

const props = defineProps({
  masters: Array,
});
</script>
