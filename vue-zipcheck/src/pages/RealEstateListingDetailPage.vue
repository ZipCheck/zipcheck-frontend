<template>
	<main
		class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full"
	>
		<div v-if="loading" class="text-center py-10">
			매물 상세 정보를 불러오는 중...
		</div>
		<div v-else-if="error" class="text-center py-10 text-red-500">
			매물 정보를 불러오는 데 실패했습니다: {{ error.message }}
		</div>
		<div v-else-if="propertyDetail" class="flex flex-col gap-8">
			<ListingDetailHeader :property="propertyDetail" />
			<ResidentReviews />
		</div>
		<div v-else class="text-center py-10 text-gray-500">
			매물 정보를 찾을 수 없습니다.
		</div>
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getPropertyDetail } from '@/api/map.api.js';

import ListingDetailHeader from '@/components/listing-detail/ListingDetailHeader.vue';
import ResidentReviews from '@/components/listing-detail/ResidentReviews.vue';

const route = useRoute();
const propertyDetail = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchPropertyDetail = async () => {
	loading.value = true;
	error.value = null;
	try {
		const id = route.params.id;
		if (id) {
			propertyDetail.value = await getPropertyDetail(id);
		} else {
			error.value = new Error('매물 ID가 없습니다.');
		}
	} catch (err) {
		console.error('Failed to fetch property detail:', err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	fetchPropertyDetail();
});
</script>