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
	profileImageUrl: {
		type: String,
		default: null,
	},
	size: {
		type: Number,
		required: true,
	},
});

const imageSrc = computed(() => {
	// If profileImageUrl is null or empty, use the default avatar.
	if (!props.profileImageUrl) {
		return defaultAvatar;
	}
	// Otherwise, use the provided profileImageUrl.
	return props.profileImageUrl;
});

const handleImageError = event => {
	// If the image fails to load, replace it with the default avatar.
	// To prevent an infinite loop if the default avatar also fails, add a check.
	if (event.target.src !== defaultAvatar) {
		event.target.src = defaultAvatar;
	}
};
</script>
