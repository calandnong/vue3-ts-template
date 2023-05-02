import { Is, createPageRoutes } from './meta';
import { RoutePath } from './path';
import type { HeaderConfig } from '@/layout/components/common-header.vue';
import type { TabBarItem, TabBar } from '@/layout/components/tab-bar.vue';
import HomeIcon from '@/assets/temp/tab-bar/home.png';
import HomeIconSelected from '@/assets/temp/tab-bar/home-selected.png';
import PublishIcon from '@/assets/temp/tab-bar/publish.png';
import PublishIconSelected from '@/assets/temp/tab-bar/publish-selected.png';
import MessageIcon from '@/assets/temp/tab-bar/message.png';
import MessageIconSelected from '@/assets/temp/tab-bar/message-selected.png';
import MeIcon from '@/assets/temp/tab-bar/me.png';
import MeIconSelected from '@/assets/temp/tab-bar/me-selected.png';

// layout页面
export const pages = createPageRoutes([
  // 首页
  {
    path: `/${RoutePath.HOME}`,
    name: RoutePath.HOME,
    meta: {
      navigationBarTitleText: '壹圈',
      isTabBar: Is.TRUE,
      iconPath: HomeIcon,
      selectedIconPath: HomeIconSelected,
      text: '首页',
    },
    component: () => import('@/views/home/index.vue'),
  },
  // 发布
  {
    path: `/${RoutePath.PUBLISH}`,
    name: RoutePath.PUBLISH,
    meta: {
      navigationBarTitleText: '发布',
      isTabBar: Is.TRUE,
      iconPath: PublishIcon,
      selectedIconPath: PublishIconSelected,
      text: '发布',
    },
    component: () => import('@/views/publish/index.vue'),
  },
  // 消息
  {
    path: `/${RoutePath.MESSAGE}`,
    name: RoutePath.MESSAGE,
    meta: {
      navigationBarTitleText: '消息',
      isTabBar: Is.TRUE,
      iconPath: MessageIcon,
      selectedIconPath: MessageIconSelected,
      text: '消息',
    },
    component: () => import('@/views/message/index.vue'),
  },
  // 我的
  {
    path: `/${RoutePath.ME}`,
    name: RoutePath.ME,
    meta: {
      navigationBarTitleText: '我的',
      isTabBar: Is.TRUE,
      iconPath: MeIcon,
      selectedIconPath: MeIconSelected,
      text: '我的',
    },
    component: () => import('@/views/me/index.vue'),
  },
  // 动态列表页
  {
    path: `/${RoutePath.DYNAMIC_LIST}`,
    name: RoutePath.DYNAMIC_LIST,
    meta: {
      navigationBarTitleText: '动态列表页',
    },
    component: () => import('@/views/dynamic-list/index.vue'),
  },
]);

/**
 * 使用tabBar的页面列表
 */
export function getTabBarList(): TabBarItem[] {
  const list: TabBarItem[] = [];
  pages.forEach((item) => {
    if (item.meta?.isTabBar === Is.TRUE) {
      const meta = item.meta;
      list.push({
        pagePath: item.path,
        ...meta,
      });
    }
  });
  return list;
}

export const tabBarList = getTabBarList();

export const tabBarConfig: TabBar = {
  color: 'rgb(0, 0, 0)',
  selectedColor: 'rgb(47, 133, 252)',
} as const;

export const navigateStyle: HeaderConfig = {
  navigationBarTitleText: '壹圈',
  navigationBarBackgroundColor: '#FFFFFF',
  navigationBarTextStyle: 'rgba(0, 0, 0, 0.8)',
} as const;
