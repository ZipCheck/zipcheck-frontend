<template>
  <div class="flex-grow flex items-center justify-center p-4 sm:p-8">
    <div
      class="w-full max-w-md bg-card-light dark:bg-card-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10 transition-all"
    >
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">비밀번호 찾기</h1>
        <p class="text-text-sub-light dark:text-text-sub-dark">
          가입 시 사용한 이메일을 통해 비밀번호를 재설정할 수 있습니다.
        </p>
      </div>
      
      <form @submit.prevent="handleRequestCode" class="space-y-5" v-if="!isCodeSent">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="email">이메일 주소</label>
          <input
            v-model="email"
            class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
        </div>
        <button
          :disabled="loading"
          class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-gray-900 bg-primary hover:bg-primary-hover disabled:opacity-50"
          type="submit"
        >
          <span v-if="loading">전송 중...</span>
          <span v-else>인증코드 발송</span>
        </button>
      </form>

      <form @submit.prevent="handleResetPassword" class="space-y-5" v-if="isCodeSent">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="authCode">인증코드</label>
          <input
            v-model="authCode"
            class="block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            id="authCode"
            name="authCode"
            placeholder="이메일로 받은 6자리 코드"
            required
          />
        </div>
        <button
          :disabled="loading"
          class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-gray-900 bg-primary hover:bg-primary-hover disabled:opacity-50"
          type="submit"
        >
          <span v-if="loading">확인 중...</span>
          <span v-else>비밀번호 재설정</span>
        </button>
      </form>

      <p class="mt-8 text-center text-sm text-text-sub-light dark:text-text-sub-dark">
        <router-link to="/login" class="font-medium text-gray-900 hover:text-primary dark:text-white dark:hover:text-primary transition-colors underline">
          로그인으로 돌아가기
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { sendPasswordResetCode, resetPassword } from '@/api/auth.api.js';

const router = useRouter();
const email = ref('');
const authCode = ref('');
const isCodeSent = ref(false);
const loading = ref(false);

const handleRequestCode = async () => {
  if (!email.value) {
    alert('이메일 주소를 입력해주세요.');
    return;
  }
  loading.value = true;
  try {
    await sendPasswordResetCode(email.value);
    isCodeSent.value = true;
    alert('인증코드가 이메일로 전송되었습니다. 확인 후 입력해주세요.');
  } catch (error) {
    console.error('Failed to send password reset code:', error);
    alert('인증코드 발송에 실패했습니다. 이메일 주소를 확인해주세요.');
  } finally {
    loading.value = false;
  }
};

const handleResetPassword = async () => {
  if (!authCode.value) {
    alert('인증코드를 입력해주세요.');
    return;
  }
  loading.value = true;
  try {
    await resetPassword(email.value, authCode.value);
    alert('임시 비밀번호가 이메일로 발송되었습니다. 로그인 후 비밀번호를 변경해주세요.');
    router.push('/login');
  } catch (error) {
    console.error('Failed to reset password:', error);
    alert('인증코드가 올바르지 않거나 만료되었습니다.');
  } finally {
    loading.value = false;
  }
};
</script>
