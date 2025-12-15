<template>
  <div class="bg-white rounded-[2rem] border border-border-color p-8 shadow-soft h-full">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-primary-dark">campaign</span>
        최근 공지사항
      </h3>
      <a class="text-sm font-medium text-text-muted hover:text-primary-dark" href="#">더보기</a>
    </div>
    <div class="space-y-4">
      <!-- Item 1 -->
      <div class="flex gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer items-start">
        <div class="mt-1">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
            중요
          </span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-text-main line-clamp-1">2023년 4분기 부동산 정책 변경 안내</p>
          <p class="text-xs text-text-muted mt-1">2023.10.24</p>
        </div>
      </div>
      <!-- Item 2 -->
      <div class="flex gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer items-start">
        <div class="mt-1">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            공지
          </span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-text-main line-clamp-1">서비스 점검 안내 (11월 1일 02:00 ~ 06:00)</p>
          <p class="text-xs text-text-muted mt-1">2023.10.23</p>
        </div>
      </div>
      <!-- Item 3 -->
      <div class="flex gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer items-start">
        <div class="mt-1">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
            일반
          </span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-text-main line-clamp-1">커뮤니티 이용 가이드 업데이트</p>
          <p class="text-xs text-text-muted mt-1">2023.10.20</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>