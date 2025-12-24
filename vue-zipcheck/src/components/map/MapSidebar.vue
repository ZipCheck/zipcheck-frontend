<template>
	<aside
		class="absolute top-4 left-4 bottom-4 z-20 w-96 flex flex-col gap-4 pointer-events-none transform -translate-x-full md:translate-x-0 transition-transform duration-300"
	>
		<div
			class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-5 rounded-2xl shadow-soft pointer-events-auto border border-gray-200/70 dark:border-gray-700/70"
		>
			<h2 class="text-lg font-bold mb-3">어떤 동네를 찾으시나요?</h2>
			<!-- 시/도, 구/군, 동 드롭다운 추가 -->
			<div class="space-y-2 mb-4">
				<select
					:value="selectedSido"
					@change="$emit('update:selectedSido', $event.target.value)"
					class="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm py-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
				>
					<option value="">시/도 선택</option>
					<option v-for="sido in sidoList" :key="sido" :value="sido">
						{{ sido }}
					</option>
				</select>
				<select
					:value="selectedGugun"
					@change="$emit('update:selectedGugun', $event.target.value)"
					:disabled="!selectedSido"
					class="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm py-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
				>
					<option value="">구/군 선택</option>
					<option v-for="gugun in gugunList" :key="gugun" :value="gugun">
						{{ gugun }}
					</option>
				</select>
				<select
					:value="selectedDong"
					@change="$emit('update:selectedDong', $event.target.value)"
					:disabled="!selectedGugun"
					class="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm py-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
				>
					<option value="">동 선택</option>
					<option v-for="dong in dongList" :key="dong" :value="dong">
						{{ dong }}
					</option>
				</select>
			</div>

			<div class="relative">
				<span
					class="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
					>search</span
				>
				<input
					:value="aptNameSearch"
					@input="$emit('update:aptNameSearch', $event.target.value)"
					@keyup.enter="$emit('search-properties')"
					class="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
					placeholder="지역, 아파트, 단지명 검색"
					type="text"
				/>
			</div>

			<div class="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
				<button
					@click="toggleFilterPanel"
					class="flex items-center gap-1 bg-primary/20 text-yellow-800 dark:text-primary text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap border border-primary/30"
				>
					<span class="material-symbols-outlined text-[16px]">tune</span>
					필터
				</button>
				<!-- 기존 필터 버튼들은 일단 유지, 나중에 실제 필터값 바인딩 -->
				<button
					class="bg-gray-100 dark:bg-gray-800 text-text-sub-light dark:text-text-sub-dark text-xs px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
				>
					매매
				</button>
				<button
					class="bg-gray-100 dark:bg-gray-800 text-text-sub-light dark:text-text-sub-dark text-xs px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
				>
					전세
				</button>
				<button
					class="bg-gray-100 dark:bg-gray-800 text-text-sub-light dark:text-text-sub-dark text-xs px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
				>
					월세
				</button>
			</div>

			<!-- 필터 패널 (숨김 처리) - 토글 버튼에 따라 보였다 안 보였다 할 예정 -->
			<div v-if="showFilterPanel" class="mt-4 space-y-4">
				<h3 class="font-bold text-md">가격 범위 (만원)</h3>
				<div class="flex items-center gap-2">
					<input
						type="number"
						:value="minPrice"
						@input="
							$emit(
								'update:minPrice',
								$event.target.value ? Number($event.target.value) : null,
							)
						"
						placeholder="최소 가격"
						class="w-1/2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm py-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
					/>
					<span>~</span>
					<input
						type="number"
						:value="maxPrice"
						@input="
							$emit(
								'update:maxPrice',
								$event.target.value ? Number($event.target.value) : null,
							)
						"
						placeholder="최대 가격"
						class="w-1/2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm py-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
					/>
				</div>

				<h3 class="font-bold text-md">면적 범위 (m²)</h3>
				<div class="flex items-center gap-2">
					<input
						type="number"
						:value="minArea"
						@input="
							$emit(
								'update:minArea',
								$event.target.value ? Number($event.target.value) : null,
							)
						"
						placeholder="최소 면적"
						class="w-1/2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm py-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
					/>
					<span>~</span>
					<input
						type="number"
						:value="maxArea"
						@input="
							$emit(
								'update:maxArea',
								$event.target.value ? Number($event.target.value) : null,
							)
						"
						placeholder="최대 면적"
						class="w-1/2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm py-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
					/>
				</div>
				<button
					@click="$emit('search-properties')"
					class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 rounded-xl transition-colors"
				>
					필터 적용
				</button>
			</div>
		</div>

		<div
			class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-soft pointer-events-auto border border-gray-200/70 dark:border-gray-700/70 flex-1 flex flex-col overflow-hidden"
		>
			<div class="flex-grow overflow-y-auto p-4 space-y-4">
				<!-- 선택된 매물이 있을 때 "전체 목록 보기" 버튼 표시 -->
				<div
					v-if="selectedPropertyId"
					class="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800"
				>
					<span class="text-sm font-bold text-blue-700 dark:text-blue-300"
						>선택된 매물</span
					>
					<button
						@click="$emit('reset-selection')"
						class="text-xs text-gray-500 hover:text-gray-800 underline"
					>
						전체 목록 보기
					</button>
				</div>

				<div v-if="loading" class="text-center py-4">
					매물 정보를 불러오는 중...
				</div>
				<div v-else-if="error" class="text-center py-4 text-red-500">
					매물 정보를 불러오는데 실패했습니다: {{ error.message }}
				</div>
				<div
					v-else-if="filteredProperties.length === 0"
					class="text-center py-4 text-gray-500"
				>
					검색 결과가 없습니다.
				</div>
				<!-- 클러스터 목록 (줌 아웃 시) -->
				<template
					v-if="properties.length > 0 && properties[0].regionName !== undefined"
				>
					<div
						v-for="(cluster, index) in properties"
						:key="cluster.regionName || index"
						class="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
					>
						<span class="font-bold text-gray-800 dark:text-gray-200">{{
							cluster.regionName
						}}</span>
						                        						<span
						                        							class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold"
						                        							>{{ cluster.dealCount }}개</span
						                        						>
						                        					</div>
						                        				</template>					                <!-- 아파트 목록 (줌 인 시) -->
					                <template
					                    v-else-if="properties.length > 0 && properties[0].aptSeq !== undefined"
					                >
					                    <div
					                        v-for="(apt, index) in properties"
					                        :key="apt.aptSeq || index"
					                        @click="openReviewModal(apt)"
					                        class="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
					                    >
					                        <div class="flex justify-between items-center mb-1">
					                            <span class="font-bold text-gray-800 dark:text-gray-200">{{
					                                apt.aptName
					                            }}</span>
					                            <span
					                                class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded-full font-bold"
					                            >
					                                								{{ apt.dealCount }}건
					                                							</span>
					                                						</div>
					                                					</div>				</template>
				<!-- 개별 매물 목록 (하위 호환) -->
				<template v-else>
					<PropertyCard
						v-for="property in filteredProperties"
						:key="property.deal_id || property.no"
						:property="property"
						:class="{
							'ring-2 ring-primary bg-primary/5':
								selectedPropertyId === (property.deal_id || property.no),
						}"
					/>
				</template>
			</div>

			<!-- 페이지네이션 -->
			<div
				v-if="pagingInfo"
				class="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-center items-center gap-2 bg-white/90 dark:bg-gray-900/90 shrink-0"
			>
				<button
					@click="$emit('change-page', pagingInfo.currentPage - 1)"
					:disabled="pagingInfo.currentPage <= 1"
					class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
				>
					<span class="material-symbols-outlined text-sm">chevron_left</span>
				</button>

				<span
					class="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[3rem] text-center"
				>
					{{ pagingInfo.currentPage }} / {{ pagingInfo.totalPages }}
				</span>

				<button
					@click="$emit('change-page', pagingInfo.currentPage + 1)"
					:disabled="pagingInfo.currentPage >= pagingInfo.totalPages"
					class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
				>
					<span class="material-symbols-outlined text-sm">chevron_right</span>
				</button>
			</div>
		</div>

		<Teleport to="body">
			<PropertyReviewModal
				v-if="isReviewModalOpen"
				:isOpen="isReviewModalOpen"
				:apartmentName="selectedReviewProperty?.aptName"
				:apartmentId="selectedReviewProperty?.aptId ?? selectedReviewProperty?.aptSeq"
				@close="isReviewModalOpen = false"
				@save="handleReviewSave"
			/>
		</Teleport>
	</aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import PropertyCard from '@/components/map/PropertyCard.vue';
