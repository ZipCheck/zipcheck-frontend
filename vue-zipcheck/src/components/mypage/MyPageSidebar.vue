<template>
  <aside class="lg:col-span-1">
    <div
      class="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-soft p-6 border border-border-light dark:border-border-dark sticky top-24"
    >
      <h2 class="text-lg font-bold mb-6 px-2 text-gray-900 dark:text-white">마이페이지</h2>
      <nav class="space-y-1">
        <router-link
          to="/mypage/profile"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors"
          active-class="bg-primary/10 text-gray-900 dark:text-yellow-400 font-medium border border-primary/20"
        >
          <span class="material-symbols-outlined text-xl">person</span>
          회원정보 수정
        </router-link>
        <router-link
          to="/mypage/reviews"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors"
          active-class="bg-primary/10 text-gray-900 dark:text-yellow-400 font-medium border border-primary/20"
        >
          <span class="material-symbols-outlined text-xl">rate_review</span>
          나의 리뷰
        </router-link>
        <router-link
          to="/mypage/favorites"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors"
          active-class="bg-primary/10 text-gray-900 dark:text-yellow-400 font-medium border border-primary/20"
        >
          <span class="material-symbols-outlined text-xl">favorite</span>
          찜한 매물
        </router-link>
        <router-link
          to="/mypage/notifications"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors"
          active-class="bg-primary/10 text-gray-900 dark:text-yellow-400 font-medium border border-primary/20"
        >
          <span class="material-symbols-outlined text-xl">notifications</span>
          알림 설정
        </router-link>
        <div class="border-t border-gray-100 dark:border-gray-700 my-2"></div>
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
        >
          <span class="material-symbols-outlined text-xl">logout</span>
          로그아웃
        </a>
      </nav>
    </div>
  </aside>
</template>

<script setup></script>
