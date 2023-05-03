<script setup lang="ts">
import { onPageScroll } from '@/adapters/page-events';

console.log('重新渲染publish');

onPageScroll(() => {
  console.log('滚动了publish');
});
</script>

<template>
  <div class="publish">
    发布
  </div>
</template>

<style lang="scss" scoped>
.publish {
  height: 3000rem;
}
</style>
