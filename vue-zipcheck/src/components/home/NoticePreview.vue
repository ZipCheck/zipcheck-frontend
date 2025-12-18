<template>
	<div
		class="bg-white rounded-[2rem] border border-border-color p-8 shadow-soft h-full"
	>
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-xl font-bold flex items-center gap-2">
				<span class="material-symbols-outlined text-primary-dark"
					>campaign</span
				>
				최근 공지사항
			</h3>
			<router-link
				to="/notices"
				class="text-sm font-medium text-text-muted hover:text-primary-dark"
				>더보기</router-link
			>
		</div>
		<div class="space-y-4">
			<router-link
				v-for="notice in recentNotices"
				:key="notice.noticeId"
				:to="`/notices`"
				class="flex gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer items-start"
			>
				<div class="mt-1">
					<span
						:class="categoryClasses[notice.category]"
						class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
					>
						{{ categoryMap[notice.category] }}
					</span>
				</div>
				<div class="flex-1">
					<p class="text-sm font-semibold text-text-main line-clamp-1">
						{{ notice.title }}
					</p>
					<p class="text-xs text-text-muted mt-1">
						{{ new Date(notice.createdAt).toLocaleDateString() }}
					</p>
				</div>
			</router-link>
			<div v-if="loading" class="text-center p-4">
				<p>로딩 중...</p>
			</div>
			<div
				v-if="!loading && recentNotices.length === 0"
				class="text-center p-4"
			>
				<p class="text-sm text-text-muted">최근 공지사항이 없습니다.</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getNotices } from '@/api/notices.api.js';

const notices = ref([]);
const loading = ref(true);

const recentNotices = computed(() => notices.value.slice(0, 3));

const categoryMap = {
	IMPORTANT: '중요',
	NORMAL: '일반',
	UPDATE: '업데이트',
};

const categoryClasses = {
	IMPORTANT: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
	NORMAL: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
	UPDATE: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
};

onMounted(async () => {
	try {
		const response = await getNotices();
		notices.value = response.data || [];
	} catch (error) {
		console.error('Failed to fetch recent notices:', error);
	} finally {
		loading.value = false;
	}
});
</script>
