<template>
  <footer class="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-3xl text-primary">home_pin</span>
          <span class="text-xl font-bold text-text-main-light dark:text-text-main-dark">집첵</span>
        </div>
        <div class="text-center md:text-left">
          <p class="text-sm text-text-sub-light dark:text-text-sub-dark">
            AI 기반 부동산 정보 서비스. 모든 권리 보유.
          </p>
          <p class="text-sm text-text-sub-light dark:text-text-sub-dark">
            &copy; {{ new Date().getFullYear() }} ZipCheck. All rights reserved.
          </p>
        </div>
        <div class="flex gap-6">
          <a href="#" class="text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark transition-colors">이용약관</a>
          <a href="#" class="text-text-sub-light dark:text-text-sub-dark hover:text-text-main-light dark:hover:text-text-main-dark transition-colors">개인정보처리방침</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
