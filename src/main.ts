import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';

import { router } from './router/index';

import { setUnis } from '@/adapters/self-adaption';

// 设置自适应单位
setUnis();

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app');
