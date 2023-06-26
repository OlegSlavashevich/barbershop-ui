<template>
  <v-app>
    <v-main>
      <div class="pointer-events-none fixed inset-y-0 flex max-w-full">
        <div class="pointer-events-auto relative w-screen">
          <div class="flex h-full flex-col bg-white pb-14 shadow-xl">
              <HeaderVue />
              <div class="mt-28 overflow-y-auto">
                <router-view />
              </div>
              <FooterVue />
            </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderVue from './components/Header/Header.vue';
import FooterVue from './components/Footer/Footer.vue';
</script>

<style>
html {
  overflow: hidden;
}
</style>
