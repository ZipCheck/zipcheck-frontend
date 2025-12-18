<template>
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="text-center mb-12">
			<h1 class="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
				공지사항
			</h1>
			<p
				class="text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto"
			>
				ZipCheck의 새로운 소식과 업데이트, 그리고 중요한 정책 변경 사항을
				확인하세요.
			</p>
		</div>
		<div
			class="flex flex-col sm:flex-row justify-center items-center mb-8 gap-4"
		>
			<div class="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
				<button
					v-for="cat in categories"
					:key="cat.value"
					@click="changeCategory(cat.value)"
					:class="[
						'px-4 py-2 text-sm font-medium rounded-md transition-colors',
						selectedCategory === cat.value
							? 'bg-white dark:bg-gray-700 text-text-light dark:text-text-dark shadow-sm'
							: 'text-text-muted-light dark:text-text-muted-dark hover:bg-gray-200 dark:hover:bg-gray-700/50',
					]"
				>
					{{ cat.label }}
				</button>
			</div>
			<button @click="router.push('/notices/new')" class="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors">
				공지 작성
			</button>
		</div>

		<div v-if="loading" class="text-center py-10">
			<p class="text-text-muted-light">공지사항을 불러오는 중...</p>
		</div>
		<div v-else-if="error" class="text-center py-10 text-red-500">
			<p>공지사항을 불러오는 중 오류가 발생했습니다.</p>
		</div>
		<div v-else-if="notices.length === 0" class="text-center py-10">
			<p class="text-text-muted-light">등록된 공지사항이 없습니다.</p>
		</div>

		<div v-else class="space-y-3">
			<div
				v-for="notice in notices"
				:key="notice.noticeId"
				class="group bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-200 overflow-hidden"
			>
				<div
					@click="handleNoticeClick(notice.noticeId)"
					class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 cursor-pointer"
				>
					<div class="flex-1">
						<div class="flex items-center gap-3 mb-2">
							<span
								:class="categoryClasses[notice.category]"
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
							>
								{{ categoryMap[notice.category] }}
							</span>
							<span
								class="text-xs text-text-muted-light dark:text-text-muted-dark"
								>{{ new Date(notice.createdAt).toLocaleDateString() }}</span
							>
						</div>
						<h3
							class="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors"
						>
							{{ notice.title }}
						</h3>
					</div>
					<div class="hidden sm:block">
						<span
							class="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark group-hover:text-primary transition-all duration-300"
							:class="{ 'rotate-90': activeNoticeId === notice.noticeId }"
							>chevron_right</span
						>
					</div>
				</div>
				<div
					v-if="activeNoticeId === notice.noticeId"
					class="px-6 pb-6 pt-2"
				>
					<div v-if="noticeDetails[notice.noticeId]"
						class="prose dark:prose-invert max-w-none text-text-main-light dark:text-text-main-dark border-t border-border-light dark:border-border-dark pt-4"
						>
						<div v-html="noticeDetails[notice.noticeId]"></div>
						<div class="flex justify-end gap-2 mt-4 not-prose">
							<button @click.stop="handleEdit(notice.noticeId)" class="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors px-3 py-1 rounded-md">수정</button>
							<button @click.stop="handleDelete(notice.noticeId)" class="text-sm font-medium text-red-500 hover:text-red-700 transition-colors px-3 py-1 rounded-md">삭제</button>
						</div>
					</div>
					<div v-else class="text-center">
						<p>내용을 불러오는 중...</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getNotices, getNoticeById, deleteNotice } from '@/api/notices.api.js';

const router = useRouter();
const notices = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedCategory = ref('ALL');
const activeNoticeId = ref(null);
const noticeDetails = ref({});

const categories = [
	{ label: '전체', value: 'ALL' },
	{ label: '중요', value: 'IMPORTANT' },
	{ label: '일반', value: 'NORMAL' },
	{ label: '업데이트', value: 'UPDATE' },
];

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

const fetchNotices = async () => {
	loading.value = true;
	error.value = null;
	try {
		const categoryParam = selectedCategory.value === 'ALL' ? undefined : selectedCategory.value;
		const response = await getNotices(categoryParam);
		notices.value = response.data || [];
	} catch (err) {
		console.error('Failed to fetch notices:', err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};

const changeCategory = (category) => {
	selectedCategory.value = category;
	activeNoticeId.value = null; // Close any open notice when changing category
	fetchNotices();
};

const handleNoticeClick = async (noticeId) => {
	if (activeNoticeId.value === noticeId) {
		activeNoticeId.value = null; // Close if already open
		return;
	}

	activeNoticeId.value = noticeId;

	// Fetch details if not already cached
	if (!noticeDetails.value[noticeId]) {
		try {
			const response = await getNoticeById(noticeId);
			noticeDetails.value[noticeId] = response.data.content;
		} catch (err) {
			console.error('Failed to fetch notice content:', err);
			noticeDetails.value[noticeId] = '<p>공지 내용을 불러오는데 실패했습니다.</p>';
		}
	}
};

const handleEdit = (noticeId) => {
	router.push(`/notices/edit/${noticeId}`);
};

const handleDelete = async (noticeId) => {
	if (!confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
		return;
	}
	try {
		await deleteNotice(noticeId);
		alert('공지사항이 삭제되었습니다.');
		// Remove from local list for instant UI update
		notices.value = notices.value.filter(n => n.noticeId !== noticeId);
		if (activeNoticeId.value === noticeId) {
			activeNoticeId.value = null;
		}
	} catch (error) {
		console.error('Failed to delete notice:', error);
		// Interceptor will show an alert
	}
};

onMounted(() => {
	fetchNotices();
});
</script>
<style scoped></style>
