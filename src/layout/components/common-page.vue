<script setup lang="ts">
import { RouterView } from 'vue-router';
import { provide, ref } from 'vue';
import CommonHeader from './common-header.vue';
import type { PageMeta } from '@/router';
import { navigateStyle, onRouterLeave, onRouterEnter } from '@/router';
import { usePageEventBus, PAGE_EVENT_BUS_KEY } from '@/layout/use';

export interface CommonPageProps {
  currentPageMeta: PageMeta;
}

withDefaults(defineProps<CommonPageProps>(), {
});

const commonPage = ref<HTMLDivElement | null>(null);

const { pageEventBus, emit } = usePageEventBus();
interface ScrollMessage {
  left: number;
  top: number;
}

const scrollMap = new Map<string, ScrollMessage>();

onRouterLeave((route) => {
  scrollMap.set(route.path, {
    left: commonPage.value?.scrollLeft || 0,
    top: commonPage.value?.scrollTop || 0,
  });
});

onRouterEnter((route) => {
  if (commonPage.value) {
    const scroll = scrollMap.get(route.path);
    setTimeout(() => {
      commonPage.value?.scrollTo({
        left: scroll?.left || 0,
        top: scroll?.top || 0,
      });
    }, 0);
  }
});

provide(PAGE_EVENT_BUS_KEY, pageEventBus);

function onPageScroll(payload: UIEvent) {
  emit('onPageScroll', payload);
}

</script>

<template>
  <div
    ref="commonPage"
    class="common-page"
    @scroll="onPageScroll"
  >
    <!-- 头部都是不同实例 -->
    <common-header
      class="common-header"
      :navigation-bar-title-text="currentPageMeta.navigationBarTitleText || navigateStyle.navigationBarTitleText"
      :navigation-bar-background-color="currentPageMeta.navigationBarBackgroundColor || navigateStyle.navigationBarBackgroundColor"
      :navigation-bar-text-style="currentPageMeta.navigationBarTextStyle || navigateStyle.navigationBarTextStyle"
    />
    <router-view v-if="!currentPageMeta.isTabBar" />
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
</template>

<style lang="scss" scoped>
.common-page {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #EBEDF1;
}
</style>
