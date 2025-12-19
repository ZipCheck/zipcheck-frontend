<template>
	<div class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-text-main-light dark:text-white mb-2">
				{{ isEditMode ? '공지사항 수정' : '공지사항 작성' }}
			</h1>
			<p class="text-text-sub-light dark:text-text-sub-dark">
				새로운 소식이나 중요한 변경사항을 사용자에게 명확하게 전달해주세요.
			</p>
		</div>
		<div
			class="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-10"
		>
			<form @submit.prevent="handleSubmit" class="space-y-8">
				<div>
					<label
						class="block text-sm font-bold text-text-main-light dark:text-gray-200 mb-2"
						for="category"
						>카테고리</label
					>
					<select
						v-model="form.category"
						class="w-full sm:w-1/2 rounded-lg border-border-light dark:border-border-dark bg-gray-50 dark:bg-zinc-800 text-text-main-light dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent py-3 px-4 transition-shadow"
						id="category"
						name="category"
						required
					>
						<option disabled value="">카테고리를 선택해주세요</option>
						<option value="IMPORTANT">중요</option>
						<option value="NORMAL">일반</option>
						<option value="UPDATE">업데이트</option>
					</select>
				</div>
				<div>
					<label
						class="block text-sm font-bold text-text-main-light dark:text-gray-200 mb-2"
						for="title"
						>제목</label
					>
					<input
						v-model="form.title"
						class="w-full rounded-lg border-border-light dark:border-border-dark bg-gray-50 dark:bg-zinc-800 text-text-main-light dark:text-white placeholder-text-sub-light dark:placeholder-zinc-500 focus:ring-2 focus:ring-primary focus:border-transparent py-3 px-4 transition-shadow"
						id="title"
						name="title"
						placeholder="제목을 입력해주세요"
						type="text"
						required
					/>
				</div>
				<div>
					<label
						class="block text-sm font-bold text-text-main-light dark:text-gray-200 mb-2"
						for="content"
						>내용</label
					>
					<div class="relative">
						<textarea
							v-model="form.content"
							class="w-full rounded-lg border-border-light dark:border-border-dark bg-gray-50 dark:bg-zinc-800 text-text-main-light dark:text-white placeholder-text-sub-light dark:placeholder-zinc-500 focus:ring-2 focus:ring-primary focus:border-transparent py-3 px-4 transition-shadow resize-y"
							id="content"
							name="content"
							placeholder="공지사항 내용을 입력해주세요."
							rows="12"
							required
						></textarea>
					</div>
				</div>
				<div
					class="flex items-center justify-end space-x-4 pt-4 border-t border-border-light dark:border-border-dark"
				>
					<button
						@click="router.push('/notices')"
						class="px-6 py-3 rounded-lg text-sm font-medium text-text-sub-light dark:text-gray-300 bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
						type="button"
					>
						취소
					</button>
					<button
						class="px-8 py-3 rounded-lg text-sm font-bold text-black bg-primary hover:bg-primaryHover shadow-md hover:shadow-lg transform active:scale-95 transition-all"
						type="submit"
					>
						{{ isEditMode ? '수정하기' : '등록하기' }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
	createNotice,
	getNoticeById,
	updateNotice,
} from '@/api/notices.api.js';

const router = useRouter();
const route = useRoute();

const noticeId = ref(route.params.id || null);
const isEditMode = ref(!!noticeId.value);

const form = reactive({
	title: '',
	content: '',
	category: '',
});

const fetchNoticeData = async () => {
	if (!isEditMode.value) return;
	try {
		const response = await getNoticeById(noticeId.value);
		const notice = response;
		form.title = notice.title;
		form.content = notice.content;
		form.category = notice.category;
	} catch (error) {
		console.error('Failed to fetch notice data for editing:', error);
		alert('공지사항 정보를 불러오는 데 실패했습니다.');
		router.push('/notices');
	}
};

const handleSubmit = async () => {
	if (!form.title.trim() || !form.content.trim() || !form.category) {
		alert('카테고리, 제목, 내용을 모두 입력해주세요.');
		return;
	}

	const noticeData = {
		title: form.title,
		content: form.content,
		category: form.category,
	};

	try {
		if (isEditMode.value) {
			await updateNotice(noticeId.value, noticeData);
			alert('공지사항이 성공적으로 수정되었습니다.');
			router.push('/notices');
		} else {
			await createNotice(noticeData);
			alert('공지사항이 성공적으로 등록되었습니다.');
			router.push('/notices');
		}
	} catch (error) {
		console.error('Failed to submit notice:', error);
		// Interceptor will show a generic error alert.
	}
};

onMounted(() => {
	fetchNoticeData();
});
</script>
