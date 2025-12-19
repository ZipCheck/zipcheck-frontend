<template>
	<div class="space-y-6">
		<h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
			알림 설정
		</h3>
		<div class="p-6 bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm">
			<div class="flex items-center justify-between">
				<span class="text-sm font-medium text-gray-900 dark:text-gray-300"
					>전체 알림 동의</span
				>
				<button
					@click="notificationEnabled = !notificationEnabled"
					:class="[
						'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
						notificationEnabled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700',
					]"
				>
					<span
						:class="[
							'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
							notificationEnabled ? 'translate-x-5' : 'translate-x-0',
						]"
					></span>
				</button>
			</div>
			<div class="mt-8 flex justify-end">
				<button
					@click="saveSettings"
					:disabled="loading"
					class="px-6 py-2 bg-primary text-gray-900 font-bold rounded-lg hover:bg-yellow-400 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<span v-if="loading">저장 중...</span>
					<span v-else>변경사항 저장</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watchEffect, inject } from 'vue';
import { updateAlarmSettings, getMyInfo } from '@/api/users.api.js';

const user = inject('user');
const notificationEnabled = ref(false);
const originalNotificationState = ref(false);
const loading = ref(false);

watchEffect(() => {
	if (user.value) {
		notificationEnabled.value = user.value.alarmAgree;
		originalNotificationState.value = user.value.alarmAgree;
	}
});

const saveSettings = async () => {
	if (!user.value) return;
	if (notificationEnabled.value === originalNotificationState.value) {
		// No changes to save
		return;
	}

	loading.value = true;
	try {
		await updateAlarmSettings(notificationEnabled.value);
		// Refresh user data to get the latest info
		const updatedUser = await getMyInfo();
		user.value = updatedUser;
		alert('알림 설정이 저장되었습니다.');
	} catch (error) {
		console.error('Failed to update notification settings:', error);
		alert('설정 저장 중 오류가 발생했습니다.');
		// Revert the toggle on failure
		notificationEnabled.value = originalNotificationState.value;
	} finally {
		loading.value = false;
	}
};
</script>
