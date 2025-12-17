import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import BoardsListPage from '@/pages/BoardsListPage.vue';
import BoardDetailPage from '@/pages/BoardDetailPage.vue';
import BoardWritePage from '@/pages/BoardWritePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import NoticesListPage from '@/pages/NoticesListPage.vue';
import SignupPage from '@/pages/SignupPage.vue';
import MapPage from '@/pages/MapPage.vue';
import MyPage from '@/pages/MyPage.vue';
import ProfileEdit from '@/components/mypage/ProfileEdit.vue';
import MyReviews from '@/components/mypage/MyReviews.vue';
import FavoriteProperties from '@/components/mypage/FavoriteProperties.vue';
import MapEmoticonPage from '@/pages/MapEmoticonPage.vue';
import RealEstateListingDetailPage from '@/pages/RealEstateListingDetailPage.vue';
import NotificationSettings from '@/components/mypage/NotificationSettings.vue';
import { authStore } from '@/stores/auth.store';

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
      meta: { requiresAuth: true },
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
    {
      path: '/map',
      component: MapPage,
    },
    {
      path: '/mypage',
      component: MyPage,
      redirect: '/mypage/profile',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'profile',
          component: ProfileEdit,
        },
        {
          path: 'reviews',
          component: MyReviews,
        },
        {
          path: 'favorites',
          component: FavoriteProperties,
        },
        {
          path: 'notifications',
          component: NotificationSettings,
        },
      ],
    },
    {
      path: '/map-emoticon',
      component: MapEmoticonPage,
    },
    {
      path: '/listing/:id',
      component: RealEstateListingDetailPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authStore.isAuthenticated();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    alert('로그인이 필요합니다.');
    next('/login');
  } else {
    next();
  }
});

export default router;
