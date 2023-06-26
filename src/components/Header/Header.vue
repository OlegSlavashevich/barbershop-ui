<template>
  <div class="absolute w-full z-10 bg-grey h-28">
    <div class="flex bg-grey relative justify-center py-4 sm:px-6">
      <button
        @click="hasHistory() ? $router.go(-1) : $router.push('/')"
        class="absolute left-6"
        v-if="routerPath !== '/'"
      >
        <v-icon class="back-icon" color="white">mdi-arrow-left </v-icon>
      </button>
      <h2 class="text-lg online font-medium text-white" id="slide-over-title">Онлайн-запись</h2>
    </div>
    <div class="absolute left-4 bottom-4 barbername text-white">
        М1 Barbershop (Минск)
      </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  computed: {
    routerPath() {
      return this.$route.fullPath;
    },
  },
  methods: {
    hasHistory() { return window.history.length > 2; },
  },
};
</script>

<style scoped>
.online {
  font-weight: 500;
  font-size: 17px;
}
.barbername {
  font-weight: 500;
  font-size: 20px;
}
</style>
