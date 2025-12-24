<template>
    <div>
        <div class="flex w-full h-3 rounded-full overflow-hidden mb-4">
            <div class="h-full rounded-l-full" :style="{ width: `${summary.likePercent}%`, backgroundColor: '#38BDF8' }"></div>
            <div class="h-full" :style="{ width: `${summary.normalPercent}%`, backgroundColor: '#D1D5DB' }"></div>
            <div class="h-full rounded-r-full" :style="{ width: `${summary.dislikePercent}%`, backgroundColor: '#F97316' }"></div>
        </div>
        <div class="flex justify-between text-sm">
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: '#38BDF8' }"></span>
                <span class="font-bold text-text-sub-light dark:text-text-sub-dark">좋아요</span>
                <span class="font-mono text-text-main-light dark:text-text-main-dark">{{ summary.likePercent }}%</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: '#D1D5DB' }"></span>
                <span class="font-bold text-text-sub-light dark:text-text-sub-dark">보통</span>
                <span class="font-mono text-text-main-light dark:text-text-main-dark">{{ summary.normalPercent }}%</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: '#F97316' }"></span>
                <span class="font-bold text-text-sub-light dark:text-text-sub-dark">별로에요</span>
                <span class="font-mono text-text-main-light dark:text-text-main-dark">{{ summary.dislikePercent }}%</span>
            </div>
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
