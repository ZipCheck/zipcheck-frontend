<!DOCTYPE html>

<html class="light" lang="ko"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>ZipCheck - Transparent Real Estate Community</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#f9f506",
                        "primary-dark": "#e6e205",
                        "background-light": "#fdfdfc",
                        "background-alt": "#f7f7f5",
                        "background-dark": "#23220f",
                        "text-main": "#181811",
                        "text-muted": "#8c8b5f",
                        "border-color": "#e6e6db",
                    },
                    fontFamily: {
                        "display": ["Spline Sans", "Noto Sans KR", "sans-serif"],
                        "body": ["Spline Sans", "Noto Sans KR", "sans-serif"],
                    },
                    borderRadius: {
                        "DEFAULT": "1rem",
                        "lg": "1.5rem",
                        "xl": "2rem",
                        "2xl": "3rem",
                        "full": "9999px"
                    },
                    boxShadow: {
                        'soft': '0 4px 20px rgba(0,0,0,0.03)',
                        'soft-hover': '0 8px 30px rgba(0,0,0,0.06)',
                    }
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Spline Sans', 'Noto Sans KR', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .icon-filled {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-background-light text-text-main">
<!-- Sticky Header -->
<header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-border-color">
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex h-16 items-center justify-between">
<!-- Logo -->
<div class="flex items-center gap-2 cursor-pointer">
<div class="flex items-center justify-center size-8 bg-primary rounded-lg text-text-main">
<span class="material-symbols-outlined icon-filled text-xl">home_work</span>
</div>
<span class="text-xl font-bold tracking-tight text-text-main">ZipCheck</span>
</div>
<!-- Navigation -->
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-semibold text-text-main hover:text-primary-dark transition-colors" href="#">Home</a>
<a class="text-sm font-medium text-text-muted hover:text-text-main transition-colors" href="#">Board</a>
<a class="text-sm font-medium text-text-muted hover:text-text-main transition-colors" href="#">Announcements</a>
</nav>
<!-- Auth Buttons -->
<div class="flex items-center gap-3">
<button class="hidden sm:flex text-sm font-medium text-text-main hover:bg-background-alt px-4 py-2 rounded-full transition-colors">
                        Login
                    </button>
<button class="flex items-center justify-center bg-primary hover:bg-primary-dark text-text-main text-sm font-bold px-5 py-2 rounded-full transition-colors shadow-sm">
                        Sign Up
                    </button>
</div>
</div>
</div>
</header>
<main class="flex flex-col min-h-screen">
<!-- Hero Section -->
<section class="relative bg-background-alt py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
<!-- Decorative Background Pattern -->
<div class="absolute inset-0 opacity-30 pointer-events-none" style="background-image: radial-gradient(#e6e6db 1px, transparent 1px); background-size: 24px 24px;"></div>
<div class="relative z-10 w-full max-w-4xl text-center space-y-8">
<div class="space-y-4">
<h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-main leading-[1.15]">
                        어떤 집을 <br class="sm:hidden"/>찾고 계신가요?
                    </h1>
<p class="text-lg md:text-xl text-text-muted font-medium max-w-2xl mx-auto">
                        투명한 정보와 생생한 후기로 내 집 마련의 꿈을 이루세요.
                    </p>
</div>
<!-- Search Bar -->
<div class="w-full max-w-2xl mx-auto">
<div class="group relative flex items-center w-full h-16 rounded-full bg-white border-2 border-transparent focus-within:border-primary shadow-soft hover:shadow-soft-hover transition-all duration-300">
<div class="pl-6 text-text-muted">
<span class="material-symbols-outlined text-[28px]">search</span>
</div>
<input class="w-full h-full bg-transparent border-none focus:ring-0 text-lg px-4 placeholder:text-gray-400 text-text-main" placeholder="아파트 / 단지명 / 지역 / 게시글 검색" type="text"/>
<div class="pr-2">
<button class="h-12 px-8 bg-primary hover:bg-primary-dark rounded-full font-bold text-text-main transition-colors text-base whitespace-nowrap">
                                검색
                            </button>
