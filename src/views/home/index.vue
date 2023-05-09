<script setup lang="ts">

import { useCurrentRoute, pageBack } from '@/router/index';

function toDynamicList() {
  // 这是我测试代码 可以删掉
  console.log(useCurrentRoute().value);

  pageBack(1);
}
</script>

<template>
  <div class="home">
    首页
    <button @click="toDynamicList">
      跳转详情页
    </button>
  </div>
</template>

<style scoped>
.home {
  height: 3000rem;
}

</style>
