<template>
	<div class="flex-grow container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-5xl">
		<div v-if="loading" class="text-center p-12">
			<p>게시글을 불러오는 중입니다...</p>
		</div>
		<div v-else-if="error" class="text-center p-12 text-red-500">
			<p>게시글을 불러오는 데 실패했습니다.</p>
		</div>
		<div v-else-if="board">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<div class="lg:col-span-8 space-y-8">
					<article
						class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
					>
						<!-- Article Header -->
						<div
							class="border-b border-gray-100 dark:border-gray-700 pb-6 mb-6"
						>
							<div class="flex items-center gap-2 mb-3">
								<span
									class="px-2.5 py-1 rounded text-xs font-bold"
									:class="categoryStyles[board.category]"
								>
									{{ categoryMap[board.category] }}
								</span>
							</div>
							<h1
								class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
							>
								{{ board.title }}
							</h1>
							<div class="flex flex-wrap items-center justify-between gap-4">
								<div class="flex items-center gap-3">
									<UserProfileAvatar
										:profile-image-url="board.profileImageUrl"
										:size="24"
									/>
									<div>
										<p
											class="text-sm font-semibold text-gray-800 dark:text-gray-200"
										>
											{{ board.nickname || '탈퇴한 사용자' }}
										</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											{{ new Date(board.createdAt).toLocaleString() }} &middot;
											조회 {{ board.hit }}
										</p>
									</div>
								</div>
								<div class="flex items-center gap-2">
									<button
										@click="handleEdit"
										class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
									>
										수정
									</button>
									<span class="text-gray-300 dark:text-gray-600">|</span>
									<button
										@click="handleDelete"
										class="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
									>
										삭제
									</button>
								</div>
							</div>
						</div>

						<!-- Article Body -->
						<div
							class="prose dark:prose-invert max-w-none mb-8 text-text-main-light dark:text-text-main-dark leading-relaxed"
							v-html="board.content"
						></div>

						<!-- Like & Share Buttons -->
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
								<span
									class="material-symbols-outlined fill-icon"
									:class="{ 'text-primary': isLiked }"
								>
									thumb_up
								</span>
								<span class="font-medium text-sm"
									>좋아요 {{ board.likeCount || 0 }}</span
								>
							</button>
							<button
								@click="handleShare"
								class="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
							>
								<span class="material-symbols-outlined text-gray-400"
									>share</span
								>
								<span class="font-medium text-sm">공유하기</span>
							</button>
						</div>
					</article>

					<!-- Comment Section -->
					<section
						class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
					>
						<h3 class="text-lg font-bold mb-6 flex items-center gap-2">
							댓글 ({{ board.commentCount || 0 }})
						</h3>
						<!-- Comment Form -->
						<div class="flex items-start gap-4 mb-6">
							<UserProfileAvatar
								:profile-image-url="user?.profileImageUrl"
								:size="24"
							/>
							<div class="flex-1">
								<form @submit.prevent="handleCreateComment">
									<textarea
										v-model="newComment"
										class="w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 text-sm focus:ring-primary focus:border-primary"
										placeholder="따뜻한 댓글을 남겨주세요."
										rows="3"
										required
									></textarea>
									<div class="flex justify-end mt-2">
										<button
											type="submit"
											class="px-5 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
										>
											댓글 등록
										</button>
									</div>
								</form>
							</div>
						</div>
						<!-- Comments List -->
						<div class="space-y-6">
							<div
								v-if="comments.length === 0"
								class="text-center text-gray-500 py-4"
							>
								<p>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
							</div>
							<div
								v-for="comment in comments"
								:key="comment.commentId"
								class="flex items-start gap-4"
							>
								<UserProfileAvatar
									:profile-image-url="comment.profileImageUrl"
									:size="24"
								/>
								<div class="flex-1">
									<div class="flex justify-between items-center mb-1">
										<span class="font-bold text-sm">{{
											comment.nickname || '탈퇴한 사용자'
										}}</span>
										<div class="flex items-center gap-2">
											<span class="text-xs text-gray-500 dark:text-gray-400">{{
												new Date(comment.createdAt).toLocaleString()
											}}</span>
											<button
												v-if="user && user.nickname === comment.nickname"
												@click="handleDeleteComment(comment.commentId)"
												class="text-xs text-red-500 hover:underline"
											>
												삭제
											</button>
										</div>
									</div>
									<p class="text-sm leading-relaxed">{{ comment.content }}</p>
								</div>
							</div>
						</div>
					</section>
				</div>
				<!-- ... (sidebar remains the same) ... -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getBoardById, likeBoard, deleteBoard } from '@/api/boards.api.js';
