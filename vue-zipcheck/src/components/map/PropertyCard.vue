<template>
  <div
    class="bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow cursor-pointer group"
  >
    <div class="flex justify-between items-start mb-2">
      <span
        :class="[
          'text-[10px] font-bold px-2 py-1 rounded-md',
          property.type === '매매'
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
        ]"
        >{{ property.type }}</span
      >
      <span class="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors text-[20px]"
        >favorite</span
      >
    </div>
    <h3 class="font-bold text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {{ property.name }}
    </h3>
    <p class="text-xs text-text-sub-light dark:text-text-sub-dark mb-3">{{ property.address }}</p>
    <div class="flex items-center gap-2 mb-3">
      <span class="text-lg font-bold">{{ property.price }}</span>
      <span class="text-xs text-text-sub-light dark:text-text-sub-dark">{{ property.size }}</span>
    </div>
    <div class="flex gap-2">
      <div
        v-for="(tag, index) in property.tags"
        :key="index"
        :class="[
          'flex items-center gap-1 px-2 py-1 rounded-lg',
          tag.type === 'positive'
            ? 'bg-green-50 dark:bg-green-900/20'
            : tag.type === 'neutral'
            ? 'bg-yellow-50 dark:bg-yellow-900/20'
            : 'bg-red-50 dark:bg-red-900/20',
        ]"
      >
        <span
          class="material-symbols-outlined text-[14px]"
          :class="[
            tag.type === 'positive'
              ? 'text-green-600'
              : tag.type === 'neutral'
              ? 'text-yellow-600'
              : 'text-red-500',
          ]"
          >{{ tag.icon }}</span
        >
        <span
          class="text-[10px] font-medium"
          :class="[
            tag.type === 'positive'
              ? 'text-green-700 dark:text-green-400'
              : tag.type === 'neutral'
              ? 'text-yellow-700 dark:text-yellow-400'
              : 'text-red-600 dark:text-red-400',
          ]"
          >{{ tag.text }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  property: {
    type: Object,
    required: true,
  },
});
</script>
