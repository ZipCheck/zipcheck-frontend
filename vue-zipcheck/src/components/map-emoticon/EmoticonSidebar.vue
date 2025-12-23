<template>
	<aside
		class="absolute top-4 left-4 bottom-4 z-20 w-80 flex flex-col gap-4 pointer-events-none"
	>
		<div
			class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-2 rounded-2xl shadow-soft pointer-events-auto border border-gray-200/70 dark:border-gray-700/70"
		>
			<div class="relative group">
				<span
					class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
					>search</span
				>
				<input
					class="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all placeholder-gray-400 dark:text-white"
					placeholder="아파트/단지명/지역 검색"
					type="text"
				/>
				<button
					class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-1.5 rounded-lg text-black hover:opacity-80 transition-opacity"
				>
					<span class="material-symbols-outlined text-sm">arrow_forward</span>
				</button>
			</div>
		</div>
		<div
			class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-5 rounded-2xl shadow-soft pointer-events-auto border border-gray-200/70 dark:border-gray-700/70 flex-1 flex flex-col overflow-y-auto"
		>
			<div class="flex items-center gap-2 mb-4">
				<div
					class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 p-1.5 rounded-lg"
				>
					<span class="material-symbols-outlined text-base"
						>emoji_emotions</span
					>
				</div>
				<h2 class="font-bold text-gray-800 dark:text-white text-sm">
					이모티콘 리뷰 등록 가이드
				</h2>
			</div>
			<div class="space-y-6 relative">
				<div
					class="absolute left-[11px] top-2 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-700 -z-10"
				></div>
				<div class="flex gap-3">
					<div
						class="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-bold shrink-0 shadow-sm"
					>
						1
					</div>
					<div>
						<p class="text-xs font-bold text-gray-900 dark:text-gray-100">
							위치 인증
						</p>
						<p class="text-[11px] text-gray-500 mt-1 leading-snug">
							GPS를 통해 현재 위치를 인증합니다. 실제 거주자만 리뷰를 남길 수
							있습니다.
						</p>
						<button
							class="mt-2 text-[10px] font-bold text-primary bg-black/80 dark:bg-white/10 px-2 py-1 rounded hover:bg-black transition-colors flex items-center gap-1"
						>
							<span class="material-symbols-outlined text-xs">my_location</span>
							내 위치 인증하기
						</button>
					</div>
				</div>
				<div class="flex gap-3">
					<div
						class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-xs font-bold shrink-0"
					>
						2
					</div>
					<div>
						<p class="text-xs font-bold text-gray-900 dark:text-gray-100">
							감정 표현 선택
						</p>
						<p class="text-[11px] text-gray-500 mt-1 leading-snug">
							살아보지 않으면 모르는 느낌! 이모티콘으로 표현해보세요.
						</p>
						<div class="flex gap-2 mt-2 opacity-50">
							<span class="bg-gray-100 dark:bg-gray-800 p-1 rounded">👍</span>
							<span class="bg-gray-100 dark:bg-gray-800 p-1 rounded">😐</span>
							<span class="bg-gray-100 dark:bg-gray-800 p-1 rounded">👎</span>
						</div>
					</div>
				</div>
				<div class="flex gap-3">
					<div
						class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-xs font-bold shrink-0"
					>
						3
					</div>
					<div>
						<p class="text-xs font-bold text-gray-900 dark:text-gray-100">
							한줄 평 작성
						</p>
						<p class="text-[11px] text-gray-500 mt-1 leading-snug">
							솔직한 이유를 10자~20자 내외로 간단히 남겨주세요.
						</p>
					</div>
				</div>
			</div>
			<div class="mt-auto pt-6">
				<div
					class="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center border border-gray-100 dark:border-gray-700"
				>
					<span class="text-xs text-gray-400 block mb-1"
						>이번 달 등록된 리뷰</span
					>
					<span class="text-xl font-bold text-primary"
						>{{ formattedCount }}개</span
					>
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	totalCount: {
		type: Number,
		default: 0,
	},
});

const formattedCount = computed(() => {
	const value = Number(props.totalCount);
	if (!Number.isFinite(value)) return '0';
	return value.toLocaleString('ko-KR');
});
</script>