</div>
</div>
</div>
<!-- Auxiliary CTAs -->
<div class="flex flex-wrap items-center justify-center gap-4 pt-2">
<a class="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-border-color rounded-full hover:border-primary hover:text-primary-dark transition-all shadow-sm group" href="#">
<span class="text-sm font-semibold">실제 사용자 후기 보러가기</span>
<span class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
<a class="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-border-color rounded-full hover:border-primary hover:text-primary-dark transition-all shadow-sm group" href="#">
<span class="text-sm font-semibold">최근 커뮤니티 글 보기</span>
<span class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
</a>
</div>
</div>
</section>
<!-- Main Content Container -->
<div class="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
<!-- Key Service Introduction -->
<section class="space-y-8">
<div class="text-center sm:text-left">
<h2 class="text-2xl font-bold text-text-main">주요 서비스 소개</h2>
<p class="text-text-muted mt-2">ZipCheck에서 제공하는 핵심 기능을 만나보세요.</p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Card 1 -->
<div class="group bg-white p-8 rounded-2xl border border-border-color hover:border-primary hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col items-start gap-4 h-full">
<div class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
<span class="material-symbols-outlined text-3xl text-text-main">forum</span>
</div>
<div>
<h3 class="text-lg font-bold mb-2 group-hover:text-primary-dark transition-colors">커뮤니티 정보</h3>
<p class="text-sm text-text-muted leading-relaxed">이웃들과 부동산 인사이트를 나누고 소통하세요.</p>
</div>
</div>
<!-- Card 2 -->
<div class="group bg-white p-8 rounded-2xl border border-border-color hover:border-primary hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col items-start gap-4 h-full">
<div class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
<span class="material-symbols-outlined text-3xl text-text-main">thumb_up</span>
</div>
<div>
<h3 class="text-lg font-bold mb-2 group-hover:text-primary-dark transition-colors">실제 사용자 후기</h3>
<p class="text-sm text-text-muted leading-relaxed">거주민 인증을 거친 생생한 실제 후기를 확인하세요.</p>
</div>
</div>
<!-- Card 3 -->
<div class="group bg-white p-8 rounded-2xl border border-border-color hover:border-primary hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col items-start gap-4 h-full">
<div class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
<span class="material-symbols-outlined text-3xl text-text-main">campaign</span>
</div>
<div>
<h3 class="text-lg font-bold mb-2 group-hover:text-primary-dark transition-colors">공식 공지사항</h3>
<p class="text-sm text-text-muted leading-relaxed">주요 정책 변경 및 공식 알림을 빠르게 받아보세요.</p>
</div>
</div>
<!-- Card 4 -->
<div class="group bg-white p-8 rounded-2xl border border-border-color hover:border-primary hover:shadow-soft-hover transition-all duration-300 cursor-pointer flex flex-col items-start gap-4 h-full">
<div class="size-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
<span class="material-symbols-outlined text-3xl text-text-main">map</span>
</div>
<div>
<h3 class="text-lg font-bold mb-2 group-hover:text-primary-dark transition-colors">간편 검색</h3>
<p class="text-sm text-text-muted leading-relaxed">원하는 지역과 아파트를 지도 기반으로 쉽게 찾으세요.</p>
</div>
</div>
</div>
</section>
<!-- Content Preview Grid -->
<section class="grid grid-cols-1 lg:grid-cols-2 gap-8">
<!-- Latest Announcements -->
<div class="bg-white rounded-[2rem] border border-border-color p-8 shadow-soft h-full">
<div class="flex items-center justify-between mb-6">
<h3 class="text-xl font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary-dark">campaign</span>
                            최근 공지사항
                        </h3>
<a class="text-sm font-medium text-text-muted hover:text-primary-dark" href="#">더보기</a>
</div>
<div class="space-y-4">
<!-- Item 1 -->
<div class="flex gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer items-start">
<div class="mt-1">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                                    중요
                                </span>
</div>
<div class="flex-1">
<p class="text-sm font-semibold text-text-main line-clamp-1">2023년 4분기 부동산 정책 변경 안내</p>
<p class="text-xs text-text-muted mt-1">2023.10.24</p>
</div>
</div>
<!-- Item 2 -->
<div class="flex gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer items-start">
<div class="mt-1">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                    공지
                                </span>
