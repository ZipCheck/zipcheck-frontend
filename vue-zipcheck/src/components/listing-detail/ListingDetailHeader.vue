<template>
	<section
		class="bg-card-light dark:bg-card-dark rounded-2xl shadow-soft p-6 md:p-8 border border-gray-50 dark:border-gray-800"
	>
		<div
			class="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b border-gray-100 dark:border-gray-700 pb-6"
		>
			<div>
				<div class="flex items-center gap-2 mb-2">
					<span
						class="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded"
						>매매</span
					>
					<span class="text-text-sub-light dark:text-text-sub-dark text-sm"
						>등록일 2023.10.27</span
					>
				</div>
				<h1 class="text-3xl font-bold mb-2">래미안 원베일리 108동</h1>
				<p
					class="text-text-sub-light dark:text-text-sub-dark flex items-center gap-1"
				>
					<span class="material-symbols-outlined text-sm">location_on</span>
					서울시 서초구 반포동
				</p>
			</div>
			<div class="text-right md:text-right w-full md:w-auto">
				<p class="text-sm text-text-sub-light dark:text-text-sub-dark mb-1">
					매매가
				</p>
				<p class="text-4xl font-bold text-primary dark:text-yellow-400">
					38억 5,000
				</p>
				<p class="text-sm text-text-sub-light dark:text-text-sub-dark mt-1">
					(평당 1.1억)
				</p>
			</div>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
			<div class="flex flex-col">
				<span
					class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium uppercase tracking-wider mb-1"
					>공급/전용면적</span
				>
				<span class="font-semibold text-lg">112㎡ / 84㎡</span>
			</div>
			<div class="flex flex-col">
				<span
					class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium uppercase tracking-wider mb-1"
					>해당층/총층</span
				>
				<span class="font-semibold text-lg">15층 / 35층</span>
			</div>
			<div class="flex flex-col">
				<span
					class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium uppercase tracking-wider mb-1"
					>방수/욕실수</span
				>
				<span class="font-semibold text-lg">3개 / 2개</span>
			</div>
			<div class="flex flex-col">
				<span
					class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium uppercase tracking-wider mb-1"
					>사용승인일</span
				>
				<span class="font-semibold text-lg">2023.08.31</span>
			</div>
		</div>
		<div class="mt-8 flex gap-3">
			<button
				class="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-text-main-dark font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
			>
				<span class="material-symbols-outlined">favorite_border</span>
				찜하기
			</button>
			<button
				class="flex-1 bg-primary hover:bg-primary-hover text-black font-bold py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
			>
				<span class="material-symbols-outlined">phone</span>
				문의하기
			</button>
		</div>
	</section>
</template>

<script setup></script>
