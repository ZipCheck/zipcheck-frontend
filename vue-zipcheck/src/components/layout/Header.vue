<template>
	<header
		class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-border-color"
	>
		<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<!-- Logo -->
				<router-link to="/" class="flex items-center gap-2 cursor-pointer">
					<div
						class="flex items-center justify-center size-8 bg-primary rounded-lg text-text-main"
					>
						<span class="material-symbols-outlined icon-filled text-xl"
							>home_work</span
						>
					</div>
					<span class="text-xl font-bold tracking-tight text-text-main"
						>ZipCheck</span
					>
				</router-link>
				<!-- Navigation -->
				<nav class="hidden md:flex items-center gap-8">
					<router-link to="/" custom v-slot="{ href, navigate, isExactActive }">
						<a
							:href="href"
							@click="navigate"
							class="text-sm transition-colors hover:text-text-main"
							:class="
								isExactActive
									? 'font-semibold text-text-main'
									: 'font-medium text-text-muted'
							"
							>홈</a
						>
					</router-link>
					<router-link to="/map" custom v-slot="{ href, navigate, isActive }">
						<a
							:href="href"
							@click="navigate"
							class="text-sm transition-colors hover:text-text-main"
							:class="
								isActive
									? 'font-semibold text-text-main'
									: 'font-medium text-text-muted'
							"
							>지도</a
						>
					</router-link>
					<router-link
						to="/boards"
						custom
						v-slot="{ href, navigate, isActive }"
					>
						<a
							:href="href"
							@click="navigate"
							class="text-sm transition-colors hover:text-text-main"
							:class="
								isActive
									? 'font-semibold text-text-main'
									: 'font-medium text-text-muted'
							"
							>게시판</a
						>
					</router-link>
					<router-link
						to="/notices"
						custom
						v-slot="{ href, navigate, isActive }"
					>
						<a
							:href="href"
							@click="navigate"
							class="text-sm transition-colors hover:text-text-main"
							:class="
								isActive
									? 'font-semibold text-text-main'
									: 'font-medium text-text-muted'
							"
							>공지사항</a
						>
					</router-link>
				</nav>
				<!-- Auth Buttons -->
				<div class="flex items-center gap-3">
					<template v-if="isAuthenticated">
						<router-link
							to="/mypage"
							class="flex items-center justify-center bg-primary hover:bg-primary-dark text-text-main text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-sm"
						>
							마이페이지
						</router-link>
					</template>
					<template v-else>
						<router-link
							to="/login"
							class="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-sm"
						>
							로그인
						</router-link>
						<router-link
							to="/signup"
							class="flex items-center justify-center bg-primary hover:bg-primary-dark text-text-main text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-sm"
						>
							회원가입
						</router-link>
					</template>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { computed } from 'vue';
import { authStore } from '@/stores/auth.store';

const isAuthenticated = computed(() => authStore.isAuthenticated());
</script>
