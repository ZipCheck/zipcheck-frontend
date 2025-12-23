<template>
	<div
		@click="goToDetail"
		class="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group"
	>
		<div class="flex justify-between items-start mb-2">
			<span
				class="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
			>
				매매
			</span>
			<button @click.stop="toggleFavorite" class="p-1 -m-1">
				<span
					class="material-symbols-outlined transition-colors text-[20px]"
					:class="property.isFavorite ? 'text-red-500 icon-filled' : 'text-gray-300 group-hover:text-red-400'"
				>
					favorite
				</span>
			</button>
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
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { addFavoriteProperty, removeFavoriteProperty } from '@/api/users.api.js';
import { isAuthenticated } from '@/stores/auth.store.js';

const props = defineProps({
	property: {
		type: Object,
		required: true,
	},
});

const router = useRouter();

const goToDetail = () => {
	const aptSeq = props.property.aptSeq;
	if (aptSeq) {
		router.push(`/apartment/${aptSeq}`);
	}
};

const toggleFavorite = async () => {
	if (!isAuthenticated.value) {
		router.push('/login');
		return;
	}

	const dealNo = props.property.no;
	if (!dealNo) return;

	try {
		if (props.property.isFavorite) {
			await removeFavoriteProperty(dealNo);
		} else {
			await addFavoriteProperty(dealNo);
		}
		// Optimistic update of the prop.
		// This works because the parent's data is now correctly fetched and reactive.
		props.property.isFavorite = !props.property.isFavorite;
	} catch (error) {
		console.error("Failed to toggle favorite status:", error);
		// Optionally, revert the state on error
	}
};

const formattedDealAmount = computed(() => {
	if (!props.property || !props.property.dealAmount) return '';
	const amountString = String(props.property.dealAmount).replace(/,/g, '');
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