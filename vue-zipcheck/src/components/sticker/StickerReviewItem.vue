<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <div class="flex items-start gap-3">
      <span class="text-2xl">{{ emoji }}</span>
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <span class="font-bold text-sm text-gray-800 dark:text-gray-200">{{ review.userNickname }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ formattedDate }}</span>
        </div>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ review.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
});

const emoji = computed(() => {
  switch (props.review.stickerTypeName) {
    case 'LIKE':
      return '😊';
    case 'NORMAL':
      return '😐';
    case 'DISLIKE':
      return '😫';
    default:
      return '🤔';
  }
});

const formattedDate = computed(() => {
  const now = new Date();
  const createdAt = new Date(props.review.createdAt);
  const diffTime = Math.abs(now - createdAt);
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

  if (diffHours <= 24 && now.getDate() === createdAt.getDate()) {
    return `${diffHours}시간 전`;
  } else if (now.getDate() - createdAt.getDate() === 1 && now.getMonth() === createdAt.getMonth() && now.getFullYear() === createdAt.getFullYear()) {
    return '어제';
  } else {
    return createdAt.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\.$/, '');
  }
});
</script>
