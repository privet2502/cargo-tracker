import { createRouter, createWebHistory } from 'vue-router';
import CargoTracker from '../views/CargoTracker.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CargoTracker,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
