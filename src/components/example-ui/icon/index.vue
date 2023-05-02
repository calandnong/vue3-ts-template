<script setup lang="ts">
function getImageUrl(name: string) {
  return new URL(`./assets/icons/${name}.png`, import.meta.url).href;
}

export interface Props {
  name?: string;
}

withDefaults(defineProps<Props>(), {
  name: '',
});

</script>

<template>
  <img
    class="eui-icon"
    :src="getImageUrl(name)"
    alt=""
  >
</template>

<style lang="scss" scoped>
.eui-icon {
  width: 48rem;
  height: 48rem;
}

</style>
