import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage, // ← 이거 없으면 router-view 비어 있음
    },
  ],
});

export default router;
