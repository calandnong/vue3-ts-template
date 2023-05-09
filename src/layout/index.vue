<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import CommonPage from './components/common-page.vue';
import CommonHeader from './components/common-header.vue';
import type { TabBarItem } from './components/tab-bar.vue';
import TabBar from './components/tab-bar.vue';
import {
  Is,
  useCurrentPageMeta,
  useCurrentRoute,
  tabBarList,
  pagePaths,
  tabBarConfig,
} from '@/router/index';

const router = useRouter();

/**
 * 页面元数据
 */
const currentPageMeta = useCurrentPageMeta();

/**
 * 当前路由
 */
const currentRoute = useCurrentRoute();

/**
 * Tab点击事件
 */
function onPageChange(item: TabBarItem) {
  router.push({
    path: item.pagePath,
  });
}

const isHeaderShow = ref(true);

const commonPageStyle = computed(() => {
  let height = '100vh';
  if (isHeaderShow.value) {
    height += ' - 88rem';
  }

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
    <common-header
      class="common-header"
      :list="pagePaths"
      :current-page-path="currentRoute?.path"
      :navigation-bar-title-text="currentPageMeta.navigationBarTitleText"
      :navigation-bar-background-color="currentPageMeta.navigationBarBackgroundColor"
      :navigation-bar-text-style="currentPageMeta.navigationBarTextStyle"
      :navigation-bar-is-tab-bar="currentPageMeta.isTabBar"
    />
    <common-page
      class="common-page"
      :style="commonPageStyle"
    >
      <template #body>
        <router-view />
      </template>
    </common-page>
    <!-- 底部菜单 -->
    <tab-bar
      v-show="currentPageMeta.isTabBar === Is.TRUE"
      class="tab-bar"
      :tab-bar-config="tabBarConfig"
      :current-page-path="currentRoute?.path"
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

  .common-page {
    height: calc(100vh - 88rem - 112rem);
  }

  .tab-bar {
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}

</style>
