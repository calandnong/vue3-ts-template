<script setup lang="ts">

</script>

<template>
  <div class="common-page">
    <slot name="body" />
  </div>
</template>

<style scoped>
.common-page {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
