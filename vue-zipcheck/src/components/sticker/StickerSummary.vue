<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <div class="flex-1 flex gap-4 items-center">
        <span class="text-lg">😊</span>
        <span class="text-sm font-bold text-gray-700 dark:text-gray-300">만족</span>
      </div>
      <span class="text-sm font-bold text-gray-800 dark:text-gray-200 w-12 text-right">{{ summary.likePercent }}%</span>
    </div>
    <div class="flex items-center gap-2 mb-2">
      <div class="flex-1 flex gap-4 items-center">
        <span class="text-lg">😐</span>
        <span class="text-sm font-bold text-gray-700 dark:text-gray-300">보통</span>
      </div>
      <span class="text-sm font-bold text-gray-800 dark:text-gray-200 w-12 text-right">{{ summary.normalPercent }}%</span>
    </div>
    <div class="flex items-center gap-2 mb-3">
      <div class="flex-1 flex gap-4 items-center">
        <span class="text-lg">😫</span>
        <span class="text-sm font-bold text-gray-700 dark:text-gray-300">불만</span>
      </div>
      <span class="text-sm font-bold text-gray-800 dark:text-gray-200 w-12 text-right">{{ summary.dislikePercent }}%</span>
    </div>

    <div class="flex w-full h-3 rounded-full overflow-hidden">
      <div class="h-full bg-green-200 dark:bg-green-700" :style="{ width: `${summary.likePercent}%` }"></div>
      <div class="h-full bg-gray-200 dark:bg-gray-600" :style="{ width: `${summary.normalPercent}%` }"></div>
      <div class="h-full bg-red-200 dark:bg-red-700" :style="{ width: `${summary.dislikePercent}%` }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  summary: {
    type: Object,
    required: true,
    default: () => ({
      likePercent: 0,
      normalPercent: 0,
      dislikePercent: 0,
    }),
  },
});
</script>
