<template>
  <div class="bg-white rounded-[2rem] border border-border-color p-8 shadow-soft h-full">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-bold flex items-center gap-2">
        <span class="material-symbols-outlined text-primary-dark">forum</span>
        최근 커뮤니티 글
      </h3>
      <a class="text-sm font-medium text-text-muted hover:text-primary-dark" href="#">더보기</a>
    </div>
    <div class="space-y-4">
      <!-- Post 1 -->
      <div class="flex items-center gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer">
        <img alt="User avatar showing initials UO" class="size-10 rounded-full bg-gray-200 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4IA-By7LC6C-PJSy3MUTcE9fKX2kat-Sr19T3N8O3eXMfRXjTMWzfiHrZtoZYqv1Vap62w0aFSvxbCZujZhJSaWQuxP2JKasB6qIb7fIvYIpRhjAdHFkZ3DyBgA6lyc5fTEfW2uSCa3l4kNEdX-mQkTdhE96IyPT-Ak_AWlOPANWaPrGBVsWZrfATRFADFkdVmhNqwdWQhKwmy2mKk9qNsOZ6Y67-148YYrzbvQBlX0k2ggiqp7MaJXAKEDJpRDyg9l1t4YI4ml0O"/>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-xs font-bold text-primary-dark bg-yellow-50 px-2 py-0.5 rounded-md">자유게시판</span>
            <span class="text-xs text-text-muted">3분 전</span>
          </div>
          <p class="text-sm font-semibold text-text-main truncate">강남구 역삼동 아파트 전세 시세 질문드립니다.</p>
        </div>
      </div>
      <!-- Post 2 -->
      <div class="flex items-center gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer">
        <img alt="User avatar showing initials HH" class="size-10 rounded-full bg-gray-200 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU3qRVggXdxQc6b8ZEoGZUR7JJe5ybd7yHXynKOx45ANluP67cm9PlGRC94C8xB48Ck1onuAVYjug6_j4XCLutB3qk7yuGRilYzA7SeoNekMxAWS91dB1yMZsfdWpWhu1C-BcRRmquD8TfuyHgFLLfLRcBdMZVeW0fYdfnhQppoedZ0AdtLlt8IAFc7CjhHl_sG7RH03sXbqlafHmM7rVpZC9f33_NXNIbHf37kH1pLO0mHGTVi-67JoSwf2bG2Qe5Kf9K4AJD6IOC"/>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">매매후기</span>
            <span class="text-xs text-text-muted">12분 전</span>
          </div>
          <p class="text-sm font-semibold text-text-main truncate">드디어 내 집 마련 성공했습니다! (발품 후기)</p>
        </div>
      </div>
      <!-- Post 3 -->
      <div class="flex items-center gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer">
        <img alt="User avatar showing initials SL" class="size-10 rounded-full bg-gray-200 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEj9R_txOCe-nJQW2GFU2HBj-PMY6RzL2XPVO6rChUezwowRnYmTiUmsRzfl6uv9oR27Njbq5pJyAwGy1qGm06cbuzQgt2JD_GC5ZS1IwCGsdmk0GkEw_DVVErL2Iw_F1a_ZCXIJrUB4zd5TsS7pc4VTRroqGUZGIjRK128MIUsD1BImstMTqvIWehur8YMDZebWQ7PceRs_UdOMNmkq2LrTTWVdELK1X3RfhFzLt3Dz3sthCK5usJc5hi04qBYV82jri_BqCm0u6"/>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">동네질문</span>
            <span class="text-xs text-text-muted">45분 전</span>
          </div>
          <p class="text-sm font-semibold text-text-main truncate">송파구 헬리오시티 근처 맛집 추천 부탁드려요.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>