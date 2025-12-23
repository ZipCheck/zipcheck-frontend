<template>
	<main class="flex-grow flex relative h-[calc(100vh-64px)] overflow-hidden">
		<EmoticonSidebar :totalCount="totalReviewCount" />
		<EmoticonMap
			ref="emoticonMapRef"
			:stickers="stickers"
			@update:map-viewport="handleViewportUpdate"
			@select-apartment="handleApartmentSelect"
		/>
		<!-- 현재 위치로 이동 버튼 -->
		<div class="absolute bottom-24 right-8 z-20">
			<button
				@click="moveToCurrentUserPosition"
				class="w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
				type="button"
				aria-label="현재 위치로 이동"
			>
				<span class="material-symbols-outlined">my_location</span>
			</button>
		</div>
		<ToastMessage
			v-model:show="showToast"
			:message="toastMessage"
			:type="toastType"
		/>
	</main>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EmoticonSidebar from '@/components/map-emoticon/EmoticonSidebar.vue';
import EmoticonMap from '@/components/map-emoticon/EmoticonMap.vue';
import ToastMessage from '@/components/common/ToastMessage.vue';
import { getStickerMap } from '@/api/stickers.api.js';

const router = useRouter();
const stickers = ref([]);
const loading = ref(false);
const error = ref(null);
const emoticonMapRef = ref(null);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');

let fetchTimer = null;

onMounted(() => {
	// 페이지 로드 시 특별한 동작 없음
});

const moveToCurrentUserPosition = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				emoticonMapRef.value?.panTo(latitude, longitude);
				toastMessage.value = '현재 위치로 이동했습니다.';
				toastType.value = 'success';
				showToast.value = true;
			},
			error => {
				console.error('Geolocation 에러:', error);
				toastMessage.value = '위치 정보를 가져오는 데 실패했습니다.';
				toastType.value = 'error';
				showToast.value = true;
			},
		);
	} else {
		toastMessage.value = '이 브라우저에서는 위치 정보 서비스를 지원하지 않습니다.';
		toastType.value = 'error';
		showToast.value = true;
	}
};


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
