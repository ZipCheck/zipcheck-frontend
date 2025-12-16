<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold text-text-light dark:text-text-dark mb-4">공지사항</h1>
      <p class="text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
        ZipCheck의 새로운 소식과 업데이트, 그리고 중요한 정책 변경 사항을 확인하세요.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <div class="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <button
          class="px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-text-light dark:text-text-dark shadow-sm"
        >
          전체
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-md text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          중요
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-md text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          일반
        </button>
        <button
          class="px-4 py-2 text-sm font-medium rounded-md text-text-muted-light dark:text-text-muted-dark hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          업데이트
        </button>
      </div>
    </div>
    <div class="space-y-4">
      <div
        class="group bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
              >
                중요
              </span>
              <span class="text-xs text-text-muted-light dark:text-text-muted-dark"
                >2023.10.24</span
              >
            </div>
            <h3
              class="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors"
            >
              2023년 4분기 부동산 정책 변경 안내
            </h3>
            <p class="mt-1 text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">
              정부의 최신 부동산 정책 발표에 따른 ZipCheck 서비스 이용 가이드 변경사항을 안내해
              드립니다. 주요 변경 사항은...
            </p>
          </div>
          <div class="hidden sm:block">
            <span
              class="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark group-hover:text-primary transition-colors"
              >chevron_right</span
            >
          </div>
        </div>
      </div>
      <div
        class="group bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
              >
                공지
              </span>
              <span class="text-xs text-text-muted-light dark:text-text-muted-dark"
                >2023.10.23</span
              >
            </div>
            <h3
              class="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors"
            >
              서비스 점검 안내 (11월 1일 02:00 ~ 06:00)
            </h3>
            <p class="mt-1 text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">
              안정적인 서비스 제공을 위해 서버 점검이 예정되어 있습니다. 점검 시간 동안 서비스
              이용이 일시 중단됩니다.
            </p>
          </div>
          <div class="hidden sm:block">
            <span
              class="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark group-hover:text-primary transition-colors"
              >chevron_right</span
            >
          </div>
        </div>
      </div>
      <div
        class="group bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              >
                일반
              </span>
              <span class="text-xs text-text-muted-light dark:text-text-muted-dark"
                >2023.10.20</span
              >
            </div>
            <h3
              class="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors"
            >
              커뮤니티 이용 가이드 업데이트
            </h3>
            <p class="mt-1 text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">
              건전한 커뮤니티 문화를 만들기 위해 이용 가이드가 일부 개정되었습니다. 주요 내용을
              확인해 주세요.
            </p>
          </div>
          <div class="hidden sm:block">
            <span
              class="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark group-hover:text-primary transition-colors"
              >chevron_right</span
            >
          </div>
        </div>
      </div>
      <div
        class="group bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
              >
                업데이트
              </span>
              <span class="text-xs text-text-muted-light dark:text-text-muted-dark"
                >2023.10.15</span
              >
            </div>
            <h3
              class="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors"
            >
              v2.1 앱 업데이트 안내 (지도 기능 개선)
            </h3>
            <p class="mt-1 text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">
              지도 검색 속도가 향상되었으며, 필터 기능이 더욱 세밀해졌습니다. 지금 바로 업데이트
              하세요.
            </p>
          </div>
          <div class="hidden sm:block">
            <span
              class="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark group-hover:text-primary transition-colors"
              >chevron_right</span
            >
          </div>
        </div>
      </div>
      <div
        class="group bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
      >
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              >
                일반
              </span>
              <span class="text-xs text-text-muted-light dark:text-text-muted-dark"
                >2023.10.10</span
              >
            </div>
            <h3
              class="text-lg font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors"
            >
              개인정보 처리방침 변경 안내
            </h3>
            <p class="mt-1 text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">
              개인정보 보호법 개정에 따라 개인정보 처리방침이 일부 변경됩니다. 변경된 내용을
              확인해 주시기 바랍니다.
            </p>
          </div>
          <div class="hidden sm:block">
            <span
              class="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark group-hover:text-primary transition-colors"
              >chevron_right</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 flex justify-center">
      <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <a
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-text-muted-light dark:text-text-muted-dark ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
          href="#"
        >
          <span class="sr-only">Previous</span>
          <span class="material-symbols-outlined text-sm">chevron_left</span>
        </a>
        <a
          aria-current="page"
          class="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          href="#"
          >1</a
        >
        <a
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-light dark:text-text-dark ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
          href="#"
          >2</a
        >
        <a
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-light dark:text-text-dark ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
          href="#"
          >3</a
        >
        <span
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-muted-light dark:text-text-muted-dark ring-1 ring-inset ring-border-light dark:ring-border-dark focus:outline-offset-0"
          >...</span
        >
        <a
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-text-light dark:text-text-dark ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
          href="#"
          >10</a
        >
        <a
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-text-muted-light dark:text-text-muted-dark ring-1 ring-inset ring-border-light dark:ring-border-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
          href="#"
        >
          <span class="sr-only">Next</span>
          <span class="material-symbols-outlined text-sm">chevron_right</span>
        </a>
      </nav>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
