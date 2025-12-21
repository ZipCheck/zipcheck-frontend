<template>
	<main class="flex-grow flex relative h-[calc(100vh-64px)] overflow-hidden">
		<MapSidebar
			@search-properties="searchMapProperties"
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
            @reset-selection="resetSelection"
		/>
		<KakaoMap 
            :properties="properties" 
            @select-property="handlePropertySelect"
        />
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MapSidebar from '@/components/map/MapSidebar.vue';
import KakaoMap from '@/components/map/KakaoMap.vue';
import { getSido, getGugun, getDong, searchProperties } from '@/api/map.api.js';

const properties = ref([]);
const loading = ref(false);
const error = ref(null);

// 선택된 매물 ID (단일 선택)
const selectedPropertyId = ref(null);

// 지역 검색 관련 상태
const sidoList = ref([]);
const gugunList = ref([]);
const dongList = ref([]);

const selectedSido = ref('');
const selectedGugun = ref('');
const selectedDong = ref('');
const aptNameSearch = ref('');

// 필터 관련 상태
const minPrice = ref(null);
const maxPrice = ref(null);
const minArea = ref(null);
const maxArea = ref(null);


// 시/도 목록 가져오기
const fetchSidoList = async () => {
    console.log('MapPage: fetchSidoList called');
	try {
		sidoList.value = await getSido();
        console.log('MapPage: fetchSidoList success, data:', sidoList.value);
	} catch (err) {
		console.error('Failed to fetch sido list:', err);
		error.value = err;
	}
};

// 구/군 목록 가져오기
const fetchGugunList = async (sido) => {
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

// 동 목록 가져오기
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

// 매물 검색 함수
const searchMapProperties = async () => {
	loading.value = true;
	error.value = null;
    selectedPropertyId.value = null; // 검색 시 선택 초기화
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
			page: 1, 
			size: 20, // 기본값 20으로 복구
		};
		properties.value = await searchProperties(searchParams);
	} catch (err) {
		console.error('Failed to search properties:', err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};

// 마커 클릭 시 호출되는 함수
const handlePropertySelect = (propertyId) => {
    console.log('MapPage: Property selected (from KakaoMap), ID:', propertyId);
    selectedPropertyId.value = propertyId;
};

// 선택 초기화 (전체 목록 보기)
const resetSelection = () => {
    selectedPropertyId.value = null;
};

// MapSidebar에서 emit된 값 업데이트
const updateSelectedSido = (value) => {
	selectedSido.value = value;
	selectedGugun.value = ''; // 시도 변경 시 구군 초기화
	selectedDong.value = ''; // 시도 변경 시 동 초기화
	fetchGugunList(value);
	searchMapProperties();
};

const updateSelectedGugun = (value) => {
	selectedGugun.value = value;
	selectedDong.value = ''; // 구군 변경 시 동 초기화
	fetchDongList(selectedSido.value, value);
	searchMapProperties();
};

const updateSelectedDong = (value) => {
	selectedDong.value = value;
	searchMapProperties();
};

const updateAptNameSearch = (value) => {
	aptNameSearch.value = value;
};

const updateMinPrice = (value) => (minPrice.value = value);
const updateMaxPrice = (value) => (maxPrice.value = value);
const updateMinArea = (value) => (minArea.value = value);
const updateMaxArea = (value) => (maxArea.value = value);


// 초기 로드 시 시/도 목록 및 매물 검색
onMounted(() => {
	fetchSidoList();
});
</script>