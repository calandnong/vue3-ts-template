<script setup lang="ts">
import { ref } from 'vue';

import { setItem, getItem, removeItem, Key } from '@/utils/adapters/storage/index';
import type { ValueType } from '@/utils/adapters/storage/index';

defineProps<{ msg: string }>();

const count = ref(0);

// 这里告诉你有哪些接口你可以调用 以及调用案例，禁止直接调用浏览器api例如：localstorage
// 有问题先学习 不懂问我

// localstorage本地存储
setItem< ValueType[Key.Token] >(Key.Token, '用户标识字符串');

getItem< ValueType[Key.Token] >(Key.Token);

removeItem(Key.Token);

// 路由

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button
      type="button"
      @click="count++"
    >
      count is {{ count }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
    >create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a
      href="https://github.com/vuejs/language-tools"
      target="_blank"
    >Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">
    Click on the Vite and Vue logos to learn more
  </p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
