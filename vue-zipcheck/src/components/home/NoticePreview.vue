<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-text-main-light dark:text-text-main-dark">공지사항</h2>
        <router-link to="/notices" class="text-sm font-medium text-primary hover:text-primary-hover">
          더보기 &rarr;
        </router-link>
      </div>
      <div class="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-soft">
        <ul v-if="notices.length" class="divide-y divide-border-light dark:divide-border-dark">
          <li v-for="notice in notices" :key="notice.noticeId">
            <router-link :to="`/notices/${notice.noticeId}`" class="block p-4 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
              <div class="flex justify-between items-center gap-4">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <span class="material-symbols-outlined text-primary text-xl">campaign</span>
                  <p class="text-text-main-light dark:text-text-main-dark truncate font-medium">{{ notice.title }}</p>
                </div>
                <span class="flex-shrink-0 text-xs text-text-sub-light dark:text-text-sub-dark">{{ formatDate(notice.createdAt) }}</span>
              </div>
            </router-link>
          </li>
        </ul>
        <div v-else class="p-6 text-center text-text-sub-light dark:text-text-sub-dark">
          <p>등록된 공지사항이 없습니다.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNotices } from '@/api/notices.api.js';

const notices = ref([]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR');
};

onMounted(async () => {
  try {
    const response = await getNotices();
    if (response && Array.isArray(response.data)) {
      notices.value = response.data.slice(0, 5);
    }
  } catch (error) {
    console.error('Failed to load notices:', error);
  }
});
</script>
