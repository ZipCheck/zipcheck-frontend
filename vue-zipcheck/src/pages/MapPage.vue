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
		            :properties="properties"
		            @select-property="handlePropertySelect"
		            @update:map-viewport="handleMapViewportUpdate"
		        />	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MapSidebar from '@/components/map/MapSidebar.vue';
import KakaoMap from '@/components/map/KakaoMap.vue';
import { getSido, getGugun, getDong, searchProperties } from '@/api/map.api.js';

const router = useRouter();
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

// 현재 지도 뷰포트 정보
const currentViewport = ref({
    minLatitude: null,
    maxLatitude: null,
    minLongitude: null,
    maxLongitude: null,
    zoomLevel: null,
});


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

// 페이징 정보
const pagingInfo = ref({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
});

// 매물 검색 함수
const searchMapProperties = async (params = {}) => {
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
            minLatitude: currentViewport.value.minLatitude || null,
            maxLatitude: currentViewport.value.maxLatitude || null,
            minLongitude: currentViewport.value.minLongitude || null,
            maxLongitude: currentViewport.value.maxLongitude || null,
            zoomLevel: currentViewport.value.zoomLevel || null,
			page: params.page || 1, // 파라미터로 받은 페이지 사용, 기본값 1
			size: 20, // 기본값 20으로 복구
		};
		const response = await searchProperties(searchParams);
        if (response && response.data) {
            properties.value = response.data;
            pagingInfo.value = {
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                totalCount: response.totalCount
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

const handlePageChange = (page) => {
    searchMapProperties({ page });
};

// 마커 클릭 시 호출되는 함수
const handlePropertySelect = (propertyId) => {
    console.log('MapPage: Property selected (from KakaoMap), ID:', propertyId);
    if (propertyId) {
        // 아파트 상세 페이지로 이동
        router.push(`/apartment/${propertyId}`);
    }
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

// 초기 로딩 시 자동 검색 방지 플래그
const isInitialLoad = ref(true);

const handleMapViewportUpdate = (viewport) => {
    currentViewport.value = viewport;
    
    // 초기 로딩 시에는 검색을 수행하지 않음
    if (isInitialLoad.value) {
        isInitialLoad.value = false;
        return;
    }

    searchMapProperties(); // Trigger search with new viewport
};

// 초기 로드 시 시/도 목록 및 매물 검색
onMounted(() => {
	fetchSidoList();
});
</script>