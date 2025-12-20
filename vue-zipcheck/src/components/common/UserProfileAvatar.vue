<template>
  <img
    :src="imageSrc"
    :width="size"
    :height="size"
    :class="['rounded-full', 'object-cover', 'bg-gray-200', 'dark:bg-gray-700']"
    :style="{ width: `${size}px`, height: `${size}px` }"
    @error="handleImageError"
    alt="User profile image"
  />
</template>

<script setup>
import { computed } from 'vue';
import defaultAvatar from '@/assets/images/default-avatar.svg';

const props = defineProps({
  userId: {
    type: Number,
    default: null,
  },
  size: {
    type: Number,
    required: true,
  },
});

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const imageSrc = computed(() => {
  // If userId is null or invalid, use the default avatar immediately.
  if (!props.userId) {
    return defaultAvatar;
  }
  // Otherwise, construct the API URL. The @error handler will catch failures.
  return `${apiBaseUrl}/users/${props.userId}/profile-image`;
});

const handleImageError = event => {
  // If the image fails to load (e.g., 404), replace it with the default avatar.
  // To prevent an infinite loop if the default avatar also fails, we can add a check.
  if (event.target.src !== defaultAvatar) {
    event.target.src = defaultAvatar;
  }
};
</script>
