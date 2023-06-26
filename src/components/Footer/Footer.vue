<template>
  <div
    class="absolute
      bottom-0 left-0 z-10 flex w-full h-14 items-center px-8 justify-between border-t-2 bg-white"
  >
    <router-link :to="'/'">
      <div class="flex justify-center mt-1">
        <v-icon> mdi-border-color </v-icon>
      </div>
      <div class="text-sm text-black">Запись</div>
    </router-link>
    <router-link :to="'/profile'">
      <div class="flex justify-center mt-1">
        <v-icon> mdi-account </v-icon>
      </div>
      <div class="text-sm text-black">Профиль</div>
    </router-link>
    <router-link :to="'/about'">
      <div class="flex justify-center mt-1">
        <v-icon> mdi-information-outline </v-icon>
      </div>
      <div class="text-sm text-black">О нас</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>
