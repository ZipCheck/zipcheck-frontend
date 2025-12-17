<template>
	<section
		class="relative bg-background-alt py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden"
	>
		<!-- Decorative Background Pattern -->
		<div
			class="absolute inset-0 opacity-30 pointer-events-none"
			style="
				background-image: radial-gradient(#e6e6db 1px, transparent 1px);
				background-size: 24px 24px;
			"
		></div>
		<div class="relative z-10 w-full max-w-4xl text-center space-y-8">
			<div class="space-y-4">
				<h1
					class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-main leading-[1.15]"
				>
					어떤 집을 <br class="sm:hidden" />찾고 계신가요?
				</h1>
				<p
					class="text-lg md:text-xl text-text-muted font-medium max-w-2xl mx-auto"
				>
					투명한 정보와 생생한 후기로 내 집 마련의 꿈을 이루세요.
				</p>
			</div>
			<!-- Search Bar -->
			<div class="w-full max-w-2xl mx-auto">
				<div
					class="group relative flex items-center w-full h-16 rounded-full bg-white border-2 border-transparent focus-within:border-primary shadow-soft hover:shadow-soft-hover transition-all duration-300"
				>
					<div class="pl-6 text-text-muted">
						<span class="material-symbols-outlined text-[28px]">search</span>
					</div>
					<input
						class="w-full h-full bg-transparent border-none focus:ring-0 text-lg px-4 placeholder:text-gray-400 text-text-main"
						placeholder="아파트 / 단지명 / 지역 / 게시글 검색"
						type="text"
					/>
					<div class="pr-2">
						<button
							class="h-12 px-8 bg-primary hover:bg-primary-dark rounded-full font-bold text-text-main transition-colors text-base whitespace-nowrap"
						>
							검색
						</button>
					</div>
				</div>
			</div>
			<!-- Auxiliary CTAs -->
			<div class="flex flex-wrap items-center justify-center gap-4 pt-2">
				<a
					class="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-border-color rounded-full hover:border-primary hover:text-primary-dark transition-all shadow-sm group"
					href="#"
				>
					<span class="text-sm font-semibold">실제 사용자 후기 보러가기</span>
					<span
						class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform"
						>arrow_forward</span
					>
				</a>
				<a
					class="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-border-color rounded-full hover:border-primary hover:text-primary-dark transition-all shadow-sm group"
					href="#"
				>
					<span class="text-sm font-semibold">최근 커뮤니티 글 보기</span>
					<span
						class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform"
						>arrow_forward</span
					>
				</a>
			</div>
		</div>
	</section>
</template>

<script setup></script>
