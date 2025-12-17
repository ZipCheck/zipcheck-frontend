<template>
	<section
		class="bg-card-light dark:bg-card-dark rounded-2xl shadow-soft p-6 md:p-8 border border-gray-50 dark:border-gray-800 sticky top-24"
	>
		<div class="flex items-center gap-2 mb-6">
			<span class="material-symbols-outlined text-primary">psychology</span>
			<h2 class="text-xl font-bold">AI 분석 리포트</h2>
		</div>
		<div class="flex flex-col items-center mb-8 relative">
			<svg class="circular-chart w-48 h-48 text-primary" viewBox="0 0 36 36">
				<path
					class="circle-bg"
					d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
				></path>
				<path
					class="circle stroke-primary"
					d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
					stroke-dasharray="88, 100"
				></path>
			</svg>
			<div class="absolute inset-0 flex flex-col items-center justify-center">
				<span
					class="text-xs font-semibold text-text-sub-light dark:text-text-sub-dark uppercase"
					>종합 점수</span
				>
				<span
					class="text-5xl font-bold text-text-main-light dark:text-text-main-dark"
					>88<span class="text-2xl text-text-sub-light dark:text-text-sub-dark"
						>점</span
					></span
				>
			</div>
		</div>
		<div class="space-y-4 mb-8">
			<div
				class="bg-background-light dark:bg-background-dark p-4 rounded-xl border border-gray-100 dark:border-gray-700"
			>
				<h3 class="font-bold text-sm mb-2 flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-green-500"></span>
					가격 경쟁력
				</h3>
				<div
					class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2"
				>
					<div class="bg-green-500 h-2.5 rounded-full" style="width: 70%"></div>
				</div>
				<p class="text-xs text-text-sub-light dark:text-text-sub-dark">
					주변 시세 대비
					<span class="text-green-600 dark:text-green-400 font-bold">적정</span>
					수준입니다.
				</p>
			</div>
			<div
				class="bg-background-light dark:bg-background-dark p-4 rounded-xl border border-gray-100 dark:border-gray-700"
			>
				<h3 class="font-bold text-sm mb-2 flex items-center gap-2">
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					교통 / 인프라
				</h3>
				<div
					class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2"
				>
					<div class="bg-primary h-2.5 rounded-full" style="width: 95%"></div>
				</div>
				<p class="text-xs text-text-sub-light dark:text-text-sub-dark">
					반경 500m 내 인프라가
					<span class="text-primary-dark font-bold">매우 우수</span>합니다.
				</p>
			</div>
		</div>
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
				class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed text-justify"
			>
				이 매물은 동일 권역 내 유사 평형대와 비교했을 때
				<strong class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
					>높은 가격 경쟁력</strong
				>을 보유하고 있습니다. 특히 3호선, 7호선, 9호선 트리플 역세권으로 교통
				접근성이 탁월하며, 단지 내 커뮤니티 시설에 대한 거주민 만족도가 상위
				5%에 해당합니다.
			</p>
		</div>
		<p
			class="text-xs text-text-sub-light dark:text-text-sub-dark text-center leading-normal"
		>
			※ 본 분석은 AI가 주변 부동산 데이터와 실거래가를 기반으로 생성한 참고용
			정보입니다. 실제 거래 시 법적 효력을 갖지 않습니다.
		</p>
	</section>
</template>

<script setup></script>

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
.percentage {
	fill: #666;
	font-family: sans-serif;
	font-weight: bold;
	font-size: 0.5em;
	text-anchor: middle;
}
.dark .percentage {
	fill: #fff;
}
</style>
