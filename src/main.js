import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import './assets/tailwind.css';

loadFonts();

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app');
