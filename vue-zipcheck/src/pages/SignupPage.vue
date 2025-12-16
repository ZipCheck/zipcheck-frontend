<template>
  <div
    class="flex-grow flex items-center justify-center p-4 sm:px-6 lg:px-8 relative overflow-hidden"
  >
    <div
      class="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute bottom-10 right-10 w-80 h-80 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"
    ></div>
    <div
      class="w-full max-w-md bg-card-light dark:bg-card-dark rounded-2xl shadow-soft dark:shadow-none dark:border dark:border-gray-700 p-8 sm:p-10 relative z-10 animate-fade-in-up"
    >
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">환영합니다!</h1>
        <p class="text-text-sub-light dark:text-text-sub-dark text-sm">
          투명한 부동산 정보 커뮤니티 ZipCheck와 함께하세요.
        </p>
      </div>
      <form action="#" class="space-y-5" method="POST">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" for="email"
            >이메일 주소</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-icons-round text-gray-400 text-xl"></span>
            </div>
            <input
              class="block w-full pl-10 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
              id="email"
              name="email"
              placeholder="example@email.com"
              required=""
              type="email"
            />
          </div>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            for="nickname"
            >닉네임</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-icons-round text-gray-400 text-xl"></span>
            </div>
            <input
              class="block w-full pl-10 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
              id="nickname"
              name="nickname"
              placeholder="커뮤니티에서 사용할 이름"
              required=""
              type="text"
            />
          </div>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            for="password"
            >비밀번호</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-icons-round text-gray-400 text-xl"></span>
            </div>
            <input
              class="block w-full pl-10 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
              id="password"
              name="password"
              placeholder="8자 이상 입력해주세요"
              required=""
              type="password"
            />
          </div>
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
            for="password_confirm"
            >비밀번호 확인</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="material-icons-round text-gray-400 text-xl"></span>
            </div>
            <input
              class="block w-full pl-10 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
              id="password_confirm"
              name="password_confirm"
              placeholder="비밀번호를 한번 더 입력해주세요"
              required=""
              type="password"
            />
          </div>
        </div>
        <div class="flex items-start mt-4">
          <div class="flex items-center h-5">
            <input
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded dark:bg-zinc-800 dark:border-gray-600"
              id="terms"
              name="terms"
              type="checkbox"
            />
          </div>
          <div class="ml-3 text-sm">
            <label class="font-medium text-gray-700 dark:text-gray-300" for="terms">
              <a
                class="text-gray-900 dark:text-white underline hover:text-primary transition-colors"
                href="#"
                >이용약관</a
              >
              및
              <a
                class="text-gray-900 dark:text-white underline hover:text-primary transition-colors"
                href="#"
                >개인정보 처리방침</a
              >에 동의합니다.
            </label>
          </div>
        </div>
        <div class="pt-2">
          <button
            class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-gray-900 bg-primary hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:-translate-y-0.5"
            type="submit"
          >
            회원가입 완료
          </button>
        </div>
        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div class="relative flex justify-center text-sm">
          </div>
        </div>
        <p class="mt-4 text-center text-sm text-text-sub-light dark:text-text-sub-dark">
          이미 계정이 있으신가요?
          <a
          class="font-medium text-gray-900 hover:text-primary dark:text-white dark:hover:text-primary transition-colors underline decoration-2 decoration-primary underline-offset-4"
          href="/login"
        >로그인하기</a
          >
        </p>
      </form>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
