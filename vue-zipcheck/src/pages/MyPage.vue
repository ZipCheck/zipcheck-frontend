<template>
  <main class="flex-grow py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      <MyPageSidebar />
      <div class="lg:col-span-3">
        <router-view />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import { useRouter } from 'vue-router';
import MyPageSidebar from '@/components/mypage/MyPageSidebar.vue';
import { getMyInfo } from '@/api/users.api.js';
import { logout as apiLogout } from '@/api/auth.api.js';
import { authStore } from '@/stores/auth.store';

const router = useRouter();
const user = ref(null);

const fetchUserInfo = async () => {
  try {
    const data = await getMyInfo();
    user.value = data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
  }
};

const logout = async () => {
  try {
    await apiLogout();
  } catch (error) {
    // Even if logout API fails, clear local token and redirect
    console.error('Logout API call failed, proceeding with local logout:', error);
  } finally {
    authStore.clearToken();
    router.push('/login');
  }
};

onMounted(() => {
  fetchUserInfo();
});

provide('user', user);
provide('logout', logout);
</script>
