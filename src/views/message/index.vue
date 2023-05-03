<script setup lang="ts">
import { onPageScroll } from '@/adapters/page-events';

console.log('重新渲染message');

onPageScroll(() => {
  console.log('滚动了message');
});
</script>

<template>
  <div class="message">
    消息
  </div>
</template>

<style scoped>
.message {
  height: 3000rem;
}
</style>
