<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { login } from './api/login';
import { BusinessException } from './adapters/request';
import { ErrorCode } from './api/base';

onMounted(async () => {
  try {
    const res = await login({
      username: '',
      password: '',
    });
    console.log(res);
  }
  catch (error) {
    console.log(error);
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
  <router-view />
</template>

<style scoped>

</style>
