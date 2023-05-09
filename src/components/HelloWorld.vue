<script setup lang="ts">
import { ref } from 'vue';

import { setItem, getItem, removeItem, Key } from '@/utils/adapters/storage/index';
import type { ValueType } from '@/utils/adapters/storage/index';

import { RoutePath, useCurrentRoute, pageBack, pageRedirect, pageNext } from '@/router/index';

import { getDomFile } from '@/utils/adapters/dom-file';

import { login } from '@/api/user/account';

defineProps<{ msg: string }>();

const count = ref(0);

// 这里告诉你有哪些接口你可以调用 以及调用案例，禁止直接调用浏览器api例如：localstorage
// 有问题先学习 不懂问我

// ==> localstorage本地存储   禁止直接调用localstorage
setItem< ValueType[Key.Token] >(Key.Token, '用户标识字符串');

getItem< ValueType[Key.Token] >(Key.Token);

removeItem(Key.Token);

// ==> 路由  禁止直接调用vue-router相关api
// 获取当前路由的所有信息
console.log(useCurrentRoute().value);
// 路由倒退，和浏览器的后退差不多一个意思
pageBack(1);
// 路由跳转 提供目标路由需要的参数
pageNext(RoutePath.HOME, { a: 12, str: '343' });
// 重定向   提供目标路由需要的参数
pageRedirect(RoutePath.HOME, { a: 12, str: '343' });
// 获取当前路由的参数 由pageNext和pageRedirect提供 例：{ a: 12, str: '343' }
console.log(useCurrentRoute().value?.query);

// ==>获取文件 禁止直接操作事件获取dom节点 例如e.target.files
const inputDom = ref();

function getFile() {
  const files = getDomFile(inputDom);
  console.log(files);
}

// ==>调用后端接口  @/api/user ，api文件下每一个函数对应一个http请求调用 需要自己编写
const getUserInfo = async () => {
  try {
    const res = await login({
      username: '',
      password: '',
    });
    console.log(res);
  } catch (error) {
    // 处理业务异常
    // if (error instanceof BusinessException) {
    //   // 如果是登陆失效，跳转登陆失效页
    //   if (error.raw.code === ErrorCode.LOGIN_EXPIRE) {
    //     // 某些操作
    //   }
    // }
  }
};
getUserInfo();

</script>

<template>
  <h1>{{ msg }}</h1>
  <input
    ref="inputDom"
    type="file"
    name=""
    @change="getFile"
  >
  <input
    ref="inputDom"
    type="file"
    name=""
  >
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
