<template>
	<div>
		<!-- 이미지 갤러리 -->
		<section class="mb-8">
			<div class="w-full h-[450px] flex gap-2">
				<!-- Main Image -->
				<div class="w-2/3 h-full">
					<img :src="images[0]" alt="Main property image" class="rounded-lg object-cover w-full h-full" />
				</div>
				<!-- Side Images -->
				<div class="w-1/3 h-full flex flex-col gap-2">
					<div class="h-1/2">
						<img :src="images[1]" alt="Property image 2" class="rounded-lg object-cover w-full h-full" />
					</div>
					<div class="h-1/2">
						<img :src="images[2]" alt="Property image 3" class="rounded-lg object-cover w-full h-full" />
					</div>
				</div>
			</div>
		</section>

		<section
			class="bg-card-light dark:bg-card-dark rounded-2xl shadow-soft p-6 md:p-8 border border-gray-50 dark:border-gray-800"
		>
			<div
				class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b border-gray-100 dark:border-gray-700 pb-6"
			>
				<div>
					<div class="flex items-center gap-2 mb-2">
						<span
							class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded"
							>매매</span
						>
						<span class="text-text-sub-light dark:text-text-sub-dark text-sm"
							>등록일 {{ formattedDealDate }}</span
						>
					</div>
					<h1 class="text-3xl font-bold mb-2">{{ property.aptName }}</h1>
					<p
						class="text-text-sub-light dark:text-text-sub-dark flex items-center gap-1"
					>
						<span class="material-symbols-outlined text-sm">location_on</span>
						{{ property.roadNm }} (지번: {{ property.jibun }})
					</p>
				</div>
				<div class="text-right md:text-right w-full md:w-auto">
					<p class="text-sm text-text-sub-light dark:text-text-sub-dark mb-1">
						매매가
					</p>
					<p class="text-4xl font-bold text-primary dark:text-yellow-400">
						{{ formattedDealAmount }}
					</p>
				</div>
			</div>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
				<div class="flex flex-col">
					<span
						class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium uppercase tracking-wider mb-1"
						>전용면적</span
					>
					<span class="font-semibold text-lg">{{ property.excluUseAr }}㎡</span>
				</div>
				<div class="flex flex-col">
					<span
						class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium uppercase tracking-wider mb-1"
						>해당층</span
					>
				<span class="font-semibold text-lg">{{ property.floor }}층</span>
				</div>
				<div class="flex flex-col">
					<span
						class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium uppercase tracking-wider mb-1"
						>방수/욕실수</span
					>
					<span class="font-semibold text-lg">3개 / 2개</span> <!-- API에 없음 -->
				</div>
				<div class="flex flex-col">
					<span
						class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium uppercase tracking-wider mb-1"
						>건축년도</span
					>
					<span class="font-semibold text-lg">{{ property.buildYear }}</span>
				</div>
			</div>
			<div class="mt-8 flex gap-3">
				<button
					@click="toggleFavorite"
					class="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-text-main-dark font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
				>
					<span 
						class="material-symbols-outlined"
						:class="{ 'text-red-500 icon-filled': isFavorite }">
						{{ isFavorite ? 'favorite' : 'favorite_border' }}
					</span>
					{{ isFavorite ? '찜 해제' : '찜하기' }}
				</button>
				<button
					@click="handleContact"
					class="flex-1 bg-primary hover:bg-primary-hover text-black font-bold py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
				>
					<span class="material-symbols-outlined">phone</span>
					문의하기
				</button>
			</div>
		</section>
	</div>
</template>

<script setup>
import { computed, ref, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { addFavoriteProperty, removeFavoriteProperty } from '@/api/users.api.js';
import { isAuthenticated } from '@/stores/auth.store.js';

const props = defineProps({
	property: {
		type: Object,
		required: true,
	},
});

const { property } = toRefs(props);
const router = useRouter();
const isFavorite = ref(false);

watch(property, (newVal) => {
	isFavorite.value = newVal?.isFavorite || false;
}, { immediate: true });

const imgPaths = [
    new URL('../../../../img/images (10).jpeg', import.meta.url).href,
    new URL('../../../../img/images (9).jpeg', import.meta.url).href,
    new URL('../../../../img/images (8).jpeg', import.meta.url).href,
    new URL('../../../../img/images (7).jpeg', import.meta.url).href,
    new URL('../../../../img/images (6).jpeg', import.meta.url).href,
    new URL('../../../../img/images (5).jpeg', import.meta.url).href,
    new URL('../../../../img/images (4).jpeg', import.meta.url).href,
    new URL('../../../../img/images (3).jpeg', import.meta.url).href,
    new URL('../../../../img/images (2).jpeg', import.meta.url).href,
    new URL('../../../../img/images (1).jpeg', import.meta.url).href,
    new URL('../../../../img/images.jpeg', import.meta.url).href,
];

const images = computed(() => {
    if (!property.value || !property.value.no) return [imgPaths[0], imgPaths[1], imgPaths[2]];
    const baseIndex = property.value.no % imgPaths.length;
    return [
        imgPaths[baseIndex],
        imgPaths[(baseIndex + 1) % imgPaths.length],
        imgPaths[(baseIndex + 2) % imgPaths.length],
    ];
});

const toggleFavorite = async () => {
	if (!isAuthenticated.value) {
		router.push('/login');
		return;
	}

	const dealNo = property.value.no;
	if (!dealNo) return;

	try {
		if (isFavorite.value) {
			await removeFavoriteProperty(dealNo);
		} else {
			await addFavoriteProperty(dealNo);
		}
		isFavorite.value = !isFavorite.value;
	} catch (error) {
		console.error("Failed to toggle favorite status:", error);
	}
};

const handleContact = () => {
	alert('준비중입니다.');
};

const formattedDealDate = computed(() => {
	if (!props.property) return '';
	const { dealYear, dealMonth, dealDay } = props.property;
	return `${dealYear}.${String(dealMonth).padStart(2, '0')}.${String(dealDay).padStart(2, '0')}`;
});

const formattedDealAmount = computed(() => {
	if (!props.property || !props.property.dealAmount) return '';
	const amountString = props.property.dealAmount.replace(/,/g, '');
	const amount = parseInt(amountString, 10);
	if (isNaN(amount)) return props.property.dealAmount;
	const billion = Math.floor(amount / 10000);
	const million = amount % 10000;

	let result = '';
	if (billion > 0) {
		result += `${billion}억 `;
	}
	if (million > 0) {
		result += `${million.toLocaleString()}만원`;
	}
	return result.trim();
});
</script>