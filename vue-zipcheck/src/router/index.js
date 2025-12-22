import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import BoardsListPage from '@/pages/BoardsListPage.vue';
import BoardDetailPage from '@/pages/BoardDetailPage.vue';
import BoardWritePage from '@/pages/BoardWritePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.vue';
import NoticesListPage from '@/pages/NoticesListPage.vue';
import NoticeWritePage from '@/pages/NoticeWritePage.vue';
import SignupPage from '@/pages/SignupPage.vue';
import MapPage from '@/pages/MapPage.vue';
import MyPage from '@/pages/MyPage.vue';
import ProfileEdit from '@/components/mypage/ProfileEdit.vue';
import MyPosts from '@/components/mypage/MyPosts.vue';
import FavoriteProperties from '@/components/mypage/FavoriteProperties.vue';
import NotificationSettings from '@/components/mypage/NotificationSettings.vue';
import MapEmoticonPage from '@/pages/MapEmoticonPage.vue';
import RealEstateListingDetailPage from '@/pages/RealEstateListingDetailPage.vue';
import ApartmentDetailPage from '@/pages/ApartmentDetailPage.vue';
import { isAuthenticated } from '@/stores/auth.store';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
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
			path: '/boards/edit/:id',
			component: BoardWritePage,
			meta: { requiresAuth: true },
		},
		{
			path: '/login',
			component: LoginPage,
		},
		{
			path: '/forgot-password',
			component: ForgotPasswordPage,
		},
		{
			path: '/notices',
			component: NoticesListPage,
		},
		{
			path: '/notices/new',
			component: NoticeWritePage,
			meta: { requiresAuth: true },
		},
		{
			path: '/notices/edit/:id',
			component: NoticeWritePage,
			meta: { requiresAuth: true },
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
			path: '/apartment/:aptSeq',
			component: ApartmentDetailPage,
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
					path: 'posts',
					component: MyPosts,
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
	const isAuthenticatedUser = isAuthenticated.value;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !isAuthenticatedUser) {
		alert('로그인이 필요합니다.');
		next('/login');
	} else {
		next();
	}
});

export default router;
