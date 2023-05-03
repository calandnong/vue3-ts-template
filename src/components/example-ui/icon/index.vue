<script setup lang="ts">
import { getImageUrl } from '@/adapters/images';

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
