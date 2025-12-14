<template>
	<div
		class="flex flex-col min-h-screen bg-panel-light dark:bg-background-dark font-display"
	>
		<!-- Header -->
		<Header />

		<!-- Main Content -->
		<main class="flex-1 flex items-center justify-center py-12 px-4">
			<div class="w-full max-w-3xl mx-auto">
				<div class="text-center mb-10">
					<h1 class="text-4xl font-extrabold mb-3">어떤 집을 찾고 계신가요?</h1>
					<p
						class="text-lg text-text-light-secondary dark:text-text-dark-secondary"
					>
						원하는 정보를 검색하고 커뮤니티와 소통해보세요.
					</p>
				</div>

				<div class="relative mb-12">
					<input
						class="form-input w-full rounded-full bg-background-light dark:bg-panel-dark border-border-light dark:border-border-dark h-16 pl-6 pr-16 text-lg placeholder:text-text-light-secondary dark:placeholder:text-text-dark-secondary focus:ring-2 focus:ring-primary focus:border-primary shadow-lg"
						placeholder="아파트/단지명, 지역, 게시글 등 검색"
						type="text"
					/>
					<button
						class="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:opacity-90 transition-opacity"
					>
						<span class="material-symbols-outlined text-2xl">search</span>
					</button>
				</div>

				<!-- Notice & Posts -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<!-- 공지사항 -->
					<div
						class="bg-background-light dark:bg-panel-dark p-6 rounded-xl border border-border-light dark:border-border-dark"
					>
						<div class="flex items-center justify-between mb-4">
							<h3 class="text-lg font-bold">공지사항</h3>
							<a
								href="#"
								class="text-sm font-medium text-primary hover:underline"
								>더보기</a
							>
						</div>

						<!-- 공지사항 목록 -->
						<div class="space-y-3">
							<!-- 네가 제공한 HTML 그대로 유지 -->
							<!-- (각 항목 그대로 붙여넣어도 되고, 나중에 API로 바꿀 예정) -->
							<div class="flex items-center justify-between text-sm">
								<div class="flex items-center gap-2 overflow-hidden">
									<span
										class="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full"
										>공지</span
									>
									<p class="truncate">시스템 점검 안내 (2024-08-15)</p>
								</div>
								<span
									class="text-xs text-text-light-secondary dark:text-text-dark-secondary"
									>2024.08.10</span
								>
							</div>

							<!-- ... 나머지 공지 그대로 ... -->
						</div>
					</div>

					<!-- 최신 게시글 -->
					<div
						class="bg-background-light dark:bg-panel-dark p-6 rounded-xl border border-border-light dark:border-border-dark"
					>
						<div class="flex items-center justify-between mb-4">
							<h3 class="text-lg font-bold">최신 게시글</h3>
							<a
								href="#"
								class="text-sm font-medium text-primary hover:underline"
								>더보기</a
							>
						</div>

						<div class="space-y-3">
							<!-- 네가 주었던 최신 게시글 그대로 붙여넣기 -->
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue';
</script>

<style>
.material-symbols-outlined {
	font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
