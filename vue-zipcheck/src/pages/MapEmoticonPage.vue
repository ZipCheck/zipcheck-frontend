<template>
	<main class="flex-grow flex relative h-[calc(100vh-64px)] overflow-hidden">
		<EmoticonSidebar :totalCount="totalReviewCount" />
		<EmoticonMap
			:stickers="stickers"
			@update:map-viewport="handleViewportUpdate"
			@select-apartment="handleApartmentSelect"
		/>
	</main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import EmoticonSidebar from '@/components/map-emoticon/EmoticonSidebar.vue';
import EmoticonMap from '@/components/map-emoticon/EmoticonMap.vue';
import { getStickerMap } from '@/api/stickers.api.js';

const router = useRouter();
const stickers = ref([]);
const loading = ref(false);
const error = ref(null);

let fetchTimer = null;

const fetchStickerMap = async viewport => {
	loading.value = true;
	error.value = null;
	try {
		const response = await getStickerMap(viewport);
		const data = response?.data ?? response;
		stickers.value = Array.isArray(data) ? data : [];
	} catch (err) {
		console.error('Failed to fetch sticker map:', err);
		error.value = err;
		stickers.value = [];
	} finally {
		loading.value = false;
	}
};

const toCount = value => {
	const numberValue = Number(value);
	return Number.isFinite(numberValue) ? numberValue : 0;
};

const totalReviewCount = computed(() => {
	return stickers.value.reduce((sum, item) => {
		const emotions = Array.isArray(item?.emotions) ? item.emotions : [];
		const itemTotal = emotions.reduce((acc, emotion) => {
			return acc + toCount(emotion?.count);
		}, 0);
		return sum + itemTotal;
	}, 0);
});

const handleViewportUpdate = viewport => {
	if (
		viewport?.minLatitude == null ||
		viewport?.maxLatitude == null ||
		viewport?.minLongitude == null ||
		viewport?.maxLongitude == null
	) {
		return;
	}
	if (fetchTimer) clearTimeout(fetchTimer);
	fetchTimer = setTimeout(() => fetchStickerMap(viewport), 200);
};

const handleApartmentSelect = aptId => {
	if (aptId) {
		router.push(`/apartment/${aptId}`);
	}
};
</script>
