<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getApartmentDeals } from '@/api/map.api.js';
import PropertyCard from '@/components/map/PropertyCard.vue';
import AiReport from '@/components/listing-detail/AiReport.vue';
import ToastMessage from '@/components/common/ToastMessage.vue';
import DealHistoryChart from '@/components/listing-detail/DealHistoryChart.vue';
import StickerSummary from '@/components/sticker/StickerSummary.vue';
import StickerReviewItem from '@/components/sticker/StickerReviewItem.vue';
import { getStickersByAptId } from '@/api/stickers.api.js';

const stickers = ref([]);
const stickerLoading = ref(true);
const stickerError = ref(null);

const fetchStickers = async () => {
    const aptId = route.params.aptSeq;
    if (!aptId) {
        stickerLoading.value = false;
        stickerError.value = new Error('Apartment ID is not provided.');
        return;
    }
    stickerLoading.value = true;
    try {
        const response = await getStickersByAptId(aptId);
        stickers.value = response.data;
    } catch (err) {
        console.error('Failed to fetch stickers:', err);
        stickerError.value = err;
    } finally {
        stickerLoading.value = false;
    }
};

const stickerSummary = computed(() => {
    const total = stickers.value.length;
    if (total === 0) {
        return { likePercent: 0, normalPercent: 0, dislikePercent: 0 };
    }

    const likeTypes = ['GOOD', 'SUN', 'VIEW', 'QUIET', 'NEW', 'STATION', 'INFRA', 'SCHOOL', 'PARK'];
    const normalTypes = ['SOSO', 'NORMAL_VIEW', 'NORMAL', 'FAIR_PRICE', 'AVERAGE_LOC'];

    const likeCount = stickers.value.filter(s => likeTypes.includes(s.stickerTypeName)).length;
    const normalCount = stickers.value.filter(s => normalTypes.includes(s.stickerTypeName)).length;
    const dislikeCount = total - likeCount - normalCount;

    return {
        likePercent: Math.round((likeCount / total) * 100),
        normalPercent: Math.round((normalCount / total) * 100),
        dislikePercent: Math.round((dislikeCount / total) * 100),
    };
});

const reviews = computed(() => {
    return stickers.value
        .filter(s => s.description && s.description.trim() !== '')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const route = useRoute();
const deals = ref([]);
const loading = ref(true);
const error = ref(null);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');

const paginatedDeals = ref([]);
const currentPage = ref(1);
const dealsPerPage = 10;
const totalPages = computed(() => Math.ceil(deals.value.length / dealsPerPage));

const aptName = computed(() => {
    return deals.value.length > 0 ? deals.value[0].aptName : '아파트 상세 정보';
});

const fetchDeals = async () => {
    const aptSeq = route.params.aptSeq;
    if (!aptSeq) {
        error.value = new Error('아파트 정보가 없습니다.');
        loading.value = false;
        return;
    }

    loading.value = true;
    try {
        // size를 200으로 설정하여 모든 매물 데이터를 가져오도록 요청
        const response = await getApartmentDeals(aptSeq, 1, 200);
        
        if (response && response.data) {
            // Sort all deals by date descending (newest first)
            deals.value = response.data.sort((a, b) => 
                new Date(b.dealYear, b.dealMonth - 1, b.dealDay) - new Date(a.dealYear, a.dealMonth - 1, a.dealDay)
            );
            updatePaginatedDeals();
        } else {
            deals.value = [];
        }
    } catch (err) {
        console.error('Failed to fetch apartment deals:', err);
        error.value = err;
    } finally {
        loading.value = false;
    }
};

const updatePaginatedDeals = () => {
  const start = (currentPage.value - 1) * dealsPerPage;
  const end = start + dealsPerPage;
  paginatedDeals.value = deals.value.slice(start, end);
};

const changePage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
    updatePaginatedDeals();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
    fetchDeals();
    fetchStickers();
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
                    <h1 class="text-3xl font-bold text-text-main-light dark:text-text-main-dark">{{ aptName }}</h1>
                    <span class="text-text-sub-light dark:text-text-sub-dark mb-1.5">총 <span class="text-primary font-bold">{{ deals.length }}</span>건의 매물</span>
                </div>
            </div>
        </div>

        <!-- 차트 영역 -->
        <div v-if="deals.length > 1" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DealHistoryChart :deals="deals" chartType="price" />
            <DealHistoryChart :deals="deals" chartType="pricePerArea" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- 매물 리스트 영역 -->
            <div class="lg:col-span-8">
                <div v-if="deals.length === 0" class="text-center py-10 text-text-sub-light dark:text-text-sub-dark">
                    등록된 매물이 없습니다.
                </div>
                
                <div v-else class="flex flex-col gap-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PropertyCard 
                            v-for="deal in paginatedDeals" 
                            :key="deal.no" 
                            :property="deal"
                        />
                    </div>

                    <!-- 페이지네이션 -->
                    <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 pt-6 border-t border-gray-200">
                        <button 
                            @click="changePage(currentPage - 1)" 
                            :disabled="currentPage <= 1"
                            class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <span class="material-symbols-outlined">chevron_left</span>
                        </button>
                        
                        <span class="font-medium text-gray-700">
                            {{ currentPage }} / {{ totalPages }}
                        </span>

                        <button 
                            @click="changePage(currentPage + 1)" 
                            :disabled="currentPage >= totalPages"
                            class="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <span class="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>


            <div class="lg:col-span-4 flex flex-col gap-8">
                <div class="p-6 bg-card-light dark:bg-card-dark rounded-2xl shadow-soft">
                    <h2 class="text-xl font-bold mb-6 text-text-main-light dark:text-text-main-dark">실제 거주민 반응</h2>

                    <!-- Loading State for Stickers -->
                    <div v-if="stickerLoading" class="text-center text-text-sub-light dark:text-text-sub-dark py-8">
                        <p>거주민 반응을 불러오는 중입니다...</p>
                    </div>

                    <!-- Error State for Stickers -->
                    <div v-else-if="stickerError" class="text-center text-red-500 dark:text-red-400 py-8">
                        <p>거주민 반응을 불러오지 못했습니다.</p>
                    </div>

                    <!-- Empty State for Stickers -->
                    <div v-else-if="!stickers || stickers.length === 0" class="text-center text-text-sub-light dark:text-text-sub-dark py-8">
                        <p>아직 등록된 거주민 후기가 없습니다.</p>
                    </div>

                    <!-- Sticker Content -->
                    <div v-else>
                        <!-- Sticker Summary -->
                        <div class="mb-6">
                            <h3 class="font-bold text-lg mb-4 text-text-main-light dark:text-text-main-dark">스티커 요약</h3>
                            <StickerSummary :summary="stickerSummary" />
                        </div>

                        <!-- Sticker Reviews -->
                        <div>
                            <h3 class="font-bold text-lg mb-4 text-text-main-light dark:text-text-main-dark">거주민 한마디</h3>
                            <div v-if="reviews.length > 0" class="space-y-3 max-h-96 overflow-y-auto pr-2">
                                <StickerReviewItem v-for="review in reviews" :key="review.stickerId" :review="review" />
                            </div>
                            <div v-else class="text-center text-sm text-text-sub-light dark:text-text-sub-dark py-4">
                                <p>아직 등록된 한줄평이 없습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <AiReport :aptSeq="route.params.aptSeq" />
            </div>
        </div>
    </div>
</main>
<ToastMessage v-model:show="showToast" :message="toastMessage" :type="toastType" />
</template>