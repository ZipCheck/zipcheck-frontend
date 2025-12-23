<template>
	<section
		class="hero-background relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center"
	>
		<div class="relative z-10 w-full max-w-4xl text-center space-y-8">
			<div class="space-y-4">
				<h1
					class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-main leading-[1.15]"
				>
					어떤 집을 <br class="sm:hidden" />찾고 계신가요?
				</h1>
				<p
					class="text-lg md:text-xl text-text-muted font-medium max-w-2xl mx-auto"
				>
					투명한 정보와 생생한 후기로 내 집 마련의 꿈을 이루세요.
				</p>
			</div>
			<!-- Search Bar -->
			<div class="w-full max-w-2xl mx-auto">
				<div
					class="group relative flex items-center w-full h-16 rounded-full bg-white border-2 border-transparent focus-within:border-primary shadow-soft hover:shadow-soft-hover transition-all duration-300"
				>
					<div class="pl-6 text-text-muted">
						<span class="material-symbols-outlined text-[28px]">search</span>
					</div>
					<input
						class="w-full h-full bg-transparent border-none focus:ring-0 text-lg px-4 placeholder:text-gray-400 text-text-main"
						placeholder="아파트 / 단지명 / 지역 / 게시글 검색"
						type="text"
						v-model="searchQuery"
						@keyup.enter="handleSearch"
					/>
					<div class="pr-2">
						<button
							class="h-12 px-8 bg-primary hover:bg-primary-hover rounded-full font-bold text-primary-foreground transition-colors text-base whitespace-nowrap"
							type="button"
							@click="handleSearch"
						>
							검색
						</button>
					</div>
				</div>
			</div>
			<!-- Auxiliary CTAs -->
			<div class="flex flex-wrap items-center justify-center gap-4 pt-2">
				<router-link
					class="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-border-color rounded-full hover:border-primary hover:text-primary-dark transition-all shadow-sm group"
					to="/boards"
				>
					<span class="text-sm font-semibold">최근 커뮤니티 글 보기</span>
					<span
						class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform"
						>arrow_forward</span
					>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const handleSearch = () => {
	const query = searchQuery.value.trim();
	if (query) {
		router.push({ path: '/map', query: { q: query } });
		return;
	}
	router.push('/map');
};
</script>

<style scoped>
.hero-background {
	background-color: #f8faff; /* Fallback and top of gradient */
	overflow: hidden;
	position: relative;
}

.hero-background::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
	pointer-events: none;

	/* 
    README Polish 단계:
    - 반복 패턴 완화를 위해 단일 대형 SVG 사용
    - 중앙부 밀도 감소 및 크기/위치 변형 적용
    - 미세한 포인트 컬러 추가
  */
	background:
		/* 1. House/Apartment Landscape (Non-repeating) */
		url("data:image/svg+xml,%3Csvg width='1400' height='250' viewBox='0 0 1400 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23C9D6EA' stroke-opacity='0.2' stroke-width='3' fill='none' stroke-linejoin='round' stroke-linecap='round'%3E%3C!-- Group 1 (Far Left) --%3E%3Cg transform='translate(50, 40) scale(0.9)'%3E%3Cpath d='M 20 180 L 20 100 L 70 50 L 120 100 L 120 180' /%3E%3Crect x='50' y='120' width='40' height='30' /%3E%3C/g%3E%3C!-- Group 2 (Left-ish) --%3E%3Cg transform='translate(220, 0)'%3E%3Crect x='150' y='80' width='100' height='100' /%3E%3Crect x='165' y='95' width='25' height='20' /%3E%3Crect x='210' y='95' width='25' height='20' /%3E%3C!-- Point Color Window --%3E%3Crect x='165' y='125' width='25' height='20' stroke='hsla(210, 100%25, 75%25, 0.18)' /%3E%3Crect x='210' y='125' width='25' height='20' /%3E%3C/g%3E%3C!-- Group 3 (Right-ish) --%3E%3Cg transform='translate(950, 30) scale(1.05)'%3E%3Cpath d='M 20 180 L 20 100 L 70 50 L 120 100 L 120 180' /%3E%3Crect x='50' y='120' width='40' height='30' /%3E%3C/g%3E%3C!-- Group 4 (Far Right) --%3E%3Cg transform='translate(1150, -10) scale(0.95)'%3E%3Crect x='150' y='80' width='100' height='100' /%3E%3Crect x='165' y='95' width='25' height='20' /%3E%3Crect x='210' y='95' width='25' height='20' /%3E%3Crect x='165' y='125' width='25' height='20' /%3E%3Crect x='210' y='125' width='25' height='20' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E") bottom center / 100% 250px no-repeat,
		/* 2. Noise Texture */
		repeating-conic-gradient(from 0.25turn, #00000005 0% 25%, #ffffff00 0% 25.02%) center / 16px 16px repeat,
		/* 3. Map-like Line Pattern (Subtle) */
		linear-gradient(135deg, hsla(220, 80%, 55%, 0.04) 0, hsla(220, 80%, 55%, 0.04) 1px, transparent 1px, transparent 60px) center / 60px 60px repeat,
		linear-gradient(45deg, hsla(220, 80%, 55%, 0.04) 0, hsla(220, 80%, 55%, 0.04) 1px, transparent 1px, transparent 60px) center / 60px 60px repeat,
		/* 4. Base Gradient */
		linear-gradient(to bottom, #f8faff, #eef3ff) center / 100% 100% no-repeat;
}
</style>
