<template>
	<div
		class="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-soft border border-border-light dark:border-border-dark p-8"
	>
		<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
			내가 작성한 게시글
		</h1>
		<p class="text-gray-500 dark:text-gray-400 mb-8">
			내가 작성한 게시글 목록입니다.
		</p>

		<div v-if="loading" class="text-center py-10">
			<p class="text-gray-600 dark:text-gray-300">게시글을 불러오는 중...</p>
		</div>
		<div v-else-if="error" class="text-center py-10 text-red-500">
			<p>게시글을 불러오는 중 오류가 발생했습니다.</p>
		</div>
		<div v-else-if="myPosts.length === 0" class="text-center py-10">
			<p class="text-gray-600 dark:text-gray-300">작성한 게시글이 없습니다.</p>
		</div>

		<div v-else class="space-y-4">
			<article
				v-for="post in myPosts"
				:key="post.boardId"
				@click="handlePostClick(post.boardId)"
				class="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer"
			>
				<div class="flex justify-between items-start gap-4">
					<div class="flex-1">
						<div class="flex items-center gap-2 mb-2">
							<span
								class="px-2 py-0.5 rounded text-xs font-bold"
								:class="categoryStyles[post.category]"
							>
								{{ categoryMap[post.category] || '기타' }}
							</span>
							<span class="text-xs text-text-sub-light dark:text-text-sub-dark">
								{{ new Date(post.createdAt).toLocaleDateString() }}
							</span>
						</div>
						<h2
							class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
						>
							{{ post.title }}
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
										>{{ post.nickname }}</span
									>
								</div>
							</div>
							<div
								class="flex items-center gap-3 text-xs text-text-sub-light dark:text-text-sub-dark"
							>
								<div
									class="flex items-center gap-1"
									:class="post.isLiked ? 'text-red-500' : 'text-gray-400'"
								>
									<span
										class="material-symbols-outlined text-[14px]"
										:style="{
											'font-variation-settings': post.isLiked
												? '\'FILL\' 1'
												: '\'FILL\' 0',
										}"
										>favorite</span
									>
									<span>{{ post.likeCount || 0 }}</span>
								</div>
								<div class="flex items-center gap-1">
									<span class="material-symbols-outlined text-[14px]"
										>visibility</span
									>
									<span>{{ post.hit || 0 }}</span>
								</div>
								<div class="flex items-center gap-1">
									<span class="material-symbols-outlined text-[14px]"
										>chat_bubble</span
									>
									<span>{{ post.commentCount || 0 }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getMyBoards } from '@/api/boards.api.js';

const router = useRouter();
const myPosts = ref([]);
const loading = ref(true);
const error = ref(null);

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

const fetchMyPosts = async () => {
	loading.value = true;
	error.value = null;
	try {
		const response = await getMyBoards();
		myPosts.value = response.data || [];
	} catch (err) {
		console.error('Failed to fetch my posts:', err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};

const handlePostClick = boardId => {
	router.push(`/boards/${boardId}`);
};

onMounted(() => {
	fetchMyPosts();
});
</script>
