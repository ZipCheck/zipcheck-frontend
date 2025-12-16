<template>
  <div class="flex-grow container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-5xl">
    <nav
      aria-label="Breadcrumb"
      class="flex mb-6 text-sm text-text-sub-light dark:text-text-sub-dark"
    >
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a class="inline-flex items-center hover:text-primary" href="#">
            <span class="material-symbols-outlined text-base mr-1">home</span>
            홈
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="material-symbols-outlined text-base mx-1">chevron_right</span>
            <a class="hover:text-primary" href="#">자유게시판</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <span class="material-symbols-outlined text-base mx-1">chevron_right</span>
            <span class="font-medium text-text-main-light dark:text-text-main-dark"
              >강남구 역삼동 아파트 전세 시세 질문드립니다.</span
            >
          </div>
        </li>
      </ol>
    </nav>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-8">
        <article
          class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <header class="mb-6 border-b border-gray-100 dark:border-gray-700 pb-6">
            <div class="flex items-center gap-3 mb-4">
              <span
                class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                >자유게시판</span
              >
              <span class="text-text-sub-light dark:text-text-sub-dark text-sm"
                >2023.10.25 14:30</span
              >
            </div>
            <h1
              class="text-2xl md:text-3xl font-bold mb-4 text-text-main-light dark:text-text-main-dark leading-tight"
            >
              강남구 역삼동 아파트 전세 시세 질문드립니다.
            </h1>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden"
                >
                  <span class="material-symbols-outlined text-gray-400 dark:text-gray-300"
                    >person</span
                  >
                </div>
                <div>
                  <div class="font-semibold text-sm">부동산꿈나무</div>
                  <div class="text-xs text-text-sub-light dark:text-text-sub-dark">
                    서울시 강남구 · 인증회원
                  </div>
                </div>
              </div>
              <div
                class="flex items-center gap-4 text-text-sub-light dark:text-text-sub-dark text-sm"
              >
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-base">visibility</span>
                  <span>1,234</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-base">chat_bubble_outline</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </header>
          <div
            class="prose dark:prose-invert max-w-none mb-8 text-text-main-light dark:text-text-main-dark leading-relaxed"
          >
            <p>안녕하세요, 이번에 이사를 계획하고 있는 직장인입니다.</p>
            <p>
              강남구 역삼동 쪽으로 전세를 알아보고 있는데, 최근 시세 변동이 좀 있는 것 같아서요.
              혹시 최근에 이쪽 지역 전세 계약하신 분이나 잘 아시는 분 계신가요?
            </p>
            <p>
              제가 보고 있는 평형대는 20평대 중반에서 30평대 초반입니다. 예산은 어느 정도
              생각해야 할지, 그리고 추천해주실 만한 단지가 있다면 알려주시면 감사하겠습니다.
            </p>
            <p>
              부동산 앱으로 보고는 있지만 실제 거주하시는 분들의 생생한 후기나 조언을 듣고 싶어서
              글 남깁니다. 감사합니다!
            </p>
            <div
              class="my-6 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center h-64 border border-gray-200 dark:border-gray-700"
            >
              <span class="text-text-sub-light dark:text-text-sub-dark flex flex-col items-center gap-2">
                <span class="material-symbols-outlined text-4xl">image</span>
                <span class="text-sm">첨부된 이미지 (예시)</span>
              </span>
            </div>
          </div>
          <div
            class="flex items-center justify-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700"
          >
            <button
              class="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="material-symbols-outlined text-gray-400">thumb_up</span>
              <span class="font-medium text-sm">좋아요 12</span>
            </button>
            <button
              class="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span class="material-symbols-outlined text-gray-400">share</span>
              <span class="font-medium text-sm">공유하기</span>
            </button>
          </div>
        </article>
        <section
          class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
            댓글 <span class="text-primary">5</span>
          </h3>
          <div class="mb-8 flex gap-4">
            <div
              class="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center font-bold text-sm text-black"
            >
              나
            </div>
            <div class="flex-grow">
              <textarea
                class="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white p-3 resize-none"
                placeholder="따뜻한 조언의 한마디를 남겨주세요."
                rows="3"
              ></textarea>
              <div class="flex justify-end mt-2">
                <button
                  class="bg-black dark:bg-white text-white dark:text-black text-sm font-bold px-5 py-2 rounded-lg hover:opacity-80 transition-opacity"
                >
                  등록하기
                </button>
              </div>
            </div>
          </div>
          <div class="space-y-6">
            <div class="flex gap-4">
              <div
                class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center overflow-hidden"
              >
                <span class="material-symbols-outlined">face</span>
              </div>
              <div class="flex-grow">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-sm">강남토박이</span>
                  <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                    >1시간 전</span
                  >
                </div>
                <p
                  class="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed mb-2"
                >
                  역삼동 개나리 아파트 추천드려요. 최근 전세 시세가 조금 안정화되어서 20평대
                  후반이면 8~9억 선에서 가능하실 것 같아요. 학군도 좋고 생활 인프라도 잘 되어
                  있습니다.
                </p>
                <button
                  class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium hover:text-text-main-light dark:hover:text-text-main-dark flex items-center gap-1"
                >
                  <span class="material-symbols-outlined text-sm">thumb_up_off_alt</span> 좋아요 3
                </button>
              </div>
            </div>
            <div class="w-full h-px bg-gray-100 dark:bg-gray-700"></div>
            <div class="flex gap-4 pl-0 md:pl-14">
              <div
                class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex-shrink-0 flex items-center justify-center overflow-hidden"
              >
                <span class="material-symbols-outlined text-sm">face_3</span>
              </div>
              <div class="flex-grow">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-sm">집구하는중</span>
                  <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                    >30분 전</span
                  >
                </div>
                <p
                  class="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed mb-2"
                >
                  저도 그쪽 보고 있는데 정보 감사합니다! 혹시 래미안 쪽은 어떤지 아시나요?
                </p>
                <button
                  class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium hover:text-text-main-light dark:hover:text-text-main-dark flex items-center gap-1"
                >
                  <span class="material-symbols-outlined text-sm">thumb_up_off_alt</span> 좋아요
                </button>
              </div>
            </div>
            <div class="w-full h-px bg-gray-100 dark:bg-gray-700"></div>
            <div class="flex gap-4">
              <div
                class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex-shrink-0 flex items-center justify-center overflow-hidden"
              >
                <span class="material-symbols-outlined">face_6</span>
              </div>
              <div class="flex-grow">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-sm">부동산박사</span>
                  <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                    >15분 전</span
                  >
                </div>
                <p
                  class="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed mb-2"
                >
                  지금 시기가 전세 구하기 딱 좋은 시기인 것 같습니다. 매물도 꽤 나오고 있고,
                  협의만 잘하시면 좋은 조건에 들어가실 수 있을 거에요. 발품 많이 파시는게
                  중요합니다.
                </p>
                <button
                  class="text-xs text-text-sub-light dark:text-text-sub-dark font-medium hover:text-text-main-light dark:hover:text-text-main-dark flex items-center gap-1"
                >
                  <span class="material-symbols-outlined text-sm">thumb_up_off_alt</span> 좋아요 1
                </button>
              </div>
            </div>
          </div>
          <button
            class="w-full mt-8 py-3 text-sm font-medium text-text-sub-light dark:text-text-sub-dark border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            댓글 더보기
          </button>
        </section>
      </div>
      <aside class="lg:col-span-4 space-y-8">
        <div
          class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div class="flex flex-col items-center text-center">
            <div
              class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 mb-4 overflow-hidden relative group"
            >
              <span
                class="material-symbols-outlined text-4xl text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >person</span
              >
            </div>
            <h3 class="font-bold text-lg mb-1">부동산꿈나무</h3>
            <p class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4">
              가입일: 2023.01.15
            </p>
            <div class="w-full grid grid-cols-2 gap-2 mb-4">
              <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-center">
                <div class="text-xs text-text-sub-light dark:text-text-sub-dark mb-1">
                  작성글
                </div>
                <div class="font-bold">12</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-center">
                <div class="text-xs text-text-sub-light dark:text-text-sub-dark mb-1">
                  작성댓글
                </div>
                <div class="font-bold">48</div>
              </div>
            </div>
            <button
              class="w-full bg-primary text-black font-bold py-2.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
            >
              쪽지 보내기
            </button>
          </div>
        </div>
        <div
          class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 class="font-bold text-lg mb-4 flex items-center justify-between">
            최근 인기글
            <a class="text-xs font-normal text-text-sub-light hover:text-primary" href="#"
              >더보기</a
            >
          </h3>
          <ul class="space-y-4">
            <li>
              <a class="block group" href="#">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded"
                    >HOT</span
                  >
                  <h4
                    class="text-sm font-medium group-hover:text-primary dark:text-gray-200 transition-colors truncate"
                  >
                    송파구 헬리오시티 근처 맛집 추천...
                  </h4>
                </div>
                <div class="flex justify-between text-xs text-text-sub-light dark:text-text-sub-dark">
                  <span>동네질문</span>
                  <span>댓글 24</span>
                </div>
              </a>
            </li>
            <li>
              <a class="block group" href="#">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded"
                    >정보</span
                  >
                  <h4
                    class="text-sm font-medium group-hover:text-primary dark:text-gray-200 transition-colors truncate"
                  >
                    2023년 4분기 부동산 정책 변경...
                  </h4>
                </div>
                <div class="flex justify-between text-xs text-text-sub-light dark:text-text-sub-dark">
                  <span>공지사항</span>
                  <span>댓글 8</span>
                </div>
              </a>
            </li>
            <li>
              <a class="block group" href="#">
                <div class="flex items-center gap-2 mb-1">
                  <span
                    class="bg-green-100 text-green-600 text-[10px] font-bold px-1.5 py-0.5 rounded"
                    >후기</span
                  >
                  <h4
                    class="text-sm font-medium group-hover:text-primary dark:text-gray-200 transition-colors truncate"
                  >
                    드디어 내 집 마련 성공했습니다!
                  </h4>
                </div>
                <div class="flex justify-between text-xs text-text-sub-light dark:text-text-sub-dark">
                  <span>매매후기</span>
                  <span>댓글 156</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-sm h-64 relative group cursor-pointer">
          <img
            alt="Modern apartment interior"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPL47RBIM-E4IzdVy5C7gWkdCh1X1RdSq7JXWqqDRuEc3oFVRx0AmLCobjUKVsaf01FM0kSudLj8ZcfZHNJjjV8GOmevmgt7I_M_fSyrR0Qna4mtFVSMGE5hha7muMxiJOu1weqDmLLSomDrfkq9s2Y9RbX78CWyNEzvqOwxvnYr8jNWxCUcr5-zdYwn8cTRFtU6n8WBDDp-Zjj84elak-QdZFK0vVe7nOVh3J3FNLlATtJPK3-tI4sLzGaWTZRTqjIetkg8GnMg"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6"
          >
            <span class="text-white text-xs font-bold bg-primary text-black px-2 py-0.5 rounded w-max mb-2"
              >AD</span
            >
            <h4 class="text-white font-bold text-lg leading-tight">
              투명한 부동산 거래의 시작, ZipCheck 프리미엄
            </h4>
            <p class="text-gray-200 text-xs mt-2">지금 가입하고 첫 달 무료 혜택을 받으세요.</p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
