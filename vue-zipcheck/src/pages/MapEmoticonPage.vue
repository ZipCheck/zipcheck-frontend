<template>
	<main class="flex-grow flex relative h-[calc(100vh-64px)] overflow-hidden">
		<EmoticonSidebar :totalCount="totalReviewCount" />
		<EmoticonMap
			:stickers="stickers"
			:user-position="userPosition"
			:initial-zoom="initialZoom"
			@update:map-viewport="handleViewportUpdate"
			@select-apartment="handleApartmentSelect"
		/>
	</main>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EmoticonSidebar from '@/components/map-emoticon/EmoticonSidebar.vue';
import EmoticonMap from '@/components/map-emoticon/EmoticonMap.vue';
import { getStickerMap } from '@/api/stickers.api.js';
import { useMapStore } from '@/stores/map.store';

const router = useRouter();
const mapStore = useMapStore();
const stickers = ref([]);
const loading = ref(false);
const error = ref(null);
const userPosition = ref(null);
const initialZoom = ref(7); // 기본 줌 레벨

let fetchTimer = null;

onMounted(() => {
	// Pinia store에 저장된 viewport 상태가 있는지 확인
	if (mapStore.hasBeenSet) {
		userPosition.value = {
			lat: mapStore.latitude,
			lng: mapStore.longitude,
		};
		initialZoom.value = mapStore.zoom;
	} else {
		// Geolocation API로 현재 위치 가져오기
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					userPosition.value = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					initialZoom.value = 10; // 현재 위치를 찾았을 때 더 가까운 줌 레벨 설정
					console.log('현재 위치:', userPosition.value);
				},
				err => {
					console.error('Geolocation 에러:', err);
				},
			);
		} else {
			console.warn('이 브라우저에서는 위치 정보 서비스를 지원하지 않습니다.');
		}
	}
});

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
