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
    README 요구사항에 따른 배경 재설계:
    1. 명확한 그라데이션 적용 (#F8FAFF -> #EEF3FF)
    2. 눈에 띄는 지도 라인 패턴 (hsla(220, 80%, 55%, 0.06) -> 6% opacity)
    3. 미세한 노이즈 텍스처 (3% opacity)
    - 전역 opacity를 제거하고 각 레이어의 투명도를 개별 제어하여 가시성 확보
  */
	background-image:
		/* 2. Noise Texture (Subtle) */
		repeating-conic-gradient(from 0.25turn, #00000008 0% 25%, #ffffff00 0% 25.02%),
		/* 1. Map-like Line Pattern (Visible) */
		linear-gradient(
			135deg,
			hsla(220, 80%, 55%, 0.06) 0,
			hsla(220, 80%, 55%, 0.06) 1px,
			transparent 1px,
			transparent 60px
		),
		linear-gradient(
			45deg,
			hsla(220, 80%, 55%, 0.06) 0,
			hsla(220, 80%, 55%, 0.06) 1px,
			transparent 1px,
			transparent 60px
		),
		/* 3. Base Gradient */
		linear-gradient(to bottom, #f8faff, #eef3ff);

	background-size:
		/* Noise */ 16px 16px,
		/* Lines */ 60px 60px, 60px 60px,
		/* Base */ 100% 100%;
}
</style>
