<template>
	<div
		@click="goToDetail"
		class="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group"
	>
		<div class="flex justify-between items-start mb-2">
			<!-- property.type 대신 '매매'로 고정 -->
			<span
				class="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
			>
				매매
			</span>
			<span
				class="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors text-[20px]"
				>favorite</span
			>
		</div>
		<h3
			class="font-bold text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
		>
			{{ property.aptName }}
		</h3>
		<p class="text-xs text-text-sub-light dark:text-text-sub-dark mb-3">
			{{ property.roadNm }} (지번: {{ property.jibun }})
		</p>
		<div class="flex items-center gap-2 mb-3">
			<span class="text-lg font-bold">{{ formattedDealAmount }}</span>
			<span class="text-xs text-text-sub-light dark:text-text-sub-dark">{{
				property.excluUseAr
			}}㎡</span>
		</div>
		<!-- property.tags 섹션은 API에 없으므로 제거 -->
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
	property: {
		type: Object,
		required: true,
	},
});

const router = useRouter();

const goToDetail = () => {
    const id = props.property.dead_id || props.property.no;
	if (props.property && id) {
        console.log('PropertyCard: Navigating to detail page with ID:', id); // 로그 추가
		router.push(`/listing/${id}`);
	}
};

const formattedDealAmount = computed(() => {
	if (!props.property || !props.property.dealAmount) return '';
	// dealAmount가 "120,000" 형태의 문자열이라고 가정 (만원 단위)
	const amountString = props.property.dealAmount.replace(/,/g, ''); // 콤마 제거
	const amount = parseInt(amountString, 10);

	if (isNaN(amount)) return props.property.dealAmount; // 숫자로 변환 실패 시 원본 반환

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