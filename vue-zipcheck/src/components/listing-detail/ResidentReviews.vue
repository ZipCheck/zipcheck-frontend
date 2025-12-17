<template>
	<section
		class="bg-card-light dark:bg-card-dark rounded-2xl shadow-soft p-6 md:p-8 border border-gray-50 dark:border-gray-800"
	>
		<h2 class="text-xl font-bold mb-6 flex items-center gap-2">
			<span class="material-symbols-outlined text-primary">forum</span>
			실제 거주민 반응
		</h2>
		<div class="grid grid-cols-3 gap-4 mb-8">
			<div
				class="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 flex flex-col items-center justify-center border border-green-100 dark:border-green-800/30"
			>
				<div
					class="bg-white dark:bg-green-800 rounded-full w-10 h-10 flex items-center justify-center shadow-sm mb-2 text-2xl"
				>
					😊
				</div>
				<span class="font-bold text-green-700 dark:text-green-400">좋아요</span>
				<span class="text-sm text-green-600 dark:text-green-500">84%</span>
			</div>
			<div
				class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700"
			>
				<div
					class="bg-white dark:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center shadow-sm mb-2 text-2xl"
				>
					😐
				</div>
				<span class="font-bold text-gray-600 dark:text-gray-300">보통</span>
				<span class="text-sm text-gray-500 dark:text-gray-400">12%</span>
			</div>
			<div
				class="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 flex flex-col items-center justify-center border border-red-100 dark:border-red-800/30"
			>
				<div
					class="bg-white dark:bg-red-800 rounded-full w-10 h-10 flex items-center justify-center shadow-sm mb-2 text-2xl"
				>
					😫
				</div>
				<span class="font-bold text-red-700 dark:text-red-400">별로예요</span>
				<span class="text-sm text-red-600 dark:text-red-500">4%</span>
			</div>
		</div>
		<div class="space-y-4">
			<div
				class="flex items-start gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
			>
				<div
					class="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/50 rounded-full w-10 h-10 flex items-center justify-center text-xl"
				>
					👍
				</div>
				<div class="flex-grow">
					<div class="flex justify-between items-center mb-1">
						<span class="font-bold text-sm">반포토박이</span>
						<span class="text-xs text-text-sub-light dark:text-text-sub-dark"
							>1시간 전</span
						>
					</div>
					<p class="text-sm leading-relaxed">
						한강공원 접근성이 너무 좋고 커뮤니티 시설이 최고급입니다.
					</p>
				</div>
			</div>
			<div
				class="flex items-start gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
			>
				<div
					class="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 rounded-full w-10 h-10 flex items-center justify-center text-xl"
				>
					👀
				</div>
				<div class="flex-grow">
					<div class="flex justify-between items-center mb-1">
						<span class="font-bold text-sm">새집증후군</span>
						<span class="text-xs text-text-sub-light dark:text-text-sub-dark"
							>3시간 전</span
						>
					</div>
					<p class="text-sm leading-relaxed">
						학군 때문에 이사왔는데 주변 상가 아직 공실이 좀 있네요.
					</p>
				</div>
			</div>
			<div
				class="flex items-start gap-4 p-4 rounded-xl hover:bg-background-light dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
			>
				<div
					class="flex-shrink-0 bg-green-100 dark:bg-green-900/50 rounded-full w-10 h-10 flex items-center justify-center text-xl"
				>
					🚇
				</div>
				<div class="flex-grow">
					<div class="flex justify-between items-center mb-1">
						<span class="font-bold text-sm">출퇴근러</span>
						<span class="text-xs text-text-sub-light dark:text-text-sub-dark"
							>어제</span
						>
					</div>
					<p class="text-sm leading-relaxed">
						고속터미널역이랑 연결되어 있어서 비 안맞고 출근 가능해요.
					</p>
				</div>
			</div>
			<button
				class="w-full py-3 text-sm font-medium text-text-sub-light dark:text-text-sub-dark hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors mt-2"
			>
				후기 더보기 +
			</button>
		</div>
	</section>
</template>

<script setup></script>
