<template>
	<main class="flex-grow flex relative h-[calc(100vh-64px)] overflow-hidden">
		<MapSidebar
			:sidoList="sidoList"
			:gugunList="gugunList"
			:dongList="dongList"
			:selectedSido="selectedSido"
			:selectedGugun="selectedGugun"
			:selectedDong="selectedDong"
			:aptNameSearch="aptNameSearch"
			:minPrice="minPrice"
			:maxPrice="maxPrice"
			:minArea="minArea"
			:maxArea="maxArea"
			:properties="properties"
			:pagingInfo="pagingInfo"
			:loading="loading"
			:error="error"
			:selectedPropertyId="selectedPropertyId"
			@update:selectedSido="updateSelectedSido"
			@update:selectedGugun="updateSelectedGugun"
			@update:selectedDong="updateSelectedDong"
			@update:aptNameSearch="updateAptNameSearch"
			@update:minPrice="updateMinPrice"
			@update:maxPrice="updateMaxPrice"
			@update:minArea="updateMinArea"
			@update:maxArea="updateMaxArea"
			@search-properties="searchMapProperties"
			@change-page="handlePageChange"
			@reset-selection="resetSelection"
		/>
		<KakaoMap
			ref="kakaoMapRef"
			:properties="properties"
			@select-property="handlePropertySelect"
			@update:map-viewport="handleMapViewportUpdate"
			@map-click="handleMapClick"
			:user-position="currentUserPosition"
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
		<EmoticonSelectionModal
			:show="showEmoticonModal"
			:distance="currentDistance"
			@close="showEmoticonModal = false"
			@select="handleEmoticonSelect"
		/>
	</main>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MapSidebar from '@/components/map/MapSidebar.vue';
import KakaoMap from '@/components/map/KakaoMap.vue';
import ToastMessage from '@/components/common/ToastMessage.vue';
import EmoticonSelectionModal from '@/components/map-emoticon/EmoticonSelectionModal.vue';
import { calculateDistance } from '@/utils/geolocation.js';
import {
	getSido,
	getGugun,
	getDong,
	searchProperties,
	addEmoticon,
} from '@/api/map.api.js';
import { useMapStore } from '@/stores/map.store';

const router = useRouter();
const route = useRoute();
const mapStore = useMapStore();
const kakaoMapRef = ref(null);

// --- 매물 관련 상태 ---
const properties = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedPropertyId = ref(null);
const sidoList = ref([]);
const gugunList = ref([]);
const dongList = ref([]);
const selectedSido = ref('');
const selectedGugun = ref('');
const selectedDong = ref('');
const aptNameSearch = ref('');
const minPrice = ref(null);
const maxPrice = ref(null);
const minArea = ref(null);
const maxArea = ref(null);
const currentViewport = ref({
	minLatitude: null,
	maxLatitude: null,
	minLongitude: null,
	maxLongitude: null,
	zoomLevel: null,
});
const pagingInfo = ref({
	currentPage: 1,
	totalPages: 1,
	totalCount: 0,
});
const isInitialLoad = ref(true);

// --- 이모티콘 및 위치 인증 관련 상태 ---
const currentUserPosition = ref(null);
const clickedMapPosition = ref(null);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');
const showEmoticonModal = ref(false);
const currentDistance = ref(0);

