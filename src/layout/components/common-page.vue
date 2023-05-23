<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import CommonHeader from './common-header.vue';
import type { PageMeta } from '@/router';
import { NavigateStyle, navigateStyle, onRouterLeave, onRouterEnter } from '@/router';
import { pageEmit } from '@/adapters/page-events';

export interface CommonPageProps {
  currentPageMeta: PageMeta;
}

const props = withDefaults(defineProps<CommonPageProps>(), {
});

const commonPage = ref<HTMLDivElement | null>(null);

interface ScrollMessage {
  left: number;
  top: number;
}

const scrollMap = new Map<string, ScrollMessage>();

const currentScroll = ref<ScrollMessage>({
  left: 0,
  top: 0,
});

let scrollTimer: NodeJS.Timeout | undefined;

onRouterLeave((route) => {
  scrollMap.set(route.path, {
    left: commonPage.value?.scrollLeft || 0,
    top: commonPage.value?.scrollTop || 0,
  });
});

onRouterEnter((route) => {
  clearTimeout(scrollTimer);
  if (commonPage.value) {
    const scroll = scrollMap.get(route.path);
    currentScroll.value = {
      left: scroll?.left || 0,
      top: scroll?.top || 0,
    };
    // 渲染完成后再进行滚动到原本的位置
    scrollTimer = setTimeout(() => {
      commonPage.value?.scrollTo({
        ...currentScroll.value,
      });
    }, 0);
  }
});
function onPageScroll(payload: UIEvent) {
  const target = payload.target as HTMLDivElement;
  // 非用户滚动事件
  if (target.scrollTop === currentScroll.value.top) {
    return;
  }
  pageEmit('onPageScroll', payload);
}

const isHeaderShow = computed(() => {
  if (props.currentPageMeta.navigateStyle === NavigateStyle.CUSTOM) {
    return false;
  }
  return true;
});
const route = useRoute();

</script>

<template>
  <div
    ref="commonPage"
    class="common-page"
    @scroll="onPageScroll"
  >
    <!-- 头部都是不同实例 -->
    <common-header
      v-show="isHeaderShow"
      :key="route.path"
      class="common-header"
      :navigation-bar-title-text="currentPageMeta.navigationBarTitleText || navigateStyle.navigationBarTitleText"
      :navigation-bar-background-color="currentPageMeta.navigationBarBackgroundColor || navigateStyle.navigationBarBackgroundColor"
      :navigation-bar-text-style="currentPageMeta.navigationBarTextStyle || navigateStyle.navigationBarTextStyle"
    />
    <router-view v-if="!currentPageMeta.isTabBar" />
    <div class="common-page-body">
      <router-view
        v-if="currentPageMeta.isTabBar"
        v-slot="{ Component }"
      >
        <keep-alive>
          <component
            :is="Component"
          />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-page {
  --page-height: '100vh';
  width: 100%;
  height: calc(var(--page-height));
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #EBEDF1;

  &-body {
    height: calc(var(--page-height) - 88rem);
  }
}
</style>
