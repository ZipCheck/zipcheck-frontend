<template>
    <div class="p-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg">
        <div class="flex items-start gap-3">
            <span class="text-3xl mt-0.5">{{ review.stickerIconUrl }}</span>
            <div class="flex-1">
                <div class="flex items-baseline justify-between">
                    <span class="font-bold text-sm text-text-main-light dark:text-text-main-dark">{{ review.userNickname }}</span>
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark">{{ formattedDate }}</span>
                </div>
                <p class="mt-1 text-sm text-text-sub-light dark:text-text-sub-dark">{{ review.description }}</p>
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