// --- 매물 관련 메소드 ---
const fetchSidoList = async () => {
	try {
		sidoList.value = await getSido();
	} catch (err) {
		console.error('Failed to fetch sido list:', err);
		error.value = err;
	}
};
const fetchGugunList = async sido => {
	gugunList.value = [];
	dongList.value = [];
	if (sido) {
		try {
			gugunList.value = await getGugun(sido);
		} catch (err) {
			console.error('Failed to fetch gugun list:', err);
			error.value = err;
		}
	}
};
const fetchDongList = async (sido, gugun) => {
	dongList.value = [];
	if (sido && gugun) {
		try {
			dongList.value = await getDong(sido, gugun);
		} catch (err) {
			console.error('Failed to fetch dong list:', err);
			error.value = err;
		}
	}
};
const searchMapProperties = async (params = {}) => {
	loading.value = true;
	error.value = null;
	selectedPropertyId.value = null;
	try {
		const searchParams = {
			sidoName: selectedSido.value || null,
			gugunName: selectedGugun.value || null,
			dongName: selectedDong.value || null,
			aptName: aptNameSearch.value || null,
			minArea: minArea.value || null,
			maxArea: maxArea.value || null,
			minPrice: minPrice.value || null,
			maxPrice: maxPrice.value || null,
			minLatitude: currentViewport.value.minLatitude || null,
			maxLatitude: currentViewport.value.maxLatitude || null,
			minLongitude: currentViewport.value.minLongitude || null,
			maxLongitude: currentViewport.value.maxLongitude || null,
			zoomLevel: currentViewport.value.zoomLevel || null,
			page: params.page || 1,
			size: 20,
		};
		const response = await searchProperties(searchParams);
		if (response && response.data) {
			properties.value = response.data;
			pagingInfo.value = {
				currentPage: response.currentPage,
				totalPages: response.totalPages,
				totalCount: response.totalCount,
			};
		} else {
			properties.value = [];
		}
	} catch (err) {
		console.error('Failed to search properties:', err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};
const handlePageChange = page => {
	searchMapProperties({ page });
};
const handlePropertySelect = propertyId => {
	if (propertyId) {
		router.push(`/apartment/${propertyId}`);
	}
};
const resetSelection = () => {
	selectedPropertyId.value = null;
};
const updateSelectedSido = value => {
	selectedSido.value = value;
	selectedGugun.value = '';
	selectedDong.value = '';
	fetchGugunList(value);
	searchMapProperties();
};
const updateSelectedGugun = value => {
	selectedGugun.value = value;
	selectedDong.value = '';
	fetchDongList(selectedSido.value, value);
	searchMapProperties();
};
const updateSelectedDong = value => {
	selectedDong.value = value;
	searchMapProperties();
};
const updateAptNameSearch = value => {
	aptNameSearch.value = value;
};
const updateMinPrice = value => (minPrice.value = value);
const updateMaxPrice = value => (maxPrice.value = value);
const updateMinArea = value => (minArea.value = value);
const updateMaxArea = value => (maxArea.value = value);
const handleMapViewportUpdate = viewport => {
	currentViewport.value = viewport;
	
	// 지도 상태를 Pinia store에 저장
	if (viewport.centerLat && viewport.centerLng && viewport.zoomLevel) {
		mapStore.setViewport({
			lat: viewport.centerLat,
			lng: viewport.centerLng,
			zoom: viewport.zoomLevel,
		});
	}

	if (isInitialLoad.value) {
		isInitialLoad.value = false;
		return;
	}
	searchMapProperties();
};

// --- 이모티콘 관련 메소드 ---
const handleMapClick = clickedPos => {
	if (
		!currentUserPosition.value ||
		typeof currentUserPosition.value.lat !== 'number' ||
		typeof currentUserPosition.value.lng !== 'number'
	) {
		toastMessage.value = '현재 위치 정보가 유효하지 않습니다. 위치 권한을 확인하고, 현재 위치 버튼을 눌러주세요.';
		toastType.value = 'error';
		showToast.value = true;
		return;
	}

	const distance = calculateDistance(
		currentUserPosition.value.lat,
		currentUserPosition.value.lng,
		clickedPos.lat,
		clickedPos.lng,
	);

	console.log(`클릭된 위치와의 거리: ${distance.toFixed(2)} 미터`);

	if (distance <= 10) {
		clickedMapPosition.value = clickedPos;
		currentDistance.value = distance;
		showEmoticonModal.value = true;
	} else {
		toastMessage.value = `현재 위치에서 너무 멉니다. (거리: ${distance.toFixed(
			2,
		)}m)`;
		toastType.value = 'error';
		showToast.value = true;
	}
};

const handleEmoticonSelect = async emoticon => {
	if (!clickedMapPosition.value) return;

	const emoticonData = {
		latitude: clickedMapPosition.value.lat,
		longitude: clickedMapPosition.value.lng,
		emoticonType: emoticon.name,
	};

	try {
		await addEmoticon(emoticonData);
		toastMessage.value = `'${emoticon.name}' 감정을 등록했습니다!`;
		toastType.value = 'success';
		showToast.value = true;
	} catch (error) {
		console.error('이모티콘 등록 실패:', error);
		toastMessage.value = '감정 등록에 실패했습니다. 다시 시도해주세요.';
		toastType.value = 'error';
		showToast.value = true;
	}
};

const moveToCurrentUserPosition = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				currentUserPosition.value = { lat: latitude, lng: longitude };
				kakaoMapRef.value?.panTo(latitude, longitude);
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

// --- 라이프사이클 훅 ---
onMounted(() => {
	fetchSidoList();

	// 페이지 로드 시 현재 위치를 가져오지만, 지도를 바로 이동시키지는 않음 (이모티콘 기능용)
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			position => {
				currentUserPosition.value = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				console.log('현재 위치:', currentUserPosition.value);
			},
			error => {
				console.error('Geolocation 에러:', error);
				toastMessage.value = '현재 위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.';
				toastType.value = 'error';
				showToast.value = true;
			},
		);
	}

	// URL 쿼리 파라미터에 lat, lng가 있는지 확인
	const { lat, lng } = route.query;
	if (lat && lng) {
		const latitude = parseFloat(lat);
		const longitude = parseFloat(lng);

		if (!isNaN(latitude) && !isNaN(longitude)) {
			// nextTick을 사용하여 자식 컴포넌트가 마운트된 후 panTo를 호출
			nextTick(() => {
				kakaoMapRef.value?.panTo(latitude, longitude);
			});
		}
	}
});
</script>