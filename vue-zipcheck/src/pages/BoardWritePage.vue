<template>
	<div class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl">
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-text-main-light dark:text-white mb-2">
				게시글 작성
			</h1>
			<p class="text-text-sub-light dark:text-text-sub-dark">
				커뮤니티 가이드라인을 준수하여 소중한 의견을 남겨주세요.
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
						v-model="category"
						class="w-full sm:w-1/2 rounded-lg border-border-light dark:border-border-dark bg-gray-50 dark:bg-zinc-800 text-text-main-light dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent py-3 px-4 transition-shadow"
						id="category"
						name="category"
					>
						<option disabled="" value="">카테고리를 선택해주세요</option>
						<option value="free">자유게시판</option>
						<option value="review">매매후기</option>
						<option value="qna">동네질문</option>
						<option value="info">정보공유</option>
					</select>
				</div>
				<div>
					<label
						class="block text-sm font-bold text-text-main-light dark:text-gray-200 mb-2"
						for="title"
						>제목</label
					>
					<input
						v-model="title"
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
							v-model="content"
							class="w-full rounded-lg border-border-light dark:border-border-dark bg-gray-50 dark:bg-zinc-800 text-text-main-light dark:text-white placeholder-text-sub-light dark:placeholder-zinc-500 focus:ring-2 focus:ring-primary focus:border-transparent py-3 px-4 transition-shadow resize-y"
							id="content"
							name="content"
							placeholder="내용을 입력해주세요.
부적절한 홍보나 비방글은 삭제될 수 있습니다."
							rows="12"
							required
						></textarea>
						<div
							class="absolute bottom-4 right-4 text-xs text-text-sub-light dark:text-zinc-500"
						>
							{{ content.length }} / 2000자
						</div>
					</div>
				</div>
				<div
					class="flex items-center justify-end space-x-4 pt-4 border-t border-border-light dark:border-border-dark"
				>
					<button
						@click="router.push('/boards')"
						class="px-6 py-3 rounded-lg text-sm font-medium text-text-sub-light dark:text-gray-300 bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
						type="button"
					>
						취소
					</button>
					<button
						class="px-8 py-3 rounded-lg text-sm font-bold text-black bg-primary hover:bg-primaryHover shadow-md hover:shadow-lg transform active:scale-95 transition-all"
						type="submit"
					>
						등록하기
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createBoard } from '@/api/boards.api.js';

const router = useRouter();

const title = ref('');
const content = ref('');
const category = ref('');

const handleSubmit = async () => {
	if (!title.value.trim() || !content.value.trim()) {
		alert('제목과 내용을 모두 입력해주세요.');
		return;
	}

	try {
		// The API spec in README does not include category, sending it anyway as it exists in the form.
		// This might need adjustment based on the actual backend implementation.
		await createBoard({
			title: title.value,
			content: content.value,
			category: category.value,
		});
		alert('게시글이 성공적으로 등록되었습니다.');
		router.push('/boards');
	} catch (error) {
		console.error('Failed to create board:', error);
		// Interceptor will show a generic error alert.
	}
};
</script>
<style scoped></style>