</div>
<div class="flex-1">
<p class="text-sm font-semibold text-text-main line-clamp-1">서비스 점검 안내 (11월 1일 02:00 ~ 06:00)</p>
<p class="text-xs text-text-muted mt-1">2023.10.23</p>
</div>
</div>
<!-- Item 3 -->
<div class="flex gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer items-start">
<div class="mt-1">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                                    일반
                                </span>
</div>
<div class="flex-1">
<p class="text-sm font-semibold text-text-main line-clamp-1">커뮤니티 이용 가이드 업데이트</p>
<p class="text-xs text-text-muted mt-1">2023.10.20</p>
</div>
</div>
</div>
</div>
<!-- Latest Posts -->
<div class="bg-white rounded-[2rem] border border-border-color p-8 shadow-soft h-full">
<div class="flex items-center justify-between mb-6">
<h3 class="text-xl font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-primary-dark">forum</span>
                            최근 커뮤니티 글
                        </h3>
<a class="text-sm font-medium text-text-muted hover:text-primary-dark" href="#">더보기</a>
</div>
<div class="space-y-4">
<!-- Post 1 -->
<div class="flex items-center gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer">
<img alt="User avatar showing initials UO" class="size-10 rounded-full bg-gray-200 object-cover" data-alt="User avatar showing initials UO" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4IA-By7LC6C-PJSy3MUTcE9fKX2kat-Sr19T3N8O3eXMfRXjTMWzfiHrZtoZYqv1Vap62w0aFSvxbCZujZhJSaWQuxP2JKasB6qIb7fIvYIpRhjAdHFkZ3DyBgA6lyc5fTEfW2uSCa3l4kNEdX-mQkTdhE96IyPT-Ak_AWlOPANWaPrGBVsWZrfATRFADFkdVmhNqwdWQhKwmy2mKk9qNsOZ6Y67-148YYrzbvQBlX0k2ggiqp7MaJXAKEDJpRDyg9l1t4YI4ml0O"/>
<div class="flex-1 min-w-0">
<div class="flex items-center gap-2 mb-0.5">
<span class="text-xs font-bold text-primary-dark bg-yellow-50 px-2 py-0.5 rounded-md">자유게시판</span>
<span class="text-xs text-text-muted">3분 전</span>
</div>
<p class="text-sm font-semibold text-text-main truncate">강남구 역삼동 아파트 전세 시세 질문드립니다.</p>
</div>
</div>
<!-- Post 2 -->
<div class="flex items-center gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer">
<img alt="User avatar showing initials HH" class="size-10 rounded-full bg-gray-200 object-cover" data-alt="User avatar showing initials HH" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU3qRVggXdxQc6b8ZEoGZUR7JJe5ybd7yHXynKOx45ANluP67cm9PlGRC94C8xB48Ck1onuAVYjug6_j4XCLutB3qk7yuGRilYzA7SeoNekMxAWS91dB1yMZsfdWpWhu1C-BcRRmquD8TfuyHgFLLfLRcBdMZVeW0fYdfnhQppoedZ0AdtLlt8IAFc7CjhHl_sG7RH03sXbqlafHmM7rVpZC9f33_NXNIbHf37kH1pLO0mHGTVi-67JoSwf2bG2Qe5Kf9K4AJD6IOC"/>
<div class="flex-1 min-w-0">
<div class="flex items-center gap-2 mb-0.5">
<span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">매매후기</span>
<span class="text-xs text-text-muted">12분 전</span>
</div>
<p class="text-sm font-semibold text-text-main truncate">드디어 내 집 마련 성공했습니다! (발품 후기)</p>
</div>
</div>
<!-- Post 3 -->
<div class="flex items-center gap-4 p-3 hover:bg-background-alt rounded-xl transition-colors cursor-pointer">
<img alt="User avatar showing initials SL" class="size-10 rounded-full bg-gray-200 object-cover" data-alt="User avatar showing initials SL" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEj9R_txOCe-nJQW2GFU2HBj-PMY6RzL2XPVO6rChUezwowRnYmTiUmsRzfl6uv9oR27Njbq5pJyAwGy1qGm06cbuzQgt2JD_GC5ZS1IwCGsdmk0GkEw_DVVErL2Iw_F1a_ZCXIJrUB4zd5TsS7pc4VTRroqGUZGIjRK128MIUsD1BImstMTqvIWehur8YMDZebWQ7PceRs_UdOMNmkq2LrTTWVdELK1X3RfhFzLt3Dz3sthCK5usJc5hi04qBYV82jri_BqCm0u6"/>
<div class="flex-1 min-w-0">
<div class="flex items-center gap-2 mb-0.5">
<span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">동네질문</span>
<span class="text-xs text-text-muted">45분 전</span>
</div>
<p class="text-sm font-semibold text-text-main truncate">송파구 헬리오시티 근처 맛집 추천 부탁드려요.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Reliability Banner -->
<section class="bg-background-alt rounded-[3rem] p-10 md:p-16 text-center">
<div class="max-w-3xl mx-auto space-y-12">
<div class="space-y-4">
<h2 class="text-2xl md:text-3xl font-bold text-text-main">투명하고 신뢰할 수 있는 주거 정보</h2>
<p class="text-text-muted text-base md:text-lg">ZipCheck는 사용자 중심의 투명한 부동산 생태계를 만들어갑니다.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-10">
<div class="flex flex-col items-center gap-4">
<div class="size-16 rounded-full bg-white shadow-sm border border-border-color flex items-center justify-center text-primary-dark">
<span class="material-symbols-outlined text-3xl">verified_user</span>
</div>
<div>
<h3 class="font-bold text-lg mb-2">검증된 사용자</h3>
<p class="text-sm text-text-muted leading-relaxed">휴대폰 및 거주지 인증을 완료한<br/>실사용자들의 커뮤니티</p>
</div>
</div>
<div class="flex flex-col items-center gap-4">
<div class="size-16 rounded-full bg-white shadow-sm border border-border-color flex items-center justify-center text-primary-dark">
<span class="material-symbols-outlined text-3xl">visibility</span>
</div>
<div>
<h3 class="font-bold text-lg mb-2">투명한 정보</h3>
<p class="text-sm text-text-muted leading-relaxed">허위 매물과 광고성 글 없는<br/>깨끗한 정보 제공</p>
</div>
</div>
<div class="flex flex-col items-center gap-4">
<div class="size-16 rounded-full bg-white shadow-sm border border-border-color flex items-center justify-center text-primary-dark">
<span class="material-symbols-outlined text-3xl">sentiment_satisfied</span>
</div>
<div>
<h3 class="font-bold text-lg mb-2">사용자 중심 서비스</h3>
<p class="text-sm text-text-muted leading-relaxed">이윤보다 사용자의 경험을<br/>최우선으로 생각하는 가치</p>
</div>
</div>
</div>
</div>
</section>
</div>
</main>
<!-- Footer -->
<footer class="bg-white border-t border-border-color py-12 mt-auto">
<div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div class="space-y-4">
<div class="flex items-center gap-2">
<div class="flex items-center justify-center size-6 bg-primary rounded text-text-main">
<span class="material-symbols-outlined icon-filled text-sm">home_work</span>
</div>
<span class="text-lg font-bold tracking-tight text-text-main">ZipCheck</span>
</div>
<p class="text-sm text-text-muted max-w-sm">
                        ZipCheck는 누구나 쉽고 투명하게 부동산 정보를 확인하고<br/>소통할 수 있는 공간입니다.
                    </p>
</div>
<div class="flex gap-8 text-sm font-medium text-text-muted">
<a class="hover:text-text-main transition-colors" href="#">이용약관</a>
<a class="hover:text-text-main transition-colors" href="#">개인정보처리방침</a>
<a class="hover:text-text-main transition-colors" href="#">고객센터</a>
</div>
</div>
<div class="mt-8 pt-8 border-t border-border-color text-xs text-text-muted text-center md:text-left">
                © 2023 ZipCheck. All rights reserved.
            </div>
</div>
</footer>
</body></html>