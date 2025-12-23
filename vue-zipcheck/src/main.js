import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/base.css';

const app = createApp(App);

const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;
const KAKAO_MAP_SCRIPT_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;

const loadKakaoMapScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = KAKAO_MAP_SCRIPT_URL;
    script.onload = () => kakao.maps.load(resolve);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};


app.config.errorHandler = (err, instance, info) => {
	// Report to your error tracking service
	console.error('Vue Error:', err, instance, info);

	// Show a user-friendly message and redirect
	alert('예상치 못한 오류가 발생했습니다. 홈페이지로 이동합니다.');
	router.push('/');
};

window.addEventListener('unhandledrejection', event => {
	console.error('Unhandled Promise Rejection:', event.reason);
	alert('처리되지 않은 오류가 발생했습니다. 홈페이지로 이동합니다.');
	router.push('/');
});

app.use(router);
app.mount('#app');
