import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/base.css';

const app = createApp(App);

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
