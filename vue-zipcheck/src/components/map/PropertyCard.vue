<template>
	<div
		@click="goToDetail"
		class="bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-soft hover:shadow-soft-hover border border-border-light dark:border-border-dark transition-all cursor-pointer group"
	>
		<div class="flex justify-between items-start mb-3">
			<span
				class="text-xs font-bold px-2.5 py-1 rounded-md bg-secondary dark:bg-secondary/20 text-secondary-foreground dark:text-text-sub-dark"
			>
				매매
			</span>
			<button @click.stop="toggleFavorite" class="p-1 -m-1 text-text-sub-light dark:text-text-sub-dark hover:text-red-500 dark:hover:text-red-500 transition-colors">
				<span
					class="material-symbols-outlined transition-colors text-xl"
					:class="{ 'text-red-500 icon-filled': property.isFavorite }"
				>
					favorite
				</span>
			</button>
		</div>
		<h3
			class="font-bold text-lg mb-1 text-text-main-light dark:text-text-main-dark group-hover:text-primary dark:group-hover:text-primary transition-colors"
		>
			{{ property.aptName }}
		</h3>
		<p class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4 truncate">
			{{ property.roadNm }}
		</p>
		<div class="flex items-baseline gap-2">
			<span class="text-xl font-bold text-text-main-light dark:text-text-main-dark">{{ formattedDealAmount }}</span>
			<span class="text-sm text-text-sub-light dark:text-text-sub-dark">{{
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
	const dealNo = props.property.no;
	if (dealNo) {
		router.push(`/listing/${dealNo}`);
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