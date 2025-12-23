<template>
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-text-main-light dark:text-text-main-dark">최신 게시물</h2>
        <router-link to="/boards" class="text-sm font-medium text-primary hover:text-primary-hover">
          더보기 &rarr;
        </router-link>
      </div>
      <div v-if="posts.length">
        <ul class="border-t border-border-light dark:border-border-dark">
          <li v-for="post in posts" :key="post.boardId" class="border-b border-border-light dark:border-border-dark">
            <router-link :to="`/boards/${post.boardId}`" class="block py-4 px-2 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
              <div class="grid grid-cols-12 items-center gap-4">
                <div class="col-span-12 sm:col-span-8">
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 text-xs font-bold px-2 py-1 rounded-md" :class="categoryStyles[post.category]">{{ categoryMap[post.category] || '기타' }}</span>
                    <p class="text-text-main-light dark:text-text-main-dark font-medium truncate">{{ post.title }}</p>
                  </div>
                </div>
                <div class="hidden sm:block sm:col-span-2 text-center text-xs text-text-sub-light dark:text-text-sub-dark">
                  {{ post.nickname }}
                </div>
                <div class="hidden sm:block sm:col-span-2 text-right text-xs text-text-sub-light dark:text-text-sub-dark">
                  {{ new Date(post.createdAt).toLocaleDateString() }}
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else class="text-center py-10 border rounded-xl border-border-light dark:border-border-dark">
        <p class="text-text-sub-light dark:text-text-sub-dark">아직 등록된 게시물이 없습니다.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getBoards } from '@/api/boards.api.js';

const posts = ref([]);

const categoryMap = {
	FREE: '자유',
	REVIEW: '후기',
	QUESTION: '질문',
	INFO: '정보',
};

const categoryStyles = {
	FREE: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
	REVIEW: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
	QUESTION: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
	INFO: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

onMounted(async () => {
  try {
    const response = await getBoards('latest');
    posts.value = response.data.slice(0, 5);
  } catch (error) {
    console.error('Failed to load latest posts:', error);
  }
});
</script>
