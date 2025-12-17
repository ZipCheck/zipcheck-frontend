<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-text-light dark:text-text-dark mb-4">공지사항</h1>
      <p class="text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
        ZipCheck의 새로운 소식과 업데이트, 그리고 중요한 정책 변경 사항을 확인하세요.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <div class="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          class="px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-text-light dark:text-text-dark shadow-sm"
        >
          전체
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-md text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          중요
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-md text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          일반
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-md text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          업데이트
        </button>
      </div>
    </div>
    <div v-if="notices.length > 0" class="space-y-4">
      <div
        v-for="notice in notices" :key="notice.id"
        class="group bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span
                :class="getCategoryClass(notice.category)"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ notice.category }}
              </span>
              <span class="text-xs text-text-muted-light dark:text-text-muted-dark"
                >{{ new Date(notice.createdAt).toLocaleDateString() }}</span
              >
            </div>
            <h3
              class="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors"
            >
              {{ notice.title }}
            </h3>
            <p class="mt-1 text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">
              {{ notice.summary }}
            </p>
          </div>
          <div class="hidden sm:block">
            <span
              class="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark group-hover:text-primary transition-colors"
              >chevron_right</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-10">
      <p class="text-text-muted-light">등록된 공지사항이 없습니다.</p>
    </div>
    <div class="mt-10 flex justify-center">
      <!-- Static pagination for now -->
      <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <a
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-text-muted-light dark:text-text-muted-dark ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
          href="#"
        >
          <span class="sr-only">Previous</span>
          <span class="material-symbols-outlined text-sm">chevron_left</span>
        </a>
        <a
          aria-current="page"
          class="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href="#"
          >1</a
        >
        <a
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-light dark:text-text-dark ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
          href="#"
          >2</a
        >
        <a
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-text-muted-light dark:text-text-muted-dark ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
          href="#"
        >
          <span class="sr-only">Next</span>
          <span class="material-symbols-outlined text-sm">chevron_right</span>
        </a>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { getNotices } from '@/api/notices.api.js';

const notices = ref([]);

const fetchNotices = async () => {
  try {
    const data = await getNotices();
    // Assuming the API returns an array of notice objects
    // and each object has at least: id, category, createdAt, title, summary
    notices.value = data || [];
  } catch (error) {
    console.error('Failed to fetch notices:', error);
  }
};

const getCategoryClass = (category) => {
  const classes = {
    '중요': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
    '공지': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    '일반': 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
    '업데이트': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
  };
  return classes[category] || classes['일반'];
};


onMounted(() => {
  fetchNotices();
});
</script>
<style scoped></style>
