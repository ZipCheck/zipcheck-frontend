<template>
  <div class="py-8 px-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
    <h2 class="text-xl font-bold mb-6 text-gray-900 dark:text-white">실제 거주민 반응</h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">
      <p>거주민 반응을 불러오는 중입니다...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500 dark:text-red-400">
      <p>거주민 반응을 불러오지 못했습니다.</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!stickers || stickers.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-8">
      <p>아직 등록된 거주민 후기가 없습니다.</p>
    </div>

    <!-- Content -->
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Sticker Summary -->
        <div class="pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-8 md:pb-0">
          <h3 class="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">스티커 요약</h3>
          <StickerSummary :summary="stickerSummary" />
        </div>

        <!-- Sticker Reviews -->
        <div>
          <h3 class="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">거주민 한마디</h3>
          <div v-if="reviews.length > 0" class="space-y-3 max-h-96 overflow-y-auto">
            <StickerReviewItem v-for="review in reviews" :key="review.stickerId" :review="review" />
          </div>
          <div v-else class="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
            <p>아직 등록된 한줄평이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getStickersByAptId } from '@/api/stickers.api.js';
import StickerSummary from './StickerSummary.vue';
import StickerReviewItem from './StickerReviewItem.vue';

const props = defineProps({
  aptId: {
    type: [String, Number],
    required: true,
  },
});

const stickers = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  if (!props.aptId) {
    loading.value = false;
    error.value = new Error('Apartment ID is not provided.');
    return;
  }
  try {
    const response = await getStickersByAptId(props.aptId);
    stickers.value = response.data;
  } catch (err) {
    console.error('Failed to fetch stickers:', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
});

const stickerSummary = computed(() => {
  const total = stickers.value.length;
  if (total === 0) {
    return { likePercent: 0, normalPercent: 0, dislikePercent: 0 };
  }

  const likeCount = stickers.value.filter(s => s.stickerTypeName === 'LIKE').length;
  const normalCount = stickers.value.filter(s => s.stickerTypeName === 'NORMAL').length;
  const dislikeCount = stickers.value.filter(s => s.stickerTypeName === 'DISLIKE').length;

  return {
    likePercent: Math.round((likeCount / total) * 100),
    normalPercent: Math.round((normalCount / total) * 100),
    dislikePercent: Math.round((dislikeCount / total) * 100),
  };
});

const reviews = computed(() => {
  return stickers.value
    .filter(s => s.description && s.description.trim() !== '')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});
</script>
