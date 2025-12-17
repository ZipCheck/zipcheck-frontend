<template>
	<section
		class="flex-grow relative h-full bg-gray-200 dark:bg-gray-900 overflow-hidden"
	>
		<div class="absolute inset-0 map-pattern z-0"></div>
		<div
			class="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
		>
			<div
				class="bg-primary text-text-main-light font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border-2 border-white dark:border-gray-700 transform transition-transform group-hover:scale-110"
			>
				20.5억
			</div>
			<div
				class="absolute left-1/2 bottom-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white dark:border-t-gray-700 transform -translate-x-1/2 translate-y-full"
			></div>
		</div>
		<div
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
		>
			<div
				class="bg-white dark:bg-gray-800 text-text-main-light dark:text-text-main-dark font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 transform transition-transform group-hover:scale-110 flex items-center gap-1"
			>
				<span class="w-2 h-2 rounded-full bg-green-500"></span>
				12억
			</div>
		</div>
		<div
			class="absolute top-[60%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
		>
			<div
				class="bg-white dark:bg-gray-800 text-text-main-light dark:text-text-main-dark font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 transform transition-transform group-hover:scale-110 flex items-center gap-1"
			>
				<span class="w-2 h-2 rounded-full bg-purple-500"></span>
				8.5억
			</div>
		</div>
		<div
			class="absolute top-6 left-1/2 transform -translate-x-1/2 z-20 w-[90%] max-w-2xl"
		>
			<div
				class="bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md p-2 rounded-full shadow-soft border border-white/50 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 pr-3 pl-4 py-2"
			>
				<div class="flex items-center gap-3 w-full md:w-auto">
					<div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
					<span
						class="text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap"
						>현재 위치 인증이 필요합니다</span
					>
				</div>
				<div class="flex items-center gap-2 w-full md:w-auto justify-end">
					<button
						class="bg-text-main-light dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm whitespace-nowrap"
					>
						<span class="material-symbols-outlined text-[16px]"
							>my_location</span
						>
						위치 인증하기
					</button>
					<div
						class="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2 hidden md:block"
					></div>
					<div class="flex items-center gap-1">
						<button
							class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 flex items-center justify-center transition-colors group"
							title="좋아요"
						>
							<span
								class="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-green-600 dark:text-gray-500 dark:group-hover:text-green-400"
								>sentiment_satisfied</span
							>
						</button>
						<button
							class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 flex items-center justify-center transition-colors group"
							title="보통"
						>
							<span
								class="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-yellow-600 dark:text-gray-500 dark:group-hover:text-yellow-400"
								>sentiment_neutral</span
							>
						</button>
						<button
							class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center transition-colors group"
							title="별로예요"
						>
							<span
								class="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-red-600 dark:text-gray-500 dark:group-hover:text-red-400"
								>sentiment_dissatisfied</span
							>
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="absolute bottom-8 right-8 z-20 flex flex-col gap-3 items-end">
			<div
				class="bg-surface-light dark:bg-surface-dark text-xs px-3 py-1.5 rounded-lg shadow-md mb-1 animate-bounce border border-gray-100 dark:border-gray-700"
			>
				위치 인증 후 후기를 남겨보세요!
			</div>
			<button
				class="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-white cursor-not-allowed border-4 border-surface-light dark:border-surface-dark"
				disabled=""
			>
				<span class="material-symbols-outlined text-[28px]">add_reaction</span>
			</button>
		</div>
		<div class="absolute bottom-8 right-28 z-20 flex gap-2">
			<div
				class="flex flex-col bg-surface-light dark:bg-surface-dark rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden"
			>
				<button
					class="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors"
				>
					<span
						class="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[20px]"
						>add</span
					>
				</button>
				<button
					class="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
				>
					<span
						class="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[20px]"
						>remove</span
					>
				</button>
			</div>
			<button
				class="p-2 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
			>
				<span
					class="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[20px]"
					>my_location</span
				>
			</button>
		</div>
	</section>
</template>

<script setup></script>

<style scoped>
.map-pattern {
	background-color: #e5e5f7;
	opacity: 0.8;
	background-image: linear-gradient(#d1d5db 1px, transparent 1px),
		linear-gradient(to right, #d1d5db 1px, transparent 1px);
	background-size: 40px 40px;
}
.dark .map-pattern {
	background-color: #1a1a1a;
	background-image: linear-gradient(#333 1px, transparent 1px),
		linear-gradient(to right, #333 1px, transparent 1px);
}
</style>
