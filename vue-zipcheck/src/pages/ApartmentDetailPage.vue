
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getApartmentDeals } from '@/api/map.api.js';
import { addFavoriteProperty, removeFavoriteProperty } from '@/api/users.api.js';
import PropertyCard from '@/components/map/PropertyCard.vue';
import AiReport from '@/components/listing-detail/AiReport.vue';
import ToastMessage from '@/components/common/ToastMessage.vue';

const route = useRoute();
const deals = ref([]);
const loading = ref(true);
const error = ref(null);
const isFavorited = ref(false); // 찜 상태 (초기값은 API 연동 후 변경 필요)

// Toast state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');

const pagingInfo = ref({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
});

const aptName = computed(() => {
    return deals.value.length > 0 ? deals.value[0].aptName : '아파트 상세 정보';
});

const fetchDeals = async (page = 1) => {
    const aptSeq = route.params.aptSeq;
    if (!aptSeq) {
        error.value = new Error('아파트 정보가 없습니다.');
        loading.value = false;
        return;
    }

    loading.value = true;
    try {
        const response = await getApartmentDeals(aptSeq, page);
        
        if (response && response.data) {
            deals.value = response.data;
            // TODO: 실제 찜 상태를 API로부터 받아와 isFavorited.value에 설정해야 함
            pagingInfo.value = {
                currentPage: response.currentPage || 1,
                totalPages: response.totalPages || 1,
                totalCount: response.totalCount || 0
            };
        } else if (Array.isArray(response)) {
            deals.value = response;
            pagingInfo.value = { currentPage: 1, totalPages: 1, totalCount: response.length };
        }
    } catch (err) {
        console.error('Failed to fetch apartment deals:', err);
        error.value = err;
    } finally {
        loading.value = false;
    }
};

const toggleFavorite = async () => {
    const dealNo = deals.value[0]?.no; // 대표 매물로 가정
    if (!dealNo) return;

    try {
        if (isFavorited.value) {
            await removeFavoriteProperty(dealNo);
            toastMessage.value = '찜 목록에서 제거되었습니다.';
        } else {
            await addFavoriteProperty(dealNo);
            toastMessage.value = '찜 목록에 추가되었습니다.';
        }
        isFavorited.value = !isFavorited.value;
        toastType.value = 'success';
        showToast.value = true;
    } catch (err) {
        console.error('Failed to toggle favorite:', err);
        toastMessage.value = '요청에 실패했습니다.';
        toastType.value = 'error';
        showToast.value = true;
    }
};


const changePage = (page) => {
    if (page < 1 || page > pagingInfo.value.totalPages) return;
    fetchDeals(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
    fetchDeals();
});
</script>

<template>
  <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
    <div v-if="loading && deals.length === 0" class="text-center py-10">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
      <p class="text-gray-600">매물 정보를 불러오는 중...</p>
    </div>
    
    <div v-else-if="error" class="text-center py-10 text-red-500 bg-red-50 rounded-lg p-6">
      <h3 class="font-bold text-lg mb-2">오류 발생</h3>
      <p>{{ error.message || '정보를 불러오는데 실패했습니다.' }}</p>
      <button @click="$router.go(-1)" class="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">뒤로 가기</button>
    </div>
    
    <div v-else class="flex flex-col gap-6">
        <!-- 헤더 -->
        <div class="border-b border-gray-200 pb-6">
            <button @click="$router.go(-1)" class="mb-4 flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors">
                <span class="material-symbols-outlined text-lg">arrow_back</span> 
                <span class="text-sm font-medium">지도 목록으로 돌아가기</span>
            </button>
            <div class="flex items-center justify-between">
                <div class="flex items-end gap-3">
                    <h1 class="text-3xl font-bold text-gray-900">{{ aptName }}</h1>
                    <span class="text-gray-500 mb-1.5">총 <span class="text-primary font-bold">{{ pagingInfo.totalCount || deals.length }}</span>건의 매물</span>
                </div>
                <button @click="toggleFavorite" class="p-3 rounded-full hover:bg-gray-100 transition-colors">
                    <span 
                        class="material-symbols-outlined"
                        :class="isFavorited ? 'text-red-500 icon-filled' : 'text-gray-400'"
                    >
                        favorite
                    </span>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- 매물 리스트 영역 -->
            <div class="lg:col-span-8">
                <div v-if="deals.length === 0" class="text-center py-10 text-gray-500">
                    등록된 매물이 없습니다.
                </div>
                
                <div v-else class="flex flex-col gap-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PropertyCard 
                            v-for="deal in deals" 
                            :key="deal.no" 
                            :property="deal"
                        />
                    </div>

                    <!-- 페이지네이션 -->
                    <div v-if="pagingInfo.totalPages > 1" class="flex justify-center items-center gap-4 pt-6 border-t border-gray-200">
                        <button 
                            @click="changePage(pagingInfo.currentPage - 1)" 
                            :disabled="pagingInfo.currentPage <= 1"
                            class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <span class="material-symbols-outlined">chevron_left</span>
                        </button>
                        
                        <span class="font-medium text-gray-700">
                            {{ pagingInfo.currentPage }} / {{ pagingInfo.totalPages }}
                        </span>

                        <button 
                            @click="changePage(pagingInfo.currentPage + 1)" 
                            :disabled="pagingInfo.currentPage >= pagingInfo.totalPages"
                            class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <span class="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- AI 리포트 사이드바 -->
            <div class="lg:col-span-4">
                <AiReport :aptSeq="route.params.aptSeq" />
            </div>
        </div>
    </div>
    <ToastMessage v-model:show="showToast" :message="toastMessage" :type="toastType" />
  </main>
</template>
