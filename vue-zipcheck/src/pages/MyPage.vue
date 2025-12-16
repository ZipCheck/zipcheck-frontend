<template>
  <main class="flex-grow py-10 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      <MyPageSidebar />
      <div class="lg:col-span-3">
        <router-view />
      </div>
    </div>
  </main>
</template>

<script setup>
import MyPageSidebar from '@/components/mypage/MyPageSidebar.vue';
</script>
