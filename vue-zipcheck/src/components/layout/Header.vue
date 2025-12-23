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
				<nav ref="navContainer" class="hidden md:flex items-center bg-gray-100 rounded-full p-1 relative">
					<span
						ref="slider"
						class="absolute h-[32px] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out"
					></span>

					<router-link
						v-for="link in links"
						:key="link.to"
						:ref="el => (linkRefs[link.to] = el)"
						:to="link.to"
						class="relative text-sm px-4 py-1.5 transition-colors z-10"
						:class="linkIsActive(link) ? 'font-semibold text-text-main' : 'font-medium text-text-muted'"
					>
						{{ link.text }}
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
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { isAuthenticated } from '@/stores/auth.store';

const route = useRoute();
const navContainer = ref(null);
const slider = ref(null);
const linkRefs = ref({});

const links = [
	{ to: '/', text: '홈', match: ['/'] },
	{ to: '/map', text: '매물 지도', match: ['/map'] },
	{ to: '/map-emoticon', text: '감정 지도', match: ['/map-emoticon'] },
	{ to: '/boards', text: '게시판', match: ['/boards'] },
	{ to: '/notices', text: '공지사항', match: ['/notices'] },
];

const linkIsActive = (link) => {
	// 홈페이지('/')는 정확히 일치할 때만 active
	if (link.to === '/') {
		return route.path === '/';
	}
	// 다른 링크들은 하위 경로도 active로 처리 (e.g., /boards/1)
	return link.match.some(path => route.path.startsWith(path));
}

const updateSliderPosition = () => {
	const activeLink = links.find(link => linkIsActive(link));
	if (activeLink) {
		const activeLinkElement = linkRefs.value[activeLink.to]?.$el;
		if (activeLinkElement && slider.value) {
			slider.value.style.width = `${activeLinkElement.offsetWidth}px`;
			slider.value.style.transform = `translateX(${activeLinkElement.offsetLeft}px)`;
		}
	}
};

watch(route, () => {
	nextTick(updateSliderPosition);
});

onMounted(() => {
	nextTick(updateSliderPosition);
});
</script>
