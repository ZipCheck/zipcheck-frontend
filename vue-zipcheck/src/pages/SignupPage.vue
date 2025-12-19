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
				<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
					환영합니다!
				</h1>
				<p class="text-text-sub-light dark:text-text-sub-dark text-sm">
					투명한 부동산 정보 커뮤니티 ZipCheck와 함께하세요.
				</p>
			</div>
			<form @submit.prevent="handleSignup" class="space-y-5" method="POST">
				<!-- Profile Image Upload -->
				<div class="flex flex-col items-center space-y-4">
					<label
						for="profile-image-input"
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
						>프로필 이미지 (선택 사항)</label
					>
					<div class="relative cursor-pointer" @click="triggerFileInput">
						<img
							:src="imagePreview"
							alt="Profile"
							class="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
						/>
						<div
							class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity"
						>
							<span class="material-icons-round text-white">photo_camera</span>
						</div>
					</div>
					<input
						ref="fileInput"
						type="file"
						@change="handleFileChange"
						class="hidden"
						id="profile-image-input"
						accept="image/*"
					/>
				</div>
				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
						for="email-username"
						>이메일 주소</label
					>
					<div class="flex gap-2">
						<input
							v-model="emailUsername"
							class="block w-full pl-3 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
							id="email-username"
							name="email-username"
							placeholder="아이디"
							required
							type="text"
						/>
						<span
							class="flex items-center text-text-sub-light dark:text-text-sub-dark"
							>@</span
						>
						<select
							v-model="selectedDomain"
							class="block w-full py-3 px-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm"
						>
							<option value="직접 입력">직접 입력</option>
							<option value="gmail.com">gmail.com</option>
							<option value="naver.com">naver.com</option>
						</select>
					</div>
					<input
						v-if="selectedDomain === '직접 입력'"
						v-model="customDomain"
						class="mt-2 block w-full pl-3 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
						id="custom-domain"
						name="custom-domain"
						placeholder="직접 입력"
						required
						type="text"
					/>
				</div>
				<div>
					<label
						class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
						for="nickname"
						>닉네임</label
					>
					<div class="relative">
						<div
							class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
						>
							<span class="material-icons-round text-gray-400 text-xl"></span>
						</div>
						<input
							v-model="nickname"
							class="block w-full pl-10 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
							id="nickname"
							name="nickname"
							placeholder="커뮤니티에서 사용할 이름"
							required
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
						<div
							class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
						>
							<span class="material-icons-round text-gray-400 text-xl"></span>
						</div>
						<input
							v-model="password"
							class="block w-full pl-10 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
							id="password"
							name="password"
							placeholder="8자 이상 입력해주세요"
							required
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
						<div
							class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
						>
							<span class="material-icons-round text-gray-400 text-xl"></span>
						</div>
						<input
							v-model="passwordConfirm"
							class="block w-full pl-10 pr-3 py-3 border border-input-border-light dark:border-input-border-dark rounded-xl leading-5 bg-white dark:bg-zinc-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm dark:text-white"
							id="password_confirm"
							name="password_confirm"
							placeholder="비밀번호를 한번 더 입력해주세요"
							required
							type="password"
						/>
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
						<div
							class="w-full border-t border-gray-200 dark:border-gray-700"
						></div>
					</div>
					<div class="relative flex justify-center text-sm"></div>
				</div>
				<p
					class="mt-4 text-center text-sm text-text-sub-light dark:text-text-sub-dark"
				>
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

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '@/api/auth.api';
import defaultAvatar from '@/assets/images/default-avatar.svg';

const router = useRouter();

const emailUsername = ref('');
const selectedDomain = ref('직접 입력'); // Default to direct input
const customDomain = ref('');
const nickname = ref('');
const password = ref('');
const passwordConfirm = ref('');
const profileImage = ref(null);
const imagePreview = ref(defaultAvatar);
const fileInput = ref(null);

const triggerFileInput = () => {
	fileInput.value.click();
};

const handleFileChange = event => {
	const file = event.target.files[0];
	if (file) {
		profileImage.value = file;
		const reader = new FileReader();
		reader.onload = e => {
			imagePreview.value = e.target.result;
		};
		reader.readAsDataURL(file);
	}
};

const handleSignup = async () => {
	if (password.value !== passwordConfirm.value) {
		alert('비밀번호가 일치하지 않습니다.');
		return;
	}

	let fullEmail;
	if (selectedDomain.value === '직접 입력') {
		fullEmail = `${emailUsername.value}@${customDomain.value}`;
	} else {
		fullEmail = `${emailUsername.value}@${selectedDomain.value}`;
	}

	const signupData = {
		email: fullEmail,
		nickname: nickname.value,
		password: password.value,
	};

	// Only include profileImage if a new image was uploaded
	if (imagePreview.value !== defaultAvatar) {
		signupData.profileImage = imagePreview.value;
	}

	try {
		await signup(signupData);
		alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
		router.push('/login');
	} catch (error) {
		console.error('Signup failed:', error);
		alert('회원가입에 실패했습니다. 입력 정보를 확인해주세요.');
	}
};
</script>

<style scoped></style>
