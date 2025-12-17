<template>
	<main class="flex flex-col min-h-screen">
		<HeroSection />

		<!-- Main Content Container -->
		<div
			class="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20"
		>
			<FeatureSection />

			<!-- Content Preview Grid -->
			<section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<NoticePreview />
				<BoardPreview />
			</section>

			<WhyZipCheck />
		</div>
	</main>
</template>

<script setup>
import HeroSection from '@/components/home/HeroSection.vue';
import FeatureSection from '@/components/home/FeatureSection.vue';
import NoticePreview from '@/components/home/NoticePreview.vue';
import BoardPreview from '@/components/home/BoardPreview.vue';
import WhyZipCheck from '@/components/home/WhyZipCheck.vue';
</script>
