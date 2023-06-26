import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/WelcomeView.vue';
import MasterView from '../views/MasterView.vue';
import ServiceView from '../views/ServiceView.vue';
import BookingFormView from '../views/BookingFormView.vue';
import ProfileView from '../views/ProfileView.vue';
import AboutView from '../views/AboutView.vue';
import DatepickerView from '../views/DatepickerView.vue';
import TimePickerView from '../views/TimepickerView.vue';

const routes = [
  {
    path: '/',
    component: WelcomeView,
  },
  {
    path: '/master',
    component: MasterView,
  },
  {
    path: '/service',
    component: ServiceView,
  },
  {
    path: '/booking',
    component: BookingFormView,
  },
  {
    path: '/profile',
    component: ProfileView,
  },
  {
    path: '/about',
    component: AboutView,
  },
  {
    path: '/datepicker',
    component: DatepickerView,
  },
  {
    path: '/datepicker/timepicker',
    component: TimePickerView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
