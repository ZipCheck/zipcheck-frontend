<template>
  <div>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col lg:flex-row gap-8">
        <aside class="w-full lg:w-64 flex-shrink-0 space-y-8">
          <router-link to="/boards/write">
            <button
              class="w-full bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <span class="material-symbols-outlined text-xl">edit</span>
              글쓰기
            </button>
          </router-link>
          <div
            class="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">category</span>
              카테고리
            </h3>
            <ul class="space-y-2">
              <li>
                <label
                  class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
                >
                  <input
                    checked=""
                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    name="category"
                    type="radio"
                  />
                  <span class="text-sm font-medium group-hover:text-primary transition-colors"
                    >전체보기</span
                  >
                </label>
              </li>
              <li>
                <label
                  class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
                >
                  <input
                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    name="category"
                    type="radio"
                  />
                  <span class="text-sm font-medium group-hover:text-primary transition-colors"
                    >자유게시판</span
                  >
                </label>
              </li>
              <li>
                <label
                  class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
                >
                  <input
                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    name="category"
                    type="radio"
                  />
                  <span class="text-sm font-medium group-hover:text-primary transition-colors"
                    >매매후기</span
                  >
                </label>
              </li>
              <li>
                <label
                  class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
                >
                  <input
                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    name="category"
                    type="radio"
                  />
                  <span class="text-sm font-medium group-hover:text-primary transition-colors"
                    >동네질문</span
                  >
                </label>
              </li>
              <li>
                <label
                  class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors group"
                >
                  <input
                    class="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                    name="category"
                    type="radio"
                  />
                  <span class="text-sm font-medium group-hover:text-primary transition-colors"
                    >인테리어</span
                  >
                </label>
              </li>
            </ul>
          </div>
          
        </aside>
        <div class="flex-1">
          <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
            <div class="text-sm text-text-sub-light dark:text-text-sub-dark">
              총 <span class="font-bold text-gray-900 dark:text-white">1,248</span>개의 글이
              있습니다.
            </div>
            <div class="flex items-center gap-2">
              <select
                class="form-select text-sm border-gray-200 dark:border-gray-700 rounded-lg bg-surface-light dark:bg-surface-dark focus:border-primary focus:ring-primary py-2 pr-8 pl-3 cursor-pointer"
              >
                <option>최신순</option>
                <option>인기순</option>
              </select>
            </div>
          </div>
          <div class="space-y-4">
            <article
              class="group bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-5 border border-yellow-200 dark:border-yellow-900/30 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div class="flex items-start gap-4">
                <div class="hidden sm:flex flex-col items-center justify-center w-12 pt-1">
                  <span class="material-symbols-outlined text-primary text-2xl">campaign</span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span
                      class="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      >필독</span
                    >
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                      >공지사항</span
                    >
                  </div>
                  <h2
                    class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
                  >
                    2024년 부동산 정책 주요 변경사항 총정리 가이드
                  </h2>
                  <p class="text-sm text-text-sub-light dark:text-text-sub-dark mb-3 line-clamp-1">
                    안녕하세요 ZipCheck 운영팀입니다. 이번 2024년부터 적용되는 주요 부동산 정책
                    변경사항을 정리해 드립니다. 반드시 확인하시고 불이익 없으시길 바랍니다.
                  </p>
                  <div class="flex items-center gap-4 text-xs text-text-sub-light dark:text-text-sub-dark">
                    <span class="font-medium text-gray-900 dark:text-gray-300">ZipCheck운영팀</span>
                    <span>2023.10.25</span>
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">visibility</span>
                      <span>12.5k</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article
              class="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer"
            >
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >매매후기</span
                    >
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                      >3분 전</span
                    >
                  </div>
                  <h2
                    class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
                  >
                    드디어 내 집 마련 성공했습니다! (송파 헬리오시티 발품 후기)
                  </h2>
                  <p
                    class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4 line-clamp-2"
                  >
                    거의 1년을 돌아다닌 것 같네요. 처음에는 막막했는데 ZipCheck에서 정보 많이 얻고
                    드디어 계약했습니다. 제가 발품 팔면서 느꼈던 팁들 공유합니다. 특히 중개사님
                    만날 때 주의할 점...
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="flex items-center gap-2">
                        <img
                          alt="User Avatar"
                          class="w-6 h-6 rounded-full"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1FrLwramEj_Q9P8mxg-mbVmWijGytHZmp_xaoYVN6ED0q2gmR84VTTw1GAQpeF9rF2lucZ-3EP90aTbC2qyHl3QM15ClieZtjT9zL86h3-jpyfdQRGAMs3hVUGHwDCQHMbafKy8Hyh3pEhuMLSPkPPX5eoR_i_baEVrzhIO5aHIwni_HFfI5inRlFuqI1L8-bbOHx7jf-E9yGsuni5OqBZAe0oRMnrHiNfRC-u1vYkRHGzoTgmwziILMRdIHW9N4NGYmA43768A"
                        />
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300"
                          >내집꿈꾸미</span
                        >
                      </div>
                      <span class="text-xs text-text-sub-light dark:text-text-sub-dark hidden sm:inline"
                        >|</span
                      >
                      <span class="text-xs text-text-sub-light dark:text-text-sub-dark hidden sm:inline"
                        >서울 송파구</span
                      >
                    </div>
                    <div
                      class="flex items-center gap-3 text-xs text-text-sub-light dark:text-text-sub-dark"
                    >
                      <div class="flex items-center gap-1 text-red-500">
                        <span class="material-symbols-outlined text-[14px]">favorite</span>
                        <span>42</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px]"
                          >chat_bubble_outline</span
                        >
                        <span>15</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px]">visibility</span>
                        <span>1.2k</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="hidden sm:block w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img
                    alt="Apartment Interior"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh1qZBBUL71DcUrXiw_aAnYsVJskCwPopawLt4_qOgae1WMlOUIC5mkjgkcbwTJWXC5435Pcwk16x63rPHXsHAtrDizjRRTvepu2ohBKlqWjnBCX9KLSBBsJCLv19eodlo9JGzIlegNc4O905jzPjoTKzwIeU0rAN8Bq2D535gI4lPwH0sQCmAgJ8xl1D8Or_fYFa5jmYp4nA1qY2zFmHHzTlKFTuoMGVjq8DLn5jOg4vhicXDrnIiXKkAMeLn6uhKUW5Uj9SQ_A"
                  />
                </div>
              </div>
            </article>
            <article
              class="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer"
            >
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    >자유게시판</span
                  >
                  <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                    >15분 전</span
                  >
                </div>
                <h2
                  class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
                >
                  강남구 역삼동 전세 시세 질문드립니다.
                </h2>
                <p
                  class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4 line-clamp-2"
                >
                  이번에 직장 때문에 이사를 가야하는데 역삼동 쪽 20평대 전세 시세가 어느 정도
                  형성되어 있나요? 네이버 부동산이랑 실제랑 차이가 좀 있는지 궁금합니다.
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2">
                      <div
                        class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 grid place-items-center text-[10px] font-bold text-blue-600 dark:text-blue-300"
                      >
                        YS
                      </div>
                      <span class="text-xs font-medium text-gray-700 dark:text-gray-300"
                        >역삼동주민</span
                      >
                    </div>
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark hidden sm:inline"
                      >|</span
                    >
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark hidden sm:inline"
                      >서울 강남구</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-3 text-xs text-text-sub-light dark:text-text-sub-dark"
                  >
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">favorite_border</span>
                      <span>2</span>
                    </div>
                    <div class="flex items-center gap-1 text-blue-500">
                      <span class="material-symbols-outlined text-[14px]">chat_bubble</span>
                      <span>5</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">visibility</span>
                      <span>128</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article
              class="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer"
            >
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="px-2 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    >동네질문</span
                  >
                  <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                    >1시간 전</span
                  >
                </div>
                <h2
                  class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
                >
                  송파구 헬리오시티 근처 맛집 추천 부탁드려요.
                </h2>
                <p
                  class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4 line-clamp-2"
                >
                  이사 온 지 얼마 안 돼서 주변을 잘 모르겠네요. 가족들이랑 외식하기 좋은 깔끔한
                  한정식 집이나 고기집 있으면 추천 부탁드립니다!
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2">
                      <img
                        alt="User Avatar"
                        class="w-6 h-6 rounded-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1uW-mIfADMqGRlhrLY__61H6tjx_GCOkTDgbCJCOK7gVVj4Y1gDqJT37ZFcM4j_uKH1fho_r-u9U-p01O2CTtbzEfH_UFJ7XvfVmyvWhATRQmgt6gucaUApmglYrgbJGsflJDDTtSv05zA9F2pkThObzANabLdjznY7JdVePviNPoraqiHDIzPoC3110MVXqtnB6TILAD7HhLjmZkqpV7jA9JeafTFHLmjwjuOst-qiINXTp1aWSS6Vi5_1mOMTDqm8pzBDbzlw"
                      />
                      <span class="text-xs font-medium text-gray-700 dark:text-gray-300"
                        >행복맘</span
                      >
                    </div>
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark hidden sm:inline"
                        >|</span
                      >
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark hidden sm:inline"
                      >서울 송파구</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-3 text-xs text-text-sub-light dark:text-text-sub-dark"
                  >
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">favorite_border</span>
                      <span>5</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]"
                        >chat_bubble_outline</span
                      >
                      <span>8</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">visibility</span>
                      <span>340</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article
              class="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer"
            >
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      >인테리어</span
                    >
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                      >3시간 전</span
                    >
                  </div>
                  <h2
                    class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
                  >
                    25평 구축 아파트 화이트&amp;우드 리모델링 후기 (비용 공개)
                  </h2>
                  <p
                    class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4 line-clamp-2"
                  >
                    턴키로 진행했고 샷시 포함해서 4천만원 들었습니다. 업체 선정 팁이랑 자재 고를
                    때 유의할 점 적어봤어요. 사진도 많이 첨부했으니 참고하세요.
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="flex items-center gap-2">
                        <div
                          class="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 grid place-items-center text-[10px] font-bold text-teal-600 dark:text-teal-300"
                        >
                          DH
                        </div>
                        <span class="text-xs font-medium text-gray-700 dark:text-gray-300"
                          >디자인하우스</span
                        >
                      </div>
                    </div>
                    <div
                      class="flex items-center gap-3 text-xs text-text-sub-light dark:text-text-sub-dark"
                    >
                      <div class="flex items-center gap-1 text-red-500">
                        <span class="material-symbols-outlined text-[14px]">favorite</span>
                        <span>89</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px]"
                          >chat_bubble_outline</span
                        >
                        <span>32</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px]">visibility</span>
                        <span>3.5k</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="hidden sm:block w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img
                    alt="Interior Remodeling"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDPhFNJjDxnRm_yLa5O6JpzK6ZnzGNhbxUNm8OmskjqZXWpfE637dSf4BVHL4nI11ccvzChLkeMV9Vjs-4sBnV4H1CWLZo85Uqd_fnWFx0dqdaCJGP993EqwSAn-7B3FtwSHJIvDybuX6PfzN1HsQbL8neOZjhDZbMdvLXV2Kc5041CPxAV24o5uZtXieoEC9HRFQYCqjKK__WoNMIbYwZkIcHImMPRxTaWFLNueNLEQDejOJFGDtlIWFwN_gX_qwQ1zi4_jF6xg"
                  />
                </div>
              </div>
            </article>
            <article
              class="group bg-surface-light dark:bg-surface-dark rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:shadow-md transition-all cursor-pointer"
            >
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    >자유게시판</span
                  >
                  <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                    >5시간 전</span
                  >
                </div>
                <h2
                  class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-hover transition-colors"
                >
                  요즘 금리 때문에 매수 타이밍 잡기가 너무 어렵네요
                </h2>
                <p
                  class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4 line-clamp-2"
                >
                  조금 더 기다려야 할지 아니면 급매 나오는거 잡아야 할지 고민입니다. 여러분들은
                  어떻게 보고 계신가요? 전문가 의견도 찾아보고 있는데 갈피를 못 잡겠어요.
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2">
                      <img
                        alt="User Avatar"
                        class="w-6 h-6 rounded-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9UqZI6xGNearEDrA41i92rsXgQ9qrGz5pJqodhNhhvF4ym-9-0pPItY3zCrca9rZ_gHzhC_n64Aewty7x3Sf_9s49lyJtRw9vzIsm4PoOdJczkVAU-qFYmfP5dZW2zvrdwP8e5FoXQNW93ZST8iIP_5tT0ER9vDXi_THaka3Mzj-IlDxdnnPmrD9Ra4uUSxfMIB4LMKQfCIbSWxHuwzJSfzpuAzAVVZ6oYfM0jLlOpDfrlxHHM12oeJDrSxMy51nWFO1iGnyaxg"
                      />
                      <span class="text-xs font-medium text-gray-700 dark:text-gray-300"
                        >고민많은직장인</span
                      >
                    </div>
                  </div>
                  <div
                    class="flex items-center gap-3 text-xs text-text-sub-light dark:text-text-sub-dark"
                  >
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">favorite_border</span>
                      <span>12</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]"
                        >chat_bubble_outline</span
                      >
                      <span>24</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <span class="material-symbols-outlined text-[14px]">visibility</span>
                      <span>560</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div class="mt-12 flex justify-center">
            <nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <a
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
                href="#"
              >
                <span class="sr-only">Previous</span>
                <span class="material-symbols-outlined text-sm">chevron_left</span>
              </a>
              <a
                aria-current="page"
                class="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-gray-900 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                href="#"
                >1</a
              >
              <a
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
                href="#"
                >2</a
              >
              <a
                class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 md:inline-flex"
                href="#"
                >3</a
              >
              <span
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:outline-offset-0"
                >...</span
              >
              <a
                class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 md:inline-flex"
                href="#"
                >8</a
              >
              <a
                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gamma-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
                href="#"
                >9</a
              >
              <a
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0"
                href="#"
              >
                <span class="sr-only">Next</span>
                <span class="material-symbols-outlined text-sm">chevron_right</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
