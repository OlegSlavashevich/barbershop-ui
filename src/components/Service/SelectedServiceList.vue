<template>
  <v-list subheader v-if="servicesStore.services.length">
    <div class="my-2 mx-4 text-slate-500">Выбранные сервисы:</div>
    <v-list-item v-for="service in servicesStore.services" :key="service._id">
      <v-list-item-header>
        <v-list-item-title v-text="service.name"></v-list-item-title>
      </v-list-item-header>

      <v-list-item-avatar
          end
          @click.stop="servicesStore.deleteService(service._id)"
        >
          <v-btn
            variant="text"
            color="grey lighten-1"
            icon="mdi-trash-can-outline"
          ></v-btn>
        </v-list-item-avatar>
  </v-list-item>
  </v-list>
</template>

<script setup>
import { useServicesStore } from '../../store/services';

const servicesStore = useServicesStore();
</script>
