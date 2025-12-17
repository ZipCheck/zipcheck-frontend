<template>
	<section class="space-y-8">
		<div class="text-center sm:text-left">
			<h2 class="text-2xl font-bold text-text-main">주요 서비스 소개</h2>
			<p class="text-text-muted mt-2">
				ZipCheck에서 제공하는 핵심 기능을 만나보세요.
			</p>
		</div>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Card 1 -->
			<div
				class="group bg-white p-8 rounded-2xl border border-border-color hover:border-primary hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col items-start gap-4 h-full"
			>
				<div
					class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors"
				>
					<span class="material-symbols-outlined text-3xl text-text-main"
						>forum</span
					>
				</div>
				<div>
					<h3
						class="text-lg font-bold mb-2 group-hover:text-primary-dark transition-colors"
					>
						커뮤니티 정보
					</h3>
					<p class="text-sm text-text-muted leading-relaxed">
						이웃들과 부동산 인사이트를 나누고 소통하세요.
					</p>
				</div>
			</div>
			<!-- Card 2 -->
			<div
				class="group bg-white p-8 rounded-2xl border border-border-color hover:border-primary hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col items-start gap-4 h-full"
			>
				<div
					class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors"
				>
					<span class="material-symbols-outlined text-3xl text-text-main"
						>thumb_up</span
					>
				</div>
				<div>
					<h3
						class="text-lg font-bold mb-2 group-hover:text-primary-dark transition-colors"
					>
						실제 사용자 후기
					</h3>
					<p class="text-sm text-text-muted leading-relaxed">
						거주민 인증을 거친 생생한 실제 후기를 확인하세요.
					</p>
				</div>
			</div>
			<!-- Card 3 -->
			<div
				class="group bg-white p-8 rounded-2xl border border-border-color hover:border-primary hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col items-start gap-4 h-full"
			>
				<div
					class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors"
				>
					<span class="material-symbols-outlined text-3xl text-text-main"
						>campaign</span
					>
				</div>
				<div>
					<h3
						class="text-lg font-bold mb-2 group-hover:text-primary-dark transition-colors"
					>
						공식 공지사항
					</h3>
					<p class="text-sm text-text-muted leading-relaxed">
						주요 정책 변경 및 공식 알림을 빠르게 받아보세요.
					</p>
				</div>
			</div>
			<!-- Card 4 -->
			<div
				class="group bg-white p-8 rounded-2xl border border-border-color hover:border-primary hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col items-start gap-4 h-full"
			>
				<div
					class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors"
				>
					<span class="material-symbols-outlined text-3xl text-text-main"
						>map</span
					>
				</div>
				<div>
					<h3
						class="text-lg font-bold mb-2 group-hover:text-primary-dark transition-colors"
					>
						간편 검색
					</h3>
					<p class="text-sm text-text-muted leading-relaxed">
						원하는 지역과 아파트를 지도 기반으로 쉽게 찾으세요.
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup></script>
