<template>
	<header
		class="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-6 py-3 bg-background-light dark:bg-background-dark z-20"
	>
		<div class="flex items-center gap-4">
			<div class="text-primary">
				<!-- SVG 그대로 복붙 -->
				<svg
					class="w-8 h-8"
					fill="none"
					viewBox="0 0 48 48"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						d="M39.475..."
						fill="currentColor"
						fill-rule="evenodd"
					></path>
				</svg>
			</div>
			<h2 class="text-2xl font-bold leading-tight tracking-tighter">
				zipcheck
			</h2>
		</div>

		<nav class="flex gap-9">
			<RouterLink class="hover:text-primary transition-colors" to="/"
				>홈</RouterLink
			>
			<RouterLink class="hover:text-primary transition-colors" to="/board"
				>게시판</RouterLink
			>
			<RouterLink class="hover:text-primary transition-colors" to="/notice"
				>공지사항</RouterLink
			>
		</nav>

		<div class="flex gap-3">
			<button class="border rounded-lg px-4 h-10 font-bold">로그인</button>
			<button class="bg-primary text-white rounded-lg px-4 h-10 font-bold">
				회원가입
			</button>
		</div>
	</header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
