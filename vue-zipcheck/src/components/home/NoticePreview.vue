<template>
  <div class="bg-white rounded-[2rem] border border-border-color p-8 shadow-soft h-full">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-primary-dark">campaign</span>
        최근 공지사항
      </h3>
      <router-link to="/notices" class="text-sm font-medium text-text-muted hover:text-primary-dark">더보기</router-link>
    </div>
    <div class="space-y-4">
      <div v-for="notice in recentNotices" :key="notice.id" class="flex gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer items-start">
        <div class="mt-1">
          <span :class="getCategoryClass(notice.category)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold">
            {{ notice.category }}
          </span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-text-main line-clamp-1">{{ notice.title }}</p>
          <p class="text-xs text-text-muted mt-1">{{ new Date(notice.createdAt).toLocaleDateString() }}</p>
        </div>
      </div>
      <div v-if="loading" class="text-center p-4">
          <p>로딩 중...</p>
      </div>
      <div v-if="!loading && recentNotices.length === 0" class="text-center p-4">
          <p class="text-sm text-text-muted">최근 공지사항이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getNotices } from '@/api/notices.api.js';

const notices = ref([]);
const loading = ref(true);

// Display top 3 recent notices
const recentNotices = computed(() => notices.value.slice(0, 3));

const getCategoryClass = (category) => {
  const classes = {
    '중요': 'bg-red-100 text-red-800',
    '공지': 'bg-blue-100 text-blue-800',
    '일반': 'bg-gray-100 text-gray-800',
    '업데이트': 'bg-green-100 text-green-800',
  };
  return classes[category] || classes['일반'];
};

onMounted(async () => {
  try {
    const data = await getNotices();
    // Assuming the API returns notices sorted by date descending
    notices.value = data || [];
  } catch (error) {
    console.error('Failed to fetch recent notices:', error);
  } finally {
    loading.value = false;
  }
});
</script>