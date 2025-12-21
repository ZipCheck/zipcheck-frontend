<template>
	<div
		v-if="isDataLoaded"
		class="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden"
	>
		<div class="p-8 pb-0">
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
				회원정보 수정
			</h1>
			<p class="text-gray-500 dark:text-gray-400">
				계정 정보를 확인하고 수정할 수 있습니다.
			</p>
		</div>
		<form class="p-8 space-y-10" @submit.prevent="handleProfileUpdate">
			<!-- Profile Image Section -->
			<div
				class="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-gray-100 dark:border-gray-700"
			>
				<div class="relative group">
					<div
						class="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md"
					>
						<img
							:src="profileImagePreview"
							alt="Profile"
							class="w-full h-full object-cover"
							@error="handleImageError"
						/>
					</div>
					<input
						ref="fileInput"
						type="file"
						@change="handleFileChange"
						accept="image/png, image/jpeg"
						hidden
					/>
					<button
						@click.prevent="triggerFileInput"
						class="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition shadow-sm border-2 border-white dark:border-gray-800"
					>
						<span class="material-symbols-outlined text-sm">camera_alt</span>
					</button>
				</div>
				<div class="flex-1 text-center sm:text-left">
					<h3 class="font-bold text-lg dark:text-white">프로필 사진</h3>
					<p class="text-sm text-gray-500 mb-4 dark:text-gray-400">
						png, jpg 파일만 업로드 가능합니다. (최대 5MB)
					</p>
					<div class="flex items-center gap-2">
						<button
							@click.prevent="triggerFileInput"
							class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
						>
							사진 변경
						</button>
						<button
							v-if="profileImageUrl"
							@click.prevent="handleRemoveProfileImage"
							class="px-4 py-2 border border-red-500 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
						>
							사진 삭제
						</button>
					</div>
				</div>
			</div>

			<!-- Nickname Section -->
			<div class="space-y-2">
				<label class="block text-sm font-bold text-gray-700 dark:text-gray-300"
					>닉네임</label
				>
				<div class="relative flex-grow">
					<div
						class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
					>
						<span class="material-symbols-outlined text-gray-400">person</span>
					</div>
					<input
						v-model="nickname"
						class="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm"
						placeholder="닉네임을 입력해주세요"
						type="text"
					/>
				</div>
			</div>

			<!-- Password Section -->
			<div class="border-t border-gray-100 dark:border-gray-700 pt-8 space-y-6">
				<h3
					class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2"
				>
					<span class="material-symbols-outlined text-primary">lock</span>
					비밀번호 변경
				</h3>
				<div class="space-y-2">
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>현재 비밀번호</label
					>
					<input
						v-model="currentPassword"
						class="block w-full pl-4 pr-4 py-3.5 bg-white dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 rounded-2xl"
						placeholder="현재 사용중인 비밀번호"
						type="password"
					/>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<label
							class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>새 비밀번호</label
						>
						<input
							v-model="newPassword"
							class="block w-full pl-4 pr-4 py-3.5 bg-white dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 rounded-2xl"
							placeholder="8자 이상 영문/숫자/특수문자"
							type="password"
						/>
					</div>
					<div class="space-y-2">
						<label
							class="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>새 비밀번호 확인</label
						>
						<input
							v-model="confirmPassword"
							class="block w-full pl-4 pr-4 py-3.5 bg-white dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 rounded-2xl"
							placeholder="비밀번호 재입력"
							type="password"
						/>
					</div>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="pt-6 flex items-center justify-end gap-4">
				<button
					class="px-6 py-3.5 rounded-2xl text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
					type="button"
				>
					취소
				</button>
				<button
					:disabled="isSaving"
					class="px-8 py-3.5 bg-primary text-gray-900 font-bold rounded-2xl hover:bg-yellow-400 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
					type="submit"
				>
					<span v-if="isSaving">저장 중...</span>
					<span v-else>변경사항 저장</span>
				</button>
			</div>
		</form>

		<!-- Account Deletion Section -->
		<div class="p-8 pt-4">
			<hr class="border-gray-100 dark:border-gray-700 my-6" />
			<h2 class="text-xl font-bold text-red-600 dark:text-red-500 mb-2">
				회원 탈퇴
			</h2>
			<p class="text-gray-500 dark:text-gray-400 mb-4">
				계정을 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다.
			</p>
			<button
				@click="handleDeleteAccount"
				class="px-6 py-3 border border-red-500 text-red-500 font-bold rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
			>
				회원 탈퇴 진행
			</button>
		</div>
	</div>
	<div v-else class="text-center p-10">
		<p>사용자 정보를 불러오는 중입니다...</p>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { authStore } from '@/stores/auth.store';
