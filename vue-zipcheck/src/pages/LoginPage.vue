<template>
	<div class="flex-grow flex items-center justify-center p-4 sm:p-8">
		<div
			class="w-full max-w-md bg-card-light dark:bg-card-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10 transition-all"
		>
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
					다시 만나서 반가워요!
				</h1>
				<p class="text-text-sub-light dark:text-text-sub-dark">
					투명한 부동산 정보를 확인하려면 로그인하세요.
				</p>
			</div>
			<form @submit.prevent="handleLogin" class="space-y-5" method="POST">
				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						for="email"
						>이메일 주소</label
					>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
						>
							<span
								class="material-icons-outlined text-gray-400 text-xl"
							></span>
						</div>
						<input
							v-model="email"
							class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow shadow-sm"
							id="email"
							name="email"
							placeholder="name@example.com"
							required=""
							type="email"
						/>
					</div>
				</div>
				<div>
					<div class="flex items-center justify-between mb-1">
						<label
							class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							for="password"
							>비밀번호</label
						>
						<router-link
							to="/forgot-password"
							class="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
						>
							비밀번호를 잊으셨나요?
						</router-link>
					</div>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
						>
							<span
								class="material-icons-outlined text-gray-400 text-xl"
							></span>
						</div>
						<input
							v-model="password"
							class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow shadow-sm"
							id="password"
							name="password"
							placeholder="••••••••"
							required=""
							type="password"
						/>
					</div>
				</div>
				<div class="flex items-center">
					<input
						v-model="rememberMe"
						class="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800 cursor-pointer"
						id="remember-me"
						name="remember-me"
						type="checkbox"
					/>
					<label
						class="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none"
						for="remember-me"
					>
						아이디 기억하기
					</label>
				</div>
				<button
					class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-gray-900 bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform active:scale-[0.98]"
					type="submit"
				>
					로그인
				</button>
			</form>
			<div class="mt-8 relative">
				<div class="absolute inset-0 flex items-center">
					<div
						class="w-full border-t border-gray-200 dark:border-gray-700"
					></div>
				</div>
				<div class="relative flex justify-center text-sm"></div>
			</div>

			<p
				class="mt-8 text-center text-sm text-text-sub-light dark:text-text-sub-dark"
			>
				아직 계정이 없으신가요?
				<a
					class="font-medium text-gray-900 hover:text-primary dark:text-white dark:hover:text-primary transition-colors underline decoration-2 decoration-primary underline-offset-4"
					href="/signup"
				>
					회원가입 하기
				</a>
			</p>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api/auth.api';
import { authStore } from '@/stores/auth.store';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);

onMounted(() => {
	const savedEmail = localStorage.getItem('rememberedEmail');
	if (savedEmail) {
		email.value = savedEmail;
		rememberMe.value = true;
	}
});

const handleLogin = async () => {
	try {
		if (rememberMe.value) {
			localStorage.setItem('rememberedEmail', email.value);
		} else {
			localStorage.removeItem('rememberedEmail');
		}

		const data = await login({ email: email.value, password: password.value });
		if (data.accessToken) {
			authStore.setToken(data.accessToken);
			router.push('/');
		}
	} catch (error) {
		console.error('Login failed:', error);
		// The interceptor will show a generic alert.
		// Specific UI error handling can be added here if needed.
	}
};
</script>
<style scoped></style>
