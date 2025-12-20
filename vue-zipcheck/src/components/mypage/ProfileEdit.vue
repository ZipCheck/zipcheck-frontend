<template>
	<div
		v-if="user"
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
					<button
						@click.prevent="triggerFileInput"
						class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
					>
						사진 변경
					</button>
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
						v-model="editableNickname"
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
							v-model="newPasswordConfirm"
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
					:disabled="loading"
					class="px-8 py-3.5 bg-primary text-gray-900 font-bold rounded-2xl hover:bg-yellow-400 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
					type="submit"
				>
					<span v-if="loading">저장 중...</span>
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
</template>

<script setup>
import { inject, ref, watch, computed, onUnmounted } from 'vue';
import { authStore } from '@/stores/auth.store';
import {
	updateMyProfile,
	updatePassword,
	getMyInfo,
	deleteMyAccount,
} from '@/api/users.api.js';
import { uploadProfileImage } from '@/api/files.api.js';
import defaultAvatar from '@/assets/images/default-avatar.svg';

const user = inject('user');
const loading = ref(false);
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Form state
const editableNickname = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');
const fileInput = ref(null);
const selectedFile = ref(null); // To hold the selected File object
const imagePreviewUrl = ref(null); // To hold the local preview URL (blob)

// The source of truth for the <img> tag's src
const profileImagePreview = computed(() => {
	// 1. If a new file is selected, show its local preview.
	if (imagePreviewUrl.value) {
		return imagePreviewUrl.value;
	}
	// 2. If the user has a profile image URL from the server, use it.
	if (user.value?.profileImageUrl) {
		// Construct the full URL for the image
		return `${apiBaseUrl}${user.value.profileImageUrl}`;
	}
	// 3. Fallback to the default static asset.
	return defaultAvatar;
});

// Original state to track changes
let originalNickname = '';

watch(
	user,
	newUser => {
		if (newUser) {
			editableNickname.value = newUser.nickname;
			originalNickname = newUser.nickname;
			// Reset any local previews when user data changes
			selectedFile.value = null;
			if (imagePreviewUrl.value) {
				URL.revokeObjectURL(imagePreviewUrl.value);
				imagePreviewUrl.value = null;
			}
		}
	},
	{ immediate: true },
);

onUnmounted(() => {
	// Clean up the object URL to prevent memory leaks
	if (imagePreviewUrl.value) {
		URL.revokeObjectURL(imagePreviewUrl.value);
	}
});

const handleImageError = event => {
	// If the server-provided URL fails, show the default avatar.
	if (event.target.src !== defaultAvatar) {
		event.target.src = defaultAvatar;
	}
};

const triggerFileInput = () => {
	fileInput.value.click();
};

const handleFileChange = event => {
	const file = event.target.files[0];
	if (!file) return;

	if (file.size > 5 * 1024 * 1024) {
		alert('프로필 이미지는 5MB를 초과할 수 없습니다.');
		return;
	}
	// Store the file object for later upload
	selectedFile.value = file;

	// Create a temporary URL for immediate preview
	if (imagePreviewUrl.value) {
		URL.revokeObjectURL(imagePreviewUrl.value); // Clean up previous blob URL
	}
	imagePreviewUrl.value = URL.createObjectURL(file);
};

const handleProfileUpdate = async () => {
	loading.value = true;
	let newProfileImageUrl = null;

	// --- 1. Handle Image Upload ---
	if (selectedFile.value) {
		try {
			const uploadResponse = await uploadProfileImage(selectedFile.value);
			newProfileImageUrl = uploadResponse.profileImageUrl;
		} catch (error) {
			alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
			console.error('Image upload failed:', error);
			loading.value = false;
			return;
		}
	}

	// --- 2. Handle Profile and Password Updates ---
	const isNicknameChanged = editableNickname.value.trim() !== originalNickname;
	const isImageChanged = newProfileImageUrl !== null;
	const isPasswordChanged = newPassword.value !== '';

	// No changes to save
	if (!isNicknameChanged && !isImageChanged && !isPasswordChanged) {
		alert('변경된 내용이 없습니다.');
		loading.value = false;
		return;
	}

	try {
		// Update profile if nickname or image changed
		if (isNicknameChanged || isImageChanged) {
			const newNickname = editableNickname.value.trim();
			if (!newNickname) {
				alert('닉네임을 입력해주세요.');
				loading.value = false;
				return;
			}
			const profileData = {
				nickname: newNickname,
			};
			if (isImageChanged) {
				profileData.profileImageUrl = newProfileImageUrl;
			}
			await updateMyProfile(profileData);
		}

		// Update password if a new one is provided
		if (isPasswordChanged) {
			if (newPassword.value !== newPasswordConfirm.value) {
				alert('새 비밀번호가 일치하지 않습니다.');
				throw new Error('Passwords do not match.');
			}
			if (!currentPassword.value) {
				alert('현재 비밀번호를 입력해주세요.');
				throw new Error('Current password is required.');
			}
			await updatePassword(currentPassword.value, newPassword.value);
		}

		alert('프로필이 성공적으로 업데이트되었습니다.');

		// --- 3. Refresh UI and State ---
		const updatedUser = await getMyInfo();
		user.value = updatedUser; // Update the injected user ref
	} catch (error) {
		const errorMessage =
			error.response?.data?.message ||
			error.message ||
			'프로필 업데이트에 실패했습니다.';
		alert(errorMessage);

		// If image upload succeeded but profile update failed, the user might be left in an inconsistent state.
		// A more robust solution could involve a state machine or a compensating transaction.
		// For now, we alert the user.
		if (isImageChanged) {
			alert(
				'참고: 이미지 업로드는 성공했으나 프로필 정보 업데이트에 실패했습니다. 페이지를 새로고침하여 현재 상태를 확인해주세요.',
			);
		}
		console.error('프로필 업데이트 실패:', error);
	} finally {
		loading.value = false;
		// Reset state after completion
		selectedFile.value = null;
		if (imagePreviewUrl.value) {
			URL.revokeObjectURL(imagePreviewUrl.value);
			imagePreviewUrl.value = null;
		}
		currentPassword.value = '';
		newPassword.value = '';
		newPasswordConfirm.value = '';
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
