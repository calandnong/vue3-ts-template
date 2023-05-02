<script setup lang="ts">
import { ref } from 'vue';
import type { TabItem } from './components/top-tab.vue';
import TopTab from './components/top-tab.vue';
import type { List } from './components/dynamic-list.vue';
import DynamicList from './components/dynamic-list.vue';
import assetsImg from '@/assets/temp/avatar.png';

const tabList = ref<TabItem[]>([
  {
    text: '推荐',
  },
  {
    text: '关注',
  },
]);

function tabSwitch(current: number) {
  console.log('current', current);
}

const dynamicListData = ref<List>([
  {
    userInfo: {
      avatar: assetsImg,
    },
  },
  {
    userInfo: {
      avatar: assetsImg,
    },
  },
]);

</script>

<template>
  <div class="home">
    <top-tab
      :tab-list="tabList"
      @change="tabSwitch"
    />
    <dynamic-list
      class="dynamic-list"
      :list="dynamicListData"
    />
  </div>
</template>

<style lang="scss" scoped>
.home {

  .dynamic-list {
    padding: 24rem 30rem 38rem 30rem;
  }

}

</style>
