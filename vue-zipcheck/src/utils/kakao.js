export const loadKakaoMap = () => {
	if (window.kakao && window.kakao.maps) {
		return Promise.resolve(window.kakao);
	}

	return new Promise((resolve, reject) => {
		const key = import.meta.env.VITE_KAKAO_APP_KEY;
		if (!key) {
			reject(new Error('Missing VITE_KAKAO_APP_KEY'));
			return;
		}

		const existingScript = document.querySelector(
			'script[data-kakao-sdk="true"]',
		);
		if (existingScript) {
			existingScript.addEventListener('load', () => resolve(window.kakao));
			existingScript.addEventListener('error', () =>
				reject(new Error('Kakao Maps SDK load failed')),
			);
			return;
		}

		const script = document.createElement('script');
		script.async = true;
		script.dataset.kakaoSdk = 'true';
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services,clusterer`;
		script.onload = () => resolve(window.kakao);
		script.onerror = () => reject(new Error('Kakao Maps SDK load failed'));
		document.head.appendChild(script);
	});
};
