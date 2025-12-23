<template>
	<div>
		<div
			class="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-soft border border-border-light dark:border-border-dark p-8"
		>
			<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
				찜한 매물
			</h1>
			<p class="text-gray-500 dark:text-gray-400">내가 찜한 매물 목록입니다.</p>
		</div>

		<div class="mt-8">
			<!-- Loading Skeleton -->
			<div v-if="loading" class="grid grid-cols-1 gap-6">
				<div v-for="i in 3" :key="i" class="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft animate-pulse">
					<div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
					<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
					<div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
				</div>
			</div>

			<!-- Empty List -->
			<div v-else-if="properties.length === 0" class="text-center py-20">
				<p class="text-gray-500 dark:text-gray-400">아직 찜한 매물이 없습니다.</p>
			</div>

			<!-- Property List -->
			<div v-else class="grid grid-cols-1 gap-6">
				<div v-for="prop in properties" :key="prop.interestId" class="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft flex items-center justify-between">
					<div>
						<h2 class="font-bold text-lg text-text-main-light dark:text-text-main-dark">{{ prop.aptName }}</h2>
						<p class="text-sm text-text-sub-light dark:text-text-sub-dark mt-1">
							{{ prop.dealAmount }} · {{ prop.floor }}층 · {{ prop.excluUseAr }}㎡
						</p>
						<p class="text-xs text-gray-400 mt-2">찜한 날짜: {{ new Date(prop.createdAt).toLocaleDateString() }}</p>
					</div>
					<div class="flex items-center gap-4">
						<button @click="handleRemoveFavorite(prop.dealNo)" class="text-red-500 hover:text-red-700 transition-colors">
							<span class="material-symbols-outlined icon-filled">favorite</span>
						</button>
						<button @click="goToMap(prop)" class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
							지도에서 보기
						</button>
						<div v-if="prop.hasSticker">
							<span class="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">이모티콘 등록 완료</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ToastMessage v-model:show="showToast" :message="toastMessage" :type="toastType" />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getFavoriteProperties, removeFavoriteProperty } from '@/api/users.api.js';
import ToastMessage from '@/components/common/ToastMessage.vue';

const router = useRouter();
const properties = ref([]);
const loading = ref(true);
const error = ref(null);
const pagingInfo = ref({ page: 1, size: 10, totalCount: 0 });

// Toast state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');

const fetchFavorites = async () => {
	loading.value = true;
	error.value = null;
	try {
		const response = await getFavoriteProperties(pagingInfo.value.page, pagingInfo.value.size);
		if (response && response.data) {
			properties.value = response.data.items || [];
			pagingInfo.value.totalCount = response.data.totalCount || 0;
		} else {
			properties.value = [];
			pagingInfo.value.totalCount = 0;
		}
	} catch (err) {
		console.error('Failed to fetch favorite properties:', err);
		error.value = '찜한 매물 목록을 불러오는 데 실패했습니다.';
        toastMessage.value = error.value;
        toastType.value = 'error';
        showToast.value = true;
	} finally {
		loading.value = false;
	}
};

const handleRemoveFavorite = async (dealNo) => {
	try {
		await removeFavoriteProperty(dealNo);
		properties.value = properties.value.filter(p => p.dealNo !== dealNo);
        toastMessage.value = '관심 매물이 삭제되었습니다.';
        toastType.value = 'success';
        showToast.value = true;
	} catch (err) {
		console.error('Failed to remove favorite property:', err);
        toastMessage.value = '찜 해제에 실패했습니다.';
        toastType.value = 'error';
        showToast.value = true;
	}
};

const goToMap = (property) => {
	if (property.latitude && property.longitude) {
		router.push({
			path: '/map',
			query: { lat: property.latitude, lng: property.longitude },
		});
	} else {
		// 좌표 정보가 없는 경우, 그냥 지도로만 이동하고 사용자에게 알림
		toastMessage.value = '해당 매물의 위치 정보가 없습니다.';
		toastType.value = 'error';
		showToast.value = true;
		router.push('/map');
	}
};

onMounted(() => {
	fetchFavorites();
});
</script>