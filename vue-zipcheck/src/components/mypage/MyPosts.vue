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
		<div class="text-center py-10">
			<p class="text-gray-600 dark:text-gray-300">준비 중인 기능입니다.</p>
		</div>
	</div>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
// import { getMyBoards } from '@/api/boards.api.js';

// const posts = ref([]);
// const loading = ref(true);
// const error = ref(null);

// onMounted(async () => {
// 	try {
// 		posts.value = await getMyBoards();
// 	} catch (err) {
// 		console.error('게시글을 불러오는 데 실패했습니다:', err);
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// });
</script>
