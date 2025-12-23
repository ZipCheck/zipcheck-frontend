<template>
	<div class="bg-secondary text-text-main">
		<Header />
		<RouterView />
		<Footer />
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import { user, isAuthenticated } from '@/stores/auth.store';
import { getMyInfo } from '@/api/users.api.js';

onMounted(async () => {
	if (isAuthenticated.value) {
		try {
			const userInfo = await getMyInfo();
			user.value = userInfo;
		} catch (error) {
			console.error('Failed to fetch user info on app load:', error);
			// The interceptor will handle 401s, but other errors might occur.
		}
	}
});
</script>