import {
	getMyInfo,
	updateMyNickname,
	updatePassword,
	updateMyProfileImage,
	deleteMyAccount,
} from '@/api/users.api.js';
import defaultAvatar from '@/assets/images/default-avatar.svg';

const isDataLoaded = ref(false);
const isSaving = ref(false);
const isUploading = ref(false);

// Form state
const nickname = ref('');
const originalNickname = ref('');
const profileImageUrl = ref('');
const profileImageFile = ref(null);

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const fileInput = ref(null);

const profileImagePreview = computed(() => {
	if (profileImageUrl.value) {
		return profileImageUrl.value;
	}
	return defaultAvatar;
});

onMounted(async () => {
	try {
		const userInfo = await getMyInfo();
		nickname.value = userInfo.nickname;
		originalNickname.value = userInfo.nickname;
		profileImageUrl.value = userInfo.profileImageUrl;
	} catch (error) {
		console.error('Failed to fetch user info:', error);
		alert('사용자 정보를 불러오는 데 실패했습니다.');
	} finally {
		isDataLoaded.value = true;
	}
});

const handleImageError = event => {
	if (event.target.src !== defaultAvatar) {
		event.target.src = defaultAvatar;
	}
};

const triggerFileInput = () => {
	if (isUploading.value) return;
	fileInput.value.click();
};

const handleFileChange = async event => {
	const file = event.target.files[0];
	if (!file) return;

	if (file.size > 5 * 1024 * 1024) {
		alert('프로필 이미지는 5MB를 초과할 수 없습니다.');
		return;
	}

	profileImageFile.value = file;
	const formData = new FormData();
	formData.append('image', file);

	isUploading.value = true;
	try {
		const response = await updateMyProfileImage(formData);
		profileImageUrl.value = response.data;
		alert('프로필 이미지가 성공적으로 변경되었습니다.');
	} catch (error) {
		console.error('Image upload failed:', error);
		alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
	} finally {
		isUploading.value = false;
	}
};

const handleRemoveProfileImage = async () => {
	if (!window.confirm('프로필 사진을 정말로 삭제하시겠습니까?')) {
		return;
	}
	try {
		const formData = new FormData();
		await updateMyProfileImage(formData);
		profileImageUrl.value = null;
		alert('프로필 사진이 삭제되었습니다.');
	} catch (error) {
		console.error('Failed to remove profile image:', error);
		alert('프로필 사진 삭제에 실패했습니다.');
	}
};

const handleProfileUpdate = async () => {
	const isNicknameChanged = nickname.value !== originalNickname.value;
	const isPasswordEntered =
		currentPassword.value && newPassword.value && confirmPassword.value;

	if (!isNicknameChanged && !isPasswordEntered) {
		alert('변경된 내용이 없습니다.');
		return;
	}

	isSaving.value = true;
	const tasks = [];

	if (isNicknameChanged) {
		tasks.push(
			updateMyNickname(nickname.value).catch(err => ({
				error: true,
				type: 'nickname',
				message:
					err.response?.data?.message ||
					'닉네임 변경 중 오류가 발생했습니다.',
			})),
		);
	}

	if (isPasswordEntered) {
		if (newPassword.value !== confirmPassword.value) {
			alert('새 비밀번호가 일치하지 않습니다.');
			isSaving.value = false;
			return;
		}
		tasks.push(
			updatePassword(currentPassword.value, newPassword.value).catch(err => ({
				error: true,
				type: 'password',
				message:
					err.response?.data?.message ||
					'비밀번호 변경 중 오류가 발생했습니다.',
			})),
		);
	}

	const results = await Promise.allSettled(tasks);

	isSaving.value = false;

	const failures = results
		.filter(res => res.value?.error)
		.map(res => res.value.message);

	if (failures.length > 0) {
		alert(`다음과 같은 오류가 발생했습니다:\n- ${failures.join('\n- ')}`);
	} else {
		alert('회원정보가 성공적으로 수정되었습니다.');
		// Update original nickname to prevent re-submitting
		originalNickname.value = nickname.value;
		// Clear password fields
		currentPassword.value = '';
		newPassword.value = '';
		confirmPassword.value = '';
	}
};

const handleDeleteAccount = async () => {
	const confirmationMessage =
		'회원 탈퇴 시 계정은 비활성화되며, 작성한 게시글 및 활동 내역은 복구할 수 없습니다. 또한, 동일한 이메일로 다시 가입하실 수 없습니다.\n정말로 탈퇴하시겠습니까?';

	if (window.confirm(confirmationMessage)) {
		try {
			await deleteMyAccount();
			alert('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
			authStore.clearToken();
			window.location.href = '/';
		} catch (error) {
			const errorMessage =
				error.response?.data?.message ||
				'알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
			alert(`탈퇴 처리 중 오류가 발생했습니다: ${errorMessage}`);
			console.error('계정 삭제 실패:', error);
		}
	}
};
</script>
