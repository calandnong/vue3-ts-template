<script setup lang="ts">
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { login } from './api/login';
import { BusinessException } from './adapters/request';
import { ErrorCode } from '@/api/base';

// todo 配置 eslint的excludedFiles
const testError = 1;
console.log(testError);

onMounted(async () => {
  try {
    const res = await login({
      username: '',
      password: '',
    });
    console.log(res);
  }
  catch (error) {
    // 处理业务异常
    if (error instanceof BusinessException) {
      // 如果是登陆失效，跳转登陆失效页
      if (error.raw.code === ErrorCode.LOGIN_EXPIRE) {
        // 某些操作
      }
    }
  }
});

</script>

<template>
  <div>
    <a
      href="https://vitejs.dev"
      target="_blank"
    >
      <img alt="Vite logo">
    </a>
    <a
      href="https://vuejs.org/"
      target="_blank"
    >
      <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
      >
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
