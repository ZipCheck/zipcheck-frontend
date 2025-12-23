<template>
	<section
		class="bg-card-light dark:bg-card-dark rounded-2xl shadow-soft p-6 md:p-8 border border-gray-50 dark:border-gray-800 sticky top-24"
	>
		<div class="flex items-center gap-2 mb-6">
			<span class="material-symbols-outlined text-primary">psychology</span>
			<h2 class="text-xl font-bold">AI 분석 리포트</h2>
		</div>

		<!-- 초기 버튼 -->
		<div v-if="!showAiReport" class="text-center py-10">
			<p class="text-text-sub-light dark:text-text-sub-dark mb-4">
				AI가 해당 매물의 상세 분석 리포트를 생성합니다.
			</p>
			<button
				@click="fetchAiReport"
				:disabled="isLoadingAiReport"
				class="px-6 py-3 rounded-lg text-sm font-bold text-primary-foreground bg-primary hover:bg-primary-hover shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
			>
				<span v-if="isLoadingAiReport" class="animate-spin material-symbols-outlined">
					autorenew
				</span>
				{{ isLoadingAiReport ? '분석 중...' : 'AI 분석 보기' }}
			</button>
		</div>

		<!-- 분석 중 로딩 -->
		<div v-else-if="isLoadingAiReport" class="text-center py-10">
			<p class="text-text-sub-light dark:text-text-sub-dark mb-4 animate-pulse">
				AI가 매물을 분석하고 있습니다...
			</p>
			<span class="animate-spin material-symbols-outlined text-4xl text-primary">
				autorenew
			</span>
		</div>

		<!-- 분석 결과 표시 -->
		<div v-else-if="aiReportData" class="flex flex-col mt-5">
			<div class="flex flex-col items-center mb-8 relative">
				<svg class="circular-chart w-48 h-48 text-primary" viewBox="0 0 36 36">
					<path
						class="circle-bg"
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
					></path>
					<path
						class="circle stroke-primary"
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						:stroke-dasharray="`${aiReportData.score}, 100`"
					></path>
				</svg>
				<div class="absolute inset-0 flex flex-col items-center justify-center">
					<span
						class="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark uppercase"
						>종합 점수</span
					>
					<span
						class="text-5xl font-bold text-text-main-light dark:text-text-main-dark"
						>{{ aiReportData.score }}<span class="text-2xl text-text-sub-light dark:text-text-sub-dark"
							>점</span
						></span
					>
				</div>
			</div>

			<!-- AI 요약 섹션 -->
			<div
				class="bg-yellow-50 dark:bg-yellow-900/10 p-5 rounded-xl border border-yellow-100 dark:border-yellow-800/30 mb-6"
			>
				<div class="flex gap-2 mb-2">
					<span class="material-symbols-outlined text-primary text-lg"
						>auto_awesome</span
					>
					<h3 class="font-bold text-sm text-gray-800 dark:text-gray-200">
						AI 요약
					</h3>
				</div>
				<p
					class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify whitespace-pre-wrap"
					v-html="formattedAnswer"
				>
				</p>
			</div>

			<p
				class="text-xs text-text-sub-light dark:text-text-sub-dark text-center leading-normal"
			>
				※ 본 분석은 AI가 주변 부동산 데이터와 실거래가를 기반으로 생성한 참고용
				정보입니다. 실제 거래 시 법적 효력을 갖지 않습니다.
			</p>

            <!-- 다시 분석하기 버튼 -->
            <button
                @click="fetchAiReport"
                :disabled="isLoadingAiReport"
                class="mt-6 px-6 py-3 rounded-lg text-sm font-bold text-primary-foreground bg-primary hover:bg-primary-hover shadow-md hover:shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
            >
                <span v-if="isLoadingAiReport" class="animate-spin material-symbols-outlined">
					autorenew
				</span>
                {{ isLoadingAiReport ? '분석 중...' : '다시 분석하기' }}
            </button>
		</div>

		<!-- 에러 메시지 -->
		<div v-else-if="error" class="text-center py-10 text-red-500">
			<p>AI 리포트를 불러오는 데 실패했습니다: {{ error.message }}</p>
			<button @click="fetchAiReport" class="mt-4 px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm">
				다시 시도
			</button>
		</div>
	</section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { getAiSummary, getApartmentAiSummary } from '@/api/map.api.js';

const props = defineProps({
	property: {
		type: Object,
		default: null,
	},
    aptSeq: {
        type: String,
        default: null
    }
});

const isLoadingAiReport = ref(false);
const aiReportData = ref(null);
const showAiReport = ref(false); // 분석 시작 버튼 클릭 여부
const error = ref(null);

const fetchAiReport = async () => {
	isLoadingAiReport.value = true;
	aiReportData.value = null; // 재분석 시 기존 데이터 초기화
	error.value = null; // 이전 에러 초기화
    showAiReport.value = true; // 분석이 시작되었음을 표시

	try {
        if (props.aptSeq) {
            console.log('AiReport: Requesting AI summary for aptSeq:', props.aptSeq);
            const responseData = await getApartmentAiSummary(props.aptSeq);
            aiReportData.value = responseData;
        } else {
            // ID 필드 확인 (deal_id 또는 no 둘 다 체크)
            const dealId = props.property?.deal_id || props.property?.no;
            
            if (!dealId) {
                throw new Error('매물 정보가 없어서 AI 분석을 요청할 수 없습니다.');
            }
            
            console.log('AiReport: Requesting AI summary for dealId:', dealId);
            const responseData = await getAiSummary(dealId);
            aiReportData.value = responseData;
        }
	} catch (err) {
		console.error('Failed to fetch AI report:', err);
		error.value = err;
	} finally {
		isLoadingAiReport.value = false;
	}
};

const formattedAnswer = computed(() => {
  if (!aiReportData.value || !aiReportData.value.answer) return '';
  return aiReportData.value.answer.replace(/\n/g, '<br>');
});

// property prop 또는 aptSeq 변경 시 상태 초기화
watch(() => [props.aptSeq, props.property?.deal_id], ([newAptSeq, newDealId], [oldAptSeq, oldDealId]) => {
  if (newAptSeq !== oldAptSeq || newDealId !== oldDealId) {
    isLoadingAiReport.value = false;
    aiReportData.value = null;
    showAiReport.value = false;
    error.value = null;
  }
});
</script>

<style scoped>
.circular-chart {
	display: block;
	margin: 0 auto;
	max-width: 100%;
	max-height: 250px;
}
.circle-bg {
	fill: none;
	stroke: #eee;
	stroke-width: 3.8;
}
.dark .circle-bg {
	stroke: #3f3f46;
}
.circle {
	fill: none;
	stroke-width: 2.8;
	stroke-linecap: round;
	animation: progress 1s ease-out forwards;
}
@keyframes progress {
	0% {
		stroke-dasharray: 0 100;
	}
}
</style>