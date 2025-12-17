<template>
  <div
    v-if="user"
    class="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden"
  >
    <div class="p-8 pb-0">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">회원정보 수정</h1>
      <p class="text-gray-500 dark:text-gray-400">계정 정보를 확인하고 수정할 수 있습니다.</p>
    </div>
    <div class="p-8 space-y-10">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-gray-100 dark:border-gray-700">
        <div class="relative group">
          <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md">
            <img
              alt="Profile"
              class="w-full h-full object-cover"
              :src="user.profileImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsq-yMNJpHpJieesLdHAW4vM9AmVsOnqATFFB5U3VJgbiOVvz9aWzGQDIjxspdiZih78DoR1Y7toxlaDc3ofFR_RQjM2TI7I_vT8fdpZFZP4Q7x1blrkMTIIlAFrxbowawfVMr6Gjaz1VFB0hzyIU-LnimEBK_0jKHwl5xsElOIKvBTS1IbvbiOzOhElXyii1CZOQIVjYm97O0Ct2kBRGys138unFcm0c--L02hIjpeaEt5mcKOKDZhIjwVLYTLeQ-AA4uD7UZN6M'"
            />
          </div>
          <button
            class="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition shadow-sm border-2 border-white dark:border-gray-800"
          >
            <span class="material-symbols-outlined text-sm">camera_alt</span>
          </button>
        </div>
        <div class="flex-1 text-center sm:text-left">
          <h3 class="font-bold text-lg dark:text-white">프로필 사진</h3>
          <p class="text-sm text-gray-500 mb-4 dark:text-gray-400">png, jpg 파일만 업로드 가능합니다. (최대 5MB)</p>
          <button
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            사진 변경
          </button>
        </div>
      </div>
      <form class="space-y-8" @submit.prevent="handleProfileUpdate">
        <div class="space-y-2">
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">이메일 주소</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-gray-400">email</span>
            </div>
            <input
              class="block w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-500 dark:text-gray-400 sm:text-sm cursor-not-allowed"
              readonly
              type="email"
              :value="user.email"
            />
          </div>
          <p class="text-xs text-gray-400 mt-1 pl-1">이메일 주소는 변경할 수 없습니다.</p>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">닉네임</label>
          <div class="flex gap-3">
            <div class="relative flex-grow">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="material-symbols-outlined text-gray-400">person</span>
              </div>
              <input
                v-model="editableNickname"
                class="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm"
                placeholder="닉네임을 입력해주세요"
                type="text"
              />
            </div>
            <button
              class="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white font-medium rounded-2xl transition-colors whitespace-nowrap border border-gray-200 dark:border-gray-600"
              type="button"
            >
              중복확인
            </button>
          </div>
        </div>
        <div class="border-t border-gray-100 dark:border-gray-700 pt-4"></div>
        <div class="space-y-6">
          <h3 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">lock</span>
            비밀번호 변경
          </h3>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">현재 비밀번호</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="material-symbols-outlined text-gray-400">lock</span>
              </div>
              <input
                class="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm"
                placeholder="현재 사용중인 비밀번호"
                type="password"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">새 비밀번호</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-gray-400">vpn_key</span>
                </div>
                <input
                  class="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm"
                  placeholder="8자 이상 영문/숫자/특수문자"
                  type="password"
                />
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">새 비밀번호 확인</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-gray-400">check_circle</span>
                </div>
                <input
                  class="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-input-bg-dark border border-gray-200 dark:border-gray-600 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm"
                  placeholder="비밀번호 재입력"
                  type="password"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="pt-6 flex items-center justify-end gap-4">
          <button
            class="px-6 py-3.5 rounded-2xl text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            type="button"
          >
            취소
          </button>
          <button
            class="px-8 py-3.5 bg-primary text-gray-900 font-bold rounded-2xl hover:bg-yellow-400 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            type="submit"
          >
            변경사항 저장
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue';

const user = inject('user');
const editableNickname = ref('');

watch(user, (newUser) => {
  if (newUser) {
    editableNickname.value = newUser.nickname;
  }
}, { immediate: true });

const handleProfileUpdate = () => {
    alert('프로필 업데이트 기능은 아직 구현되지 않았습니다.');
    // Here you would call an API to update the profile, e.g.,
    // updateUser({ nickname: editableNickname.value, ...other fields });
}
</script>