import {
	getCommentsByBoardId,
	createComment,
	deleteComment,
} from '@/api/comments.api.js';
import { user, isAuthenticated } from '@/stores/auth.store';
import UserProfileAvatar from '@/components/common/UserProfileAvatar.vue';

const route = useRoute();
const router = useRouter();
const board = ref(null);
const isLiked = ref(false);
const loading = ref(true);
const error = ref(null);
const comments = ref([]);
const newComment = ref('');

const categoryMap = {
	FREE: '자유게시판',
	REVIEW: '매매후기',
	QUESTION: '동네질문',
	INFO: '정보공유',
};

const categoryStyles = {
	FREE: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
	REVIEW:
		'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
	QUESTION:
		'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
	INFO: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const fetchBoard = async () => {
	loading.value = true;
	error.value = null;
	try {
		const boardId = route.params.id;
		const response = await getBoardById(boardId);
		board.value = response.data;
		isLiked.value = response.data.isLiked;
	} catch (err) {
		console.error('Failed to fetch board details:', err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};

const fetchComments = async () => {
	try {
		const boardId = route.params.id;
		const response = await getCommentsByBoardId(boardId);
		comments.value = response.data || [];
	} catch (err) {
		console.error('Failed to fetch comments:', err);
		comments.value = [];
	}
};

const handleLike = async () => {
	if (!board.value || !isAuthenticated.value) {
		if (!isAuthenticated.value) alert('로그인이 필요합니다.');
		return;
	}
	try {
		const response = await likeBoard(board.value.boardId);
		const liked = response.data;
		isLiked.value = liked;
		if (liked) {
			board.value.likeCount++;
		} else {
			board.value.likeCount--;
		}
	} catch (error) {
		console.error('Failed to like the board:', error);
	}
};

const handleCreateComment = async () => {
	if (!newComment.value.trim()) {
		alert('댓글 내용을 입력해주세요.');
		return;
	}
	if (!isAuthenticated.value) {
		alert('댓글을 작성하려면 로그인이 필요합니다.');
		return;
	}
	try {
		await createComment({
			boardId: board.value.boardId,
			content: newComment.value,
		});
		newComment.value = '';
		await fetchComments(); // Refresh comments
	} catch (error) {
		console.error('Failed to create comment:', error);
	}
};

const handleDeleteComment = async commentId => {
	if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
		return;
	}
	try {
		await deleteComment(commentId);
		await fetchComments(); // Refresh comments
	} catch (error) {
		console.error('Failed to delete comment:', error);
	}
};

const handleEdit = () => {
	// Check if the current user is the author of the post
	if (user.value && user.value.userId === board.value.userId) {
		router.push(`/boards/edit/${board.value.boardId}`);
	} else {
		alert('게시글을 수정할 권한이 없습니다.');
	}
};

const handleDelete = async () => {
	if (!isAuthenticated.value) {
		alert('로그인이 필요합니다.');
		return;
	}
	// Check if user data is loaded and if the user is the author
	if (!user.value || user.value.userId !== board.value.userId) {
		alert('게시글을 삭제할 권한이 없습니다.');
		return;
	}
	if (!board.value || !confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
		return;
	}
	try {
		await deleteBoard(board.value.boardId);
		alert('게시글이 삭제되었습니다.');
		router.push('/boards');
	} catch (error) {
		console.error('Failed to delete board:', error);
		// Interceptor will show an alert on error
	}
};

const handleShare = async () => {
	const shareUrl = window.location.href;
	const shareData = {
		title: board.value ? board.value.title : '게시글 공유',
		text: 'ZipCheck 게시글을 확인해보세요!',
		url: shareUrl,
	};

	try {
		if (navigator.share) {
			await navigator.share(shareData);
		} else {
			await navigator.clipboard.writeText(shareUrl);
			alert('게시글 링크가 클립보드에 복사되었습니다!');
		}
	} catch (err) {
		console.error('공유하기 실패:', err);
		// User might have cancelled the share dialog, or clipboard write failed
		if (err.name !== 'AbortError') {
			// AbortError means user cancelled
			alert('게시글 링크 복사에 실패했습니다.');
		}
	}
};

// Watch for changes in authentication status and re-fetch board details
watch(isAuthenticated, async (newVal, oldVal) => {
	// Only re-fetch if isAuthenticated changes from false to true
	if (newVal && !oldVal) {
		await fetchBoard();
	}
});

onMounted(async () => {
	await fetchBoard();
	await fetchComments();
});
</script>
<style>
.fill-icon {
	font-variation-settings: 'FILL' 1;
}
</style>
