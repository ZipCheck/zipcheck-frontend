<template>
  <transition name="toast">
    <div v-if="visible" :class="toastClasses">
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info', // 'info', 'success', 'error'
  },
  duration: {
    type: Number,
    default: 3000,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:show']);

const visible = ref(props.show);

watch(() => props.show, (newValue) => {
  visible.value = newValue;
  if (newValue) {
    setTimeout(() => {
      visible.value = false;
      emit('update:show', false);
    }, props.duration);
  }
});

const toastClasses = computed(() => [
  'fixed', 'bottom-5', 'left-1/2', '-translate-x-1/2',
  'px-6', 'py-3', 'rounded-full', 'shadow-lg',
  'text-white', 'text-sm', 'font-medium', 'z-50',
  {
    'bg-red-500': props.type === 'error',
    'bg-green-500': props.type === 'success',
    'bg-gray-800': props.type === 'info',
  }
]);
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
