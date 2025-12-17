<template>
	<div class="flex-grow container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-5xl">
		<div v-if="board">
			<!-- ... (breadcrumb navigation remains the same) ... -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<div class="lg:col-span-8 space-y-8">
					<article
						class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
					>
						<!-- ... (article header remains the same) ... -->
						<div
							class="prose dark:prose-invert max-w-none mb-8 text-text-main-light dark:text-text-main-dark leading-relaxed"
							v-html="board.content"
						></div>
						<div
							class="flex items-center justify-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700"
						>
							<button
								@click="handleLike"
								:class="[
									'flex items-center gap-2 px-6 py-2.5 rounded-full border transition-colors',
									isLiked
										? 'border-primary text-primary bg-primary/10'
										: 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
								]"
							>
								<span class="material-symbols-outlined">
									{{ isLiked ? 'thumb_up' : 'thumb_up' }}
								</span>
								<span class="font-medium text-sm"
									>좋아요 {{ board.likeCount || 0 }}</span
								>
							</button>
							<button
								class="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
							>
								<span class="material-symbols-outlined text-gray-400"
									>share</span
								>
								<span class="font-medium text-sm">공유하기</span>
							</button>
						</div>
					</article>
					<section
						class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
					>
						<h3 class="text-lg font-bold mb-6 flex items-center gap-2">
							댓글
							<span class="text-primary">{{
								board.comments?.length || 0
							}}</span>
						</h3>
						<div v-if="isAuthenticated" class="mb-8 flex gap-4">
							<div
								class="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center font-bold text-sm text-black"
							>
								나
							</div>
							<div class="flex-grow">
								<textarea
									v-model="newComment"
									class="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white p-3 resize-none"
									placeholder="따뜻한 조언의 한마디를 남겨주세요."
									rows="3"
								></textarea>
								<div class="flex justify-end mt-2">
									<button
										@click="handleCommentSubmit"
										class="bg-black dark:bg-white text-white dark:text-black text-sm font-bold px-5 py-2 rounded-lg hover:opacity-80 transition-opacity"
									>
										등록하기
									</button>
								</div>
							</div>
						</div>
						<!-- ... (comment list remains the same) ... -->
					</section>
				</div>
				<!-- ... (sidebar remains the same) ... -->
			</div>
		</div>
		<div v-else class="text-center p-12">
			<p>게시글을 불러오는 중입니다...</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getBoardById, likeBoard } from '@/api/boards.api.js';
import { createComment } from '@/api/comments.api.js';
import { authStore } from '@/stores/auth.store';

const route = useRoute();
const board = ref(null);
const newComment = ref('');
const isLiked = ref(false);

const isAuthenticated = computed(() => authStore.isAuthenticated());

const fetchBoard = async () => {
	try {
		const boardId = route.params.id;
		const data = await getBoardById(boardId);
		board.value = data;
		isLiked.value = data.isLikedByCurrentUser || false; // Assuming the API returns this
	} catch (error) {
		console.error('Failed to fetch board details:', error);
	}
};

const handleLike = async () => {
	if (!board.value || !isAuthenticated.value) {
		if (!isAuthenticated.value) alert('로그인이 필요합니다.');
		return;
	}
	try {
		const response = await likeBoard(board.value.boardId);
		// Assuming API returns { likeCount: number, isLiked: boolean }
		board.value.likeCount = response.likeCount;
		isLiked.value = response.isLiked;
	} catch (error) {
		console.error('Failed to like the board:', error);
	}
};

const handleCommentSubmit = async () => {
	if (!board.value || !newComment.value.trim()) {
		alert('댓글 내용을 입력해주세요.');
		return;
	}
	try {
		const newCommentData = await createComment(board.value.boardId, {
			content: newComment.value,
		});
		// Add the new comment to the list without a full refresh
		if (!board.value.comments) {
			board.value.comments = [];
		}
		board.value.comments.unshift(newCommentData); // Add to the top of the list
		newComment.value = '';
	} catch (error) {
		console.error('Failed to submit comment:', error);
	}
};

onMounted(() => {
	fetchBoard();
});
</script>
<style scoped></style>
