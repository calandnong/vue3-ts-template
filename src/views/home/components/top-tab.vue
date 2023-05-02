<script setup lang="ts">
import { ref } from 'vue';

export interface TabItem {
  /**
   * 切换按钮文字
   */
  text: string;
}

interface Props {
  defaultCurrent?: number;
  tabList?: TabItem[];
}

const props = withDefaults(defineProps<Props>(), {
  defaultCurrent: 0,
  tabList: () => {
    return [];
  },
});

const emits = defineEmits<{
  (e: 'change', current: number): void;
}>();

const current = ref<number>(0 ?? props.defaultCurrent);

const tabClick = (index: number) => {
  current.value = index;
  emits('change', index);
};

</script>

<template>
  <div class="top-tab">
    <template
      v-for="(item, index) in tabList"
      :key="index"
    >
      <div
        class="top-tab-item"
        :class="{
          'top-tab-item-activated': current === index
        }"
        @click.stop="tabClick(index)"
      >
        {{ item.text }}
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.top-tab {
  height: 96rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;

  &-item {
    width: 164rem;
    height: 96rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 34rem;
    line-height: 50rem;

    &-activated {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 600;
      font-size: 36rem;
      line-height: 52rem;
      /* identical to box height, or 144% */
      text-align: center;
      /* 功能色/品牌色/Brand8-Normal */
      color: #0095F2;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 8rem;
        background-color: #0095F2;
        transition: transform 0.3s ease-in-out;
        transform: scaleX(1);
      }
    }
  }

}
</style>
