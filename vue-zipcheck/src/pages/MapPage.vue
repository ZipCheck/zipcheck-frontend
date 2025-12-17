<template>
	<main class="flex-grow flex relative h-[calc(100vh-64px)] overflow-hidden">
		<MapSidebar />
		<KakaoMap />
	</main>
</template>

<script setup>
import MapSidebar from '@/components/map/MapSidebar.vue';
import KakaoMap from '@/components/map/KakaoMap.vue';
</script>
