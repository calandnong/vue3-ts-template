<script setup lang="ts">
import { getImageUrl } from '@/adapters/images';

export type IconName = 'home'
| 'home-select';

export interface Props {
  name?: IconName;
}

withDefaults(defineProps<Props>(), {
  name: 'home',
});

</script>

<template>
  <img
    class="eui-icon"
    :src="getImageUrl(name)"
    alt=""
  >
  <input onclick="">
</template>

<style lang="scss" scoped>
.eui-icon {
  width: 48rem;
  height: 48rem;
}

</style>
