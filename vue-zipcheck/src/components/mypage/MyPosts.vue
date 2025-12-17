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
		<div v-if="loading" class="text-center">
			<p>게시글을 불러오는 중...</p>
		</div>
		<div v-else-if="error" class="text-center text-red-500">
			<p>게시글을 불러오는 중 오류가 발생했습니다.</p>
		</div>
		<div v-else-if="posts.length === 0" class="text-center">
			<p>작성한 게시글이 없습니다.</p>
		</div>
		<div v-else>
			<ul class="space-y-4">
				<li
					v-for="post in posts"
					:key="post.boardId"
					class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow transition hover:shadow-md"
				>
					<router-link :to="`/boards/${post.boardId}`" class="block">
						<h3 class="font-bold text-lg text-primary dark:text-yellow-400">
							{{ post.title }}
						</h3>
						<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
							{{ new Date(post.createdAt).toLocaleDateString() }}
						</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMyBoards } from '@/api/boards.api.js';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
	try {
		posts.value = await getMyBoards();
	} catch (err) {
		console.error('게시글을 불러오는 데 실패했습니다:', err);
		error.value = err;
	} finally {
		loading.value = false;
	}
});
</script>
