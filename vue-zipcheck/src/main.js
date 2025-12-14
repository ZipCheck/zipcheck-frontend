import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Tailwind import
import './assets/base.css';

createApp(App).use(router).mount('#app');
