<template>
	<div>
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="flex flex-col lg:flex-row gap-8">
				<aside class="w-full lg:w-64 flex-shrink-0 space-y-8">
					<router-link to="/boards/write">
						<button
							class="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
						>
							<span class="material-symbols-outlined text-xl">edit</span>
							글쓰기
						</button>
					</router-link>
					<div
						class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
					>
						<h3 class="font-bold text-lg mb-4 flex items-center gap-2">
							<span class="material-symbols-outlined text-primary"
								>category</span
							>
							카테고리
						</h3>
						<ul class="space-y-2">
							<li v-for="cat in categories" :key="cat.value">
								<label
									class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
								>
									<input
										type="radio"
										name="category"
										:value="cat.value"
										v-model="selectedCategory"
										class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
									/>
									<span
										class="text-sm font-medium group-hover:text-primary transition-colors"
										>{{ cat.label }}</span
									>
								</label>
							</li>
						</ul>
					</div>
				</aside>
				<div class="flex-1">
					<div class="flex flex-wrap justify-between items-center mb-6 gap-4">
						<div class="text-sm text-text-sub-light dark:text-text-sub-dark">
							총
							<span class="font-bold text-gray-900 dark:text-white">{{
								filteredBoards.length
							}}</span
							>개의 글이 있습니다.
						</div>
						<div class="flex items-center gap-2">
							<select
								v-model="sortOrder"
								@change="fetchBoards"
								class="form-select text-sm border-gray-200 dark:border-gray-700 rounded-lg bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-primary py-2 pr-8 pl-3 cursor-pointer"
							>
								<option value="latest">최신순</option>
								<option value="likes">인기순</option>
							</select>
						</div>
					</div>

					<div v-if="loading" class="text-center py-10">
						<p>게시글을 불러오는 중...</p>
					</div>
					<div v-else-if="error" class="text-center py-10 text-red-500">
						<p>오류가 발생했습니다: {{ error.message }}</p>
					</div>
					<div v-else-if="filteredBoards.length === 0" class="text-center py-10">
						<p>표시할 게시글이 없습니다.</p>
					</div>

					<div v-else class="space-y-4">
						<router-link
							v-for="board in filteredBoards"
							:key="board.boardId"
							:to="`/boards/${board.boardId}`"
						>
							<article
								class="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer"
							>
								<div class="flex justify-between items-start gap-4">
									<div class="flex-1">
										<div class="flex items-center gap-2 mb-2">
											<span
												class="px-2 py-0.5 rounded text-xs font-bold"
												:class="categoryStyles[board.category]"
											>
												{{ categoryMap[board.category] || '기타' }}
											</span>
											<span
												class="text-xs text-text-sub-light dark:text-text-sub-dark"
											>
												{{ new Date(board.createdAt).toLocaleDateString() }}
											</span>
										</div>
										<h2
											class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
										>
											{{ board.title }}
										</h2>
										<div class="flex items-center justify-between mt-4">
											<div class="flex items-center gap-3">
												<div class="flex items-center gap-2">
													<img
														alt="User Avatar"
														class="w-6 h-6 rounded-full bg-gray-200"
														src="@/assets/images/default-avatar.svg"
													/>
													<span
														class="text-xs font-medium text-gray-700 dark:text-gray-300"
														>{{ board.nickname }}</span
													>
												</div>
											</div>
											<div
												class="flex items-center gap-3 text-xs text-text-sub-light dark:text-text-sub-dark"
											>
												<div class="flex items-center gap-1 text-red-500">
													<span class="material-symbols-outlined text-[14px]"
														>favorite</span
													>
													<span>{{ board.likeCount || 0 }}</span>
												</div>
												<div class="flex items-center gap-1">
													<span class="material-symbols-outlined text-[14px]"
														>visibility</span
													>
													<span>{{ board.hit || 0 }}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</article>
						</router-link>
					</div>
					<div class="mt-12 flex justify-center">
						<!-- Pagination will be implemented later if needed -->
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getBoards } from '@/api/boards.api.js';

const boards = ref([]);
const loading = ref(true);
const error = ref(null);
const sortOrder = ref('latest');
const selectedCategory = ref('ALL');

const categories = [
	{ value: 'ALL', label: '전체보기' },
	{ value: 'FREE', label: '자유게시판' },
	{ value: 'REVIEW', label: '매매후기' },
	{ value: 'QUESTION', label: '동네질문' },
	{ value: 'INFO', label: '정보공유' },
];

const categoryMap = {
	FREE: '자유게시판',
	REVIEW: '매매후기',
	QUESTION: '동네질문',
	INFO: '정보공유',
};

const categoryStyles = {
	FREE: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
	REVIEW: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
	QUESTION: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
	INFO: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const filteredBoards = computed(() => {
	if (selectedCategory.value === 'ALL') {
		return boards.value;
	}
	return boards.value.filter(
		board => board.category === selectedCategory.value,
	);
});

const fetchBoards = async () => {
	loading.value = true;
	error.value = null;
	try {
		const response = await getBoards(sortOrder.value);
		boards.value = response.data || [];
	} catch (err) {
		console.error('Failed to fetch boards:', err);
		error.value = err;
		// The interceptor will handle user notification
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	fetchBoards();
});
</script>
<style scoped></style>