import PropertyReviewModal from '@/components/map/PropertyReviewModal.vue';
import http from '@/api/http';

const props = defineProps({
	sidoList: Array,
	gugunList: Array,
	dongList: Array,
	selectedSido: String,
	selectedGugun: String,
	selectedDong: String,
	aptNameSearch: String,
	minPrice: Number,
	maxPrice: Number,
	minArea: Number,
	maxArea: Number,
	properties: Array,
	loading: Boolean,
	error: Object,
    selectedPropertyId: [String, Number],
    pagingInfo: Object
});

const emit = defineEmits([
	'update:selectedSido',
	'update:selectedGugun',
	'update:selectedDong',
	'update:aptNameSearch',
	'update:minPrice',
	'update:maxPrice',
	'update:minArea',
	'update:maxArea',
	'search-properties',
    'reset-selection',
    'change-page'
]);

const showFilterPanel = ref(false);
const isReviewModalOpen = ref(false);
const selectedReviewProperty = ref(null);

const toggleFilterPanel = () => {
    showFilterPanel.value = !showFilterPanel.value;
};

const openReviewModal = (apt) => {
    selectedReviewProperty.value = apt;
    isReviewModalOpen.value = true;
};

const handleReviewSave = async (reviewData) => {
    console.log('Attempting to save review:', reviewData);
    try {
        const aptId = reviewData.aptId ?? reviewData.apartmentId;
        if (!aptId) {
            alert('아파트를 선택해주세요.');
            return;
        }
        if (!reviewData.sentiment) {
            alert('감정을 선택해주세요.');
            return;
        }
        if (!reviewData.emoticon) {
            alert('이모티콘을 선택해주세요.');
            return;
        }

        // 백엔드 StickerCreateRequest DTO에 맞게 데이터 구성
        const aptIdValue = Number(aptId);
        const payload = {
            aptId: Number.isFinite(aptIdValue) ? aptIdValue : aptId,
            sentiment: reviewData.sentiment.toUpperCase(),
            emoticon: reviewData.emoticon.toUpperCase(),
            description: reviewData.description,
        };

        // API 호출
        await http.post('/api/stickers', payload);
        alert('스티커가 성공적으로 등록되었습니다.'); // 사용자에게 알림
    } catch (error) {
        console.error('Error saving sticker:', error.response?.data || error);
        alert('스티커 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        // 401 Unauthorized 에러 처리 (로그인 만료 등)
        if (error.response && error.response.status === 401) {
            alert('세션이 만료되었거나 권한이 없습니다. 다시 로그인해주세요.');
            // 로그인 페이지로 리다이렉트 등의 처리
        }
    } finally {
        isReviewModalOpen.value = false;
    }
};

// 선택된 매물이 있으면 해당 매물만 필터링, 없으면 전체 보여줌
const filteredProperties = computed(() => {
    if (props.selectedPropertyId) {
        return props.properties.filter(p => (p.deal_id || p.no) == props.selectedPropertyId);
    }
    return props.properties;
});

</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
	display: none;
}
.no-scrollbar {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>
