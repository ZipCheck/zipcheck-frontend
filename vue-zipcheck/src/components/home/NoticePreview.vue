<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-text-main-light dark:text-text-main-dark">공지사항</h2>
        <router-link to="/notices" class="text-sm font-medium text-primary hover:text-primary-hover">
          더보기 &rarr;
        </router-link>
      </div>
      <div v-if="notices.length">
        <ul class="border-t border-border-light dark:border-border-dark">
          <li v-for="notice in notices" :key="notice.noticeId" class="border-b border-border-light dark:border-border-dark">
            <router-link :to="`/notices/${notice.noticeId}`" class="block py-4 px-2 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
              <div class="grid grid-cols-12 items-center gap-4">
                <div class="col-span-12 sm:col-span-8">
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 text-xs font-bold px-2 py-1 rounded-md"
                      :class="categoryClasses[notice.category]">{{ categoryMap[notice.category] }}</span>
                    <p class="text-text-main-light dark:text-text-main-dark font-medium truncate">{{ notice.title }}</p>
                  </div>
                </div>
                <div class="hidden sm:block sm:col-span-2 text-center text-xs text-text-sub-light dark:text-text-sub-dark">
                  관리자
                </div>
                <div class="hidden sm:block sm:col-span-2 text-right text-xs text-text-sub-light dark:text-text-sub-dark">
                  {{ formatDate(notice.createdAt) }}
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else class="text-center py-10 border rounded-xl border-border-light dark:border-border-dark">
        <p class="text-text-sub-light dark:text-text-sub-dark">등록된 공지사항이 없습니다.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNotices } from '@/api/notices.api.js';

const notices = ref([]);

const categoryMap = {
  IMPORTANT: '중요',
  NORMAL: '일반',
  UPDATE: '업데이트',
};

const categoryClasses = {
  IMPORTANT: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
  NORMAL: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  UPDATE: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
};

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