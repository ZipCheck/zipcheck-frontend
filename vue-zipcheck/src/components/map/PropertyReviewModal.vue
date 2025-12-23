<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="$emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
        <h3 class="font-bold text-lg text-gray-900 dark:text-white truncate pr-4">{{ apartmentName }}</h3>
        <button @click="$emit('close')" class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="p-6 overflow-y-auto flex-grow space-y-6">
        <!-- Sentiment Selection -->
        <div class="space-y-3">
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">이 매물의 첫인상은 어땠나요?</label>
          <div class="flex gap-3">
            <button 
              v-for="s in sentiments" 
              :key="s.value"
              @click="selectedSentiment = s.value"
              :class="[
                'flex-1 py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1',
                selectedSentiment === s.value 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-gray-100 dark:border-gray-700 text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              <span class="material-symbols-outlined text-3xl">{{ s.icon }}</span>
              <span class="text-xs font-bold">{{ s.label }}</span>
            </button>
          </div>
        </div>

        <!-- Emoticon Selection -->
        <div v-if="selectedSentiment" class="space-y-3 animate-fade-in">
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">어떤 점이 느껴졌나요?</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="emo in currentEmoticons"
              :key="emo.id"
              @click="selectedEmoticon = emo.id"
              :class="[
                'aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all border',
                selectedEmoticon === emo.id
                  ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                  : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-500'
              ]"
            >
              <span class="text-2xl">{{ emo.char }}</span>
              <span class="text-[10px] font-medium text-center leading-tight px-1 break-keep">{{ emo.label }}</span>
            </button>
          </div>
        </div>

        <!-- Description Input -->
        <div class="space-y-3">
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300">상세한 메모를 남겨주세요</label>
          <textarea
            v-model="description"
            rows="4"
            class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none placeholder-gray-400"
            placeholder="매물에 대한 솔직한 생각이나 특징을 기록해보세요."
          ></textarea>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-3 bg-gray-50 dark:bg-gray-900/50">
        <button 
          @click="navigateToDetail"
          class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold transition-colors text-sm"
        >
          <span class="material-symbols-outlined text-lg">visibility</span>
          상세페이지
        </button>
        <button 
          @click="saveReview"
          class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/30 transition-all active:scale-95 text-sm"
        >
          <span class="material-symbols-outlined text-lg">save</span>
          저장하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  isOpen: Boolean,
  apartmentName: String,
  apartmentId: [String, Number]
});

const emit = defineEmits(['close', 'save']);
const router = useRouter();

const selectedSentiment = ref(null);
const selectedEmoticon = ref(null);
const description = ref('');

const sentiments = [
  { value: 'negative', label: '별로예요', icon: 'sentiment_dissatisfied' },
  { value: 'neutral', label: '보통이에요', icon: 'sentiment_neutral' },
  { value: 'positive', label: '좋아요', icon: 'sentiment_satisfied' }
];

const emoticons = {
  negative: [
    { id: 'noise', char: '📢', label: '소음' },
    { id: 'old', char: '🏚️', label: '노후됨' },
    { id: 'dark', char: '🌑', label: '채광나쁨' },
    { id: 'smell', char: '🤢', label: '악취' },
    { id: 'parking', char: '🚗', label: '주차난' },
    { id: 'uphill', char: '🏔️', label: '언덕' },
    { id: 'insect', char: '🐜', label: '벌레' },
    { id: 'leak', char: '💧', label: '누수' }
  ],
  neutral: [
    { id: 'soso', char: '😐', label: '무난함' },
    { id: 'fair_price', char: '💰', label: '적정가' },
    { id: 'average_loc', char: '📍', label: '평범한위치' },
    { id: 'normal_view', char: '🏢', label: '일반뷰' }
  ],
  positive: [
    { id: 'sun', char: '☀️', label: '채광좋음' },
    { id: 'quiet', char: '🤫', label: '조용함' },
    { id: 'view', char: '🏞️', label: '뷰맛집' },
    { id: 'new', char: '✨', label: '신축/관리' },
    { id: 'station', char: '🚇', label: '역세권' },
    { id: 'infra', char: '🏪', label: '편의시설' },
    { id: 'school', char: '🏫', label: '학군좋음' },
    { id: 'park', char: '🌳', label: '공원인접' }
  ]
};

const currentEmoticons = computed(() => {
  return selectedSentiment.value ? emoticons[selectedSentiment.value] : [];
});

// Reset form when modal opens/closes
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    selectedSentiment.value = null;
    selectedEmoticon.value = null;
    description.value = '';
  }
});

const navigateToDetail = () => {
  if (props.apartmentId) {
    router.push(`/apartment/${props.apartmentId}`);
    emit('close');
  }
};

const saveReview = () => {
  const reviewData = {
    sentiment: selectedSentiment.value,
    emoticon: selectedEmoticon.value,
    description: description.value,
    aptId: props.apartmentId
  };
  emit('save', reviewData);
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
