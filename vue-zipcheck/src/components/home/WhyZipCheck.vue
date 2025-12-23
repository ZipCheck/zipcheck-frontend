<template>
  <section class="py-20 sm:py-28">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-text-main-light dark:text-text-main-dark">왜 집첵을 사용해야 할까요?</h2>
        <p class="mt-4 text-text-sub-light dark:text-text-sub-dark">
          집첵은 신뢰할 수 있는 데이터와 AI 기술로 당신의 합리적인 결정을 돕습니다.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.name" class="bg-surface-light dark:bg-surface-dark p-8 rounded-xl border border-border-light dark:border-border-dark text-center">
          <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mx-auto mb-6">
            <span class="material-symbols-outlined text-3xl">{{ feature.icon }}</span>
          </div>
          <h3 class="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2">{{ feature.name }}</h3>
          <p class="text-text-sub-light dark:text-text-sub-dark">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    name: '신뢰성 있는 빅데이터',
    description: '국토교통부 실거래가 데이터를 기반으로 정확하고 신뢰성 있는 정보를 제공합니다.',
    icon: 'database',
  },
  {
    name: 'AI 매물 분석 리포트',
    description: 'AI가 매물의 특징과 주변 환경을 분석하여 보기 쉬운 리포트로 제공합니다.',
    icon: 'auto_awesome',
  },
  {
    name: '실거주자 리뷰',
    description: '실제 거주 경험이 있는 사용자들의 생생한 리뷰를 통해 아파트의 장단점을 파악할 수 있습니다.',
    icon: 'rate_review',
  },
];
</script>
