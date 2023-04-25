<script setup lang="ts">
import { useRouter } from 'vue-router';
import { RoutePath } from '@/router';

const router = useRouter();

function toDynamicList() {
  router.push({
    path: RoutePath.DYNAMIC_LIST,
  });
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
