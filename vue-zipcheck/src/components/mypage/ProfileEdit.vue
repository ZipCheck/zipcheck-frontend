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
							:src="
								profileImagePreview ||
								user.profileImageUrl ||
								'https://via.placeholder.com/150'
							"
							alt="Profile"
							class="w-full h-full object-cover"
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

			<!-- Notification Settings Section -->
			<div class="border-t border-gray-100 dark:border-gray-700 pt-8 space-y-4">
				<h3
					class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2"
				>
					<span class="material-symbols-outlined text-primary"
						>notifications</span
					>
					알림 설정
				</h3>
				<div
					class="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800"
				>
					<span class="font-medium text-gray-700 dark:text-gray-300"
						>댓글 알림</span
					>
					<label class="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							v-model="commentNotifications"
							class="sr-only peer"
						/>
						<div
							class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
						></div>
					</label>
				</div>
				<div
					class="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800"
				>
					<span class="font-medium text-gray-700 dark:text-gray-300"
						>찜한 매물 가격 변동 알림</span
					>
					<label class="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							v-model="priceChangeNotifications"
							class="sr-only peer"
						/>
						<div
							class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
						></div>
					</label>
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
	</div>
</template>

<script setup>
import { inject, ref, watch } from 'vue';
import {
	updateNickname,
	updatePassword,
	uploadProfileImage,
	updateNotificationSettings,
	getMyInfo,
} from '@/api/users.api.js';

const user = inject('user');
const loading = ref(false);

// Form state
const editableNickname = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const newPasswordConfirm = ref('');
const commentNotifications = ref(true);
const priceChangeNotifications = ref(true);
const profileImageFile = ref(null);
const profileImagePreview = ref(null);
const fileInput = ref(null);

// Initialize form state when user data is available
watch(
	user,
	newUser => {
		if (newUser) {
			editableNickname.value = newUser.nickname;
			// Assuming notification settings are part of the user object
			// If not, they would need to be fetched separately.
			commentNotifications.value = newUser.commentNotifications ?? true;
			priceChangeNotifications.value = newUser.priceChangeNotifications ?? true;
		}
	},
	{ immediate: true },
);

const triggerFileInput = () => {
	fileInput.value.click();
};

const handleFileChange = event => {
	const file = event.target.files[0];
	if (file) {
		profileImageFile.value = file;
		const reader = new FileReader();
		reader.onload = e => {
			profileImagePreview.value = e.target.result;
		};
		reader.readAsDataURL(file);
	}
};

const handleProfileUpdate = async () => {
	loading.value = true;
	try {
		const promises = [];

		// 1. Update profile image
		if (profileImageFile.value) {
			const formData = new FormData();
			formData.append('profileImage', profileImageFile.value);
			promises.push(uploadProfileImage(formData));
		}

		// 2. Update nickname
		if (editableNickname.value !== user.value.nickname) {
			promises.push(updateNickname(editableNickname.value));
		}

		// 3. Update password
		if (newPassword.value) {
			if (newPassword.value !== newPasswordConfirm.value) {
				alert('새 비밀번호가 일치하지 않습니다.');
				return;
			}
			promises.push(updatePassword(currentPassword.value, newPassword.value));
		}

		// 4. Update notification settings
		// This part is tricky without knowing the original state.
		// We'll just send the current state.
		const notificationSettings = {
			commentNotifications: commentNotifications.value,
			priceChangeNotifications: priceChangeNotifications.value,
		};
		promises.push(updateNotificationSettings(notificationSettings));

		await Promise.all(promises);

		alert('프로필이 성공적으로 업데이트되었습니다.');
		// Optionally, refresh user data
		const updatedUser = await getMyInfo();
		user.value = updatedUser;
	} catch (error) {
		console.error('프로필 업데이트 실패:', error);
		alert('프로필 업데이트 중 오류가 발생했습니다.');
	} finally {
		loading.value = false;
	}
};
</script>
