<script setup lang="ts">
import { computed } from 'vue';

export interface TabBarItem {
  /**
   * 当前页路由地址
   */
  pagePath: string;
  /**
   * 图标
   */
  iconPath: string;
  /**
   * 选中的图标
   */
  selectedIconPath: string;
  /**
   * tabBarItem文案
   */
  text: string;
}

export interface TabBar {
  /**
   * tabBarItem文字颜色
   */
  color?: string;
  /**
   * tabBarItem文字选中颜色
   */
  selectedColor?: string;
  /**
   * tabBar背景颜色
   */
  backgroundColor?: string;
  /**
   * tabBar高度
   */
  height?: string;
}

export interface TabBarProps {
  /**
   * 当前路由地址
   */
  currentPagePath?: string;
  /**
   * tabBar的配置
   */
  tabBarConfig?: TabBar;
  /**
   * tabBar配置
   */
  list: TabBarItem[];
}

const props = withDefaults(defineProps<TabBarProps>(), {
  currentPagePath: '',
  tabBarConfig: () => {
    return {
      color: '',
      selectedColor: '',
      backgroundColor: '',
      height: '',
    };
  },
});

const emits = defineEmits<{
  (e: 'onTabClick', item: TabBarItem): void;
}>();

const tabBarStyle = computed(() => {
  return {
    backgroundColor: props.tabBarConfig.backgroundColor,
    height: props.tabBarConfig.height,
  };
});

function isCurrent(item: TabBarItem, currentPagePath: string) {
  return item.pagePath === currentPagePath;
}

function getIconSrc(item: TabBarItem, currentPagePath: string) {
  return isCurrent(item, currentPagePath) ? item.selectedIconPath : item.iconPath;
}

function getTextStyle(item: TabBarItem, currentPagePath: string) {
  return {
    color: isCurrent(item, currentPagePath) ? props.tabBarConfig.selectedColor : props.tabBarConfig.color,
  };
}

function onTabClick(item: TabBarItem) {
  emits('onTabClick', item);
}

</script>

<template>
  <div
    class="tab-bar"
    :style="tabBarStyle"
  >
    <template
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="tab-bar-item">
        <div
          class="tab-bar-item-body"
          @click.stop="onTabClick(item)"
        >
          <img
            class="tab-bar-item-body-icon"
            :src="getIconSrc(item, currentPagePath)"
          >
          <div
            class="tab-bar-item-body-text"
            :style="getTextStyle(item, currentPagePath)"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 112rem;
  color: rgba(0, 0, 0, 0.6);
  background-color: #FFFFFF;
  box-sizing: border-box;
  padding-top: 18rem;

  &-item {
    flex: 1;
    display: flex;
    justify-content: center;

    &-body {
      cursor: pointer;
      display: flex;
      flex-direction: column;

      &-icon {
        width: 48rem;
        height: 48rem;
        background-color: aquamarine;
      }

      &-text {
        margin-top: 8rem;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 20rem;
        line-height: 36rem;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
