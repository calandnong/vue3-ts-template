<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';
import CommonPage from './components/common-page.vue';
import type { TabBarItem } from './components/tab-bar.vue';
import TabBar from './components/tab-bar.vue';
import type { PageMeta } from '@/router';
import {
  Is,
  tabBarList,
  tabBarConfig,
} from '@/router';

const router = useRouter();

const route = useRoute();

/**
 * Tab点击事件
 */
function onPageChange(item: TabBarItem) {
  router.push({
    path: item.pagePath,
  });
}

const currentPageMeta = computed(() => {
  return route.meta as PageMeta;
});

const commonPageStyle = computed(() => {
  let height = '100vh';

  if (currentPageMeta.value.isTabBar === Is.TRUE) {
    height += ' - 112rem';
  }

  return {
    height: `calc(${height})`,
  };
});

</script>

<template>
  <div class="layout">
    <common-page
      class="common-page"
      :style="commonPageStyle"
      :current-page-meta="currentPageMeta"
    />
    <!-- 底部菜单 -->
    <tab-bar
      v-show="currentPageMeta.isTabBar === Is.TRUE"
      class="tab-bar"
      :tab-bar-config="tabBarConfig"
      :current-page-path="route?.path"
      :list="tabBarList"
      @on-tab-click="onPageChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 750rem;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .tab-bar {
    position: fixed;
    bottom: 0;
    z-index: 99;
  }

}

</style>
