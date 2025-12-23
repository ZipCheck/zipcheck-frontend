<script setup>
import { useRoute } from 'vue-router';
import { isAuthenticated, user, authStore } from '@/stores/auth.store.js';
import UserProfileAvatar from '@/components/common/UserProfileAvatar.vue';

const route = useRoute();

const navLinks = [
    { name: '홈', path: '/' },
    { name: '지도', path: '/map' },
    { name: '이모티콘', path: '/map-emoticon'},
    { name: '자유게시판', path: '/boards' },
    { name: '공지사항', path: '/notices' },
];

const isActive = (path) => {
    if (path === '/') return route.path === '/';
    return route.path.startsWith(path);
};

const handleLogout = () => {
	authStore.clearToken();
	// Force a hard navigation to the homepage to ensure all states are refreshed.
	window.location.href = '/';
};
</script>

<template>
    <header class="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo and Main Navigation -->
                <div class="flex items-center gap-10">
                    <router-link to="/" class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-3xl text-primary">home_pin</span>
                        <span class="text-xl font-bold text-text-main-light dark:text-text-main-dark">집첵</span>
                    </router-link>

                    <nav class="hidden md:flex items-center gap-6">
                        <router-link 
                            v-for="link in navLinks" 
                            :key="link.name" 
                            :to="link.path"
                            class="text-sm font-medium transition-colors"
                            :class="isActive(link.path) ? 'text-primary' : 'text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark'"
                        >
                            {{ link.name }}
                        </router-link>
                    </nav>
                </div>

                <!-- User Actions -->
                <div class="flex items-center gap-4">
                    <template v-if="isAuthenticated">
                        <router-link to="/mypage" class="flex items-center gap-2">
                            <UserProfileAvatar :profileImageUrl="user?.profileImageUrl" :size="'w-8 h-8'" :alt="user?.nickname" />
                            <span class="text-sm font-medium text-text-main-light dark:text-text-main-dark hidden sm:block">{{ user?.nickname }}</span>
                        </router-link>
                        <button @click="handleLogout" class="text-sm font-medium text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark">
                            로그아웃
                        </button>
                    </template>
                    <template v-else>
                        <router-link to="/login" class="text-sm font-medium text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark">
                            로그인
                        </router-link>
                        <router-link 
                            to="/signup" 
                            class="px-4 py-2 text-sm font-bold bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors"
                        >
                            회원가입
                        </router-link>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>
