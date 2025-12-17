<template>
	<aside
		class="w-96 bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-800 flex flex-col z-20 shadow-xl absolute md:relative h-full transform -translate-x-full md:translate-x-0 transition-transform duration-300"
	>
		<div class="p-5 border-b border-gray-100 dark:border-gray-800">
			<h2 class="text-lg font-bold mb-3">어떤 동네를 찾으시나요?</h2>
			<div class="relative">
				<span
					class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
					>search</span
				>
				<input
					class="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
					placeholder="지역, 아파트, 단지명 검색"
					type="text"
				/>
			</div>
		</div>
		<div
			class="px-5 py-3 border-b border-gray-100 dark:border-gray-800 flex gap-2 overflow-x-auto no-scrollbar"
		>
			<button
				class="flex items-center gap-1 bg-primary/20 text-yellow-800 dark:text-primary text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap border border-primary/30"
			>
				<span class="material-symbols-outlined text-[16px]">tune</span> 필터
			</button>
			<button
				class="bg-gray-100 dark:bg-gray-800 text-text-sub-light dark:text-text-sub-dark text-xs px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
			>
				매매
			</button>
			<button
				class="bg-gray-100 dark:bg-gray-800 text-text-sub-light dark:text-text-sub-dark text-xs px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
			>
				전세
			</button>
			<button
				class="bg-gray-100 dark:bg-gray-800 text-text-sub-light dark:text-text-sub-dark text-xs px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
			>
				월세
			</button>
		</div>
		<div
			class="flex-grow overflow-y-auto p-4 space-y-4 bg-background-light dark:bg-background-dark"
		>
			<PropertyCard
				v-for="property in properties"
				:key="property.id"
				:property="property"
			/>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue';
import PropertyCard from '@/components/map/PropertyCard.vue';

const properties = ref([
	{
		id: 1,
		type: '매매',
		name: '송파구 헬리오시티',
		address: '서울 송파구 송파대로 345',
		price: '20억 5,000',
		size: '110m²',
		tags: [
			{ text: '교통 편리', type: 'positive', icon: 'sentiment_satisfied' },
			{ text: '소음 보통', type: 'neutral', icon: 'sentiment_neutral' },
		],
	},
	{
		id: 2,
		type: '전세',
		name: '역삼 자이 아파트',
		address: '서울 강남구 역삼로 123',
		price: '12억',
		size: '84m²',
		tags: [{ text: '학군 우수', type: 'positive', icon: 'school' }],
	},
	{
		id: 3,
		type: '매매',
		name: '잠실 리센츠',
		address: '서울 송파구 올림픽로 135',
		price: '24억 1,000',
		size: '109m²',
		tags: [
			{ text: '주차 부족', type: 'negative', icon: 'sentiment_dissatisfied' },
		],
	},
]);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
	display: none;
}
.no-scrollbar {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
