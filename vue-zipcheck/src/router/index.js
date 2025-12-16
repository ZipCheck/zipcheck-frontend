import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import BoardsListPage from '@/pages/BoardsListPage.vue';
import BoardDetailPage from '@/pages/BoardDetailPage.vue';
import BoardWritePage from '@/pages/BoardWritePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import NoticesListPage from '@/pages/NoticesListPage.vue';
import SignupPage from '@/pages/SignupPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage, // ← 이거 없으면 router-view 비어 있음
    },
    {
      path: '/boards',
      component: BoardsListPage,
    },
    {
      path: '/boards/write',
      component: BoardWritePage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/notices',
      component: NoticesListPage,
    },
    {
      path: '/signup',
      component: SignupPage,
    },
    {
      path: '/boards/:id',
      component: BoardDetailPage,
    },
  ],
});

export default router;
