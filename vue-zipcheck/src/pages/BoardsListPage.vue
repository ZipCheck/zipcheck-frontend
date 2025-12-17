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
							<li>
								<label
									class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
								>
									<input
										checked=""
										class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
										name="category"
										type="radio"
									/>
									<span
										class="text-sm font-medium group-hover:text-primary transition-colors"
										>전체보기</span
									>
								</label>
							</li>
							<li>
								<label
									class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
								>
									<input
										class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
										name="category"
										type="radio"
									/>
									<span
										class="text-sm font-medium group-hover:text-primary transition-colors"
										>자유게시판</span
									>
								</label>
							</li>
							<li>
								<label
									class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
								>
									<input
										class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
										name="category"
										type="radio"
									/>
									<span
										class="text-sm font-medium group-hover:text-primary transition-colors"
										>매매후기</span
									>
								</label>
							</li>
							<li>
								<label
									class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
								>
									<input
										class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
										name="category"
										type="radio"
									/>
									<span
										class="text-sm font-medium group-hover:text-primary transition-colors"
										>동네질문</span
									>
								</label>
							</li>
							<li>
								<label
									class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
								>
									<input
										class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
										name="category"
										type="radio"
									/>
									<span
										class="text-sm font-medium group-hover:text-primary transition-colors"
										>인테리어</span
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
								boards.length
							}}</span
							>개의 글이 있습니다.
						</div>
						<div class="flex items-center gap-2">
							<select
								class="form-select text-sm border-gray-200 dark:border-gray-700 rounded-lg bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-primary py-2 pr-8 pl-3 cursor-pointer"
							>
								<option>최신순</option>
								<option>인기순</option>
							</select>
						</div>
					</div>
					<div class="space-y-4">
						<router-link
							v-for="board in boards"
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
												class="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
												>{{ board.category || '자유게시판' }}</span
											>
											<span
												class="text-xs text-text-sub-light dark:text-text-sub-dark"
												>{{
													new Date(board.createdAt).toLocaleDateString()
												}}</span
											>
										</div>
										<h2
											class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
										>
											{{ board.title }}
										</h2>
										<p
											class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4 line-clamp-2"
										>
											{{ board.content }}
										</p>
										<div class="flex items-center justify-between">
											<div class="flex items-center gap-3">
												<div class="flex items-center gap-2">
													<img
														alt="User Avatar"
														class="w-6 h-6 rounded-full"
														:src="
															board.writerAvatar ||
															'https://lh3.googleusercontent.com/a/ACg8ocK_3_4c-B4o-2T_nS5sL_2n3-jBC_0iL_w'
														"
													/>
													<span
														class="text-xs font-medium text-gray-700 dark:text-gray-300"
														>{{ board.writer }}</span
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
														>chat_bubble_outline</span
													>
													<span>{{ board.commentCount || 0 }}</span>
												</div>
												<div class="flex items-center gap-1">
													<span class="material-symbols-outlined text-[14px]"
														>visibility</span
													>
													<span>{{ board.viewCount || 0 }}</span>
												</div>
											</div>
										</div>
									</div>
									<div
										v-if="board.thumbnail"
										class="hidden sm:block w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0"
									>
										<img
											alt="Apartment Interior"
											class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
											:src="board.thumbnail"
										/>
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
import { ref, onMounted } from 'vue';
import { getBoards } from '@/api/boards.api.js';

const boards = ref([]);

const fetchBoards = async () => {
	try {
		const data = await getBoards();
		// Assuming the response is the array of boards
		boards.value = data || [];
	} catch (error) {
		console.error('Failed to fetch boards:', error);
		// The interceptor will handle user notification
	}
};

onMounted(() => {
	fetchBoards();
});
</script>
<style scoped></style>
