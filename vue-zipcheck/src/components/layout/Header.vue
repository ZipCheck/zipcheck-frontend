<template>
  <header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-border-color">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer">
          <div class="flex items-center justify-center size-8 bg-primary rounded-lg text-text-main">
            <span class="material-symbols-outlined icon-filled text-xl">home_work</span>
          </div>
          <span class="text-xl font-bold tracking-tight text-text-main">ZipCheck</span>
        </div>
        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <a class="text-sm font-semibold text-text-main hover:text-primary-dark transition-colors" href="/">홈</a>
          <a class="text-sm font-medium text-text-muted hover:text-text-main transition-colors" href="/board">게시판</a>
          <a class="text-sm font-medium text-text-muted hover:text-text-main transition-colors" href="/announcements">공지사항</a>
        </nav>
        <!-- Auth Buttons -->
        <div class="flex items-center gap-3">
          <button class="hidden sm:flex text-sm font-medium text-text-main hover:bg-background-alt px-4 py-2 rounded-full transition-colors">
            로그인
          </button>
          <button class="flex items-center justify-center bg-primary hover:bg-primary-dark text-text-main text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-sm">
            회원가입
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>