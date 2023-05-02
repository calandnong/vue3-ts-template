<script setup lang="ts">
import type { DynamicInfo } from './dynamic-card.vue';
import DynamicCard from './dynamic-card.vue';

export type List = DynamicInfo[];

interface Props {
  list?: List;
}

withDefaults(defineProps<Props>(), {
  list: () => {
    return [];
  },
});

</script>

<template>
  <div class="dynamic-list">
    <template
      v-for="(item, index) in list"
      :key="index"
    >
      <dynamic-card
        class="dynamic-list-item"
        :dynamic-info="item"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>

.dynamic-list {
  margin-top: -24rem;

  &-item {
    margin-top: 24rem;
  }

}

</style>
