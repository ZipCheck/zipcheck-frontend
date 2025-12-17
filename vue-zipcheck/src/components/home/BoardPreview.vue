<template>
	<div
		class="bg-white rounded-[2rem] border border-border-color p-8 shadow-soft h-full"
	>
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-xl font-bold flex items-center gap-2">
				<span class="material-symbols-outlined text-primary-dark">forum</span>
				최근 커뮤니티 글
			</h3>
			<router-link
				to="/boards"
				class="text-sm font-medium text-text-muted hover:text-primary-dark"
				>더보기</router-link
			>
		</div>
		<div class="space-y-4">
			<router-link
				v-for="board in recentBoards"
				:key="board.boardId"
				:to="`/boards/${board.boardId}`"
				class="flex items-center gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer"
			>
				<img
					alt="User avatar"
					class="size-10 rounded-full bg-gray-200 object-cover"
					:src="
						board.writerAvatar ||
						'https://lh3.googleusercontent.com/a/ACg8ocK_3_4c-B4o-2T_nS5sL_2n3-jBC_0iL_w'
					"
				/>
				<div class="flex-1 min-w-0">
					<div class="flex items-center gap-2 mb-0.5">
						<span
							class="text-xs font-bold text-primary-dark bg-yellow-50 px-2 py-0.5 rounded-md"
							>{{ board.category || '자유게시판' }}</span
						>
						<span class="text-xs text-text-muted">{{
							new Date(board.createdAt).toLocaleDateString()
						}}</span>
					</div>
					<p class="text-sm font-semibold text-text-main truncate">
						{{ board.title }}
					</p>
				</div>
			</router-link>
			<div v-if="loading" class="text-center p-4">
				<p>로딩 중...</p>
			</div>
			<div v-if="!loading && recentBoards.length === 0" class="text-center p-4">
				<p class="text-sm text-text-muted">최근 게시글이 없습니다.</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getBoards } from '@/api/boards.api.js';

const boards = ref([]);
const loading = ref(true);

const recentBoards = computed(() => boards.value.slice(0, 3));

onMounted(async () => {
	try {
		const data = await getBoards();
		// Assuming the API returns boards sorted by date descending
		boards.value = data || [];
	} catch (error) {
		console.error('Failed to fetch recent boards:', error);
	} finally {
		loading.value = false;
	}
});
</script>
