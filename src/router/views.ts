import { Is, createPageRoutes } from './meta';
import { RoutePath } from './path';
import type { TabBarItem, TabBar } from '@/layout/components/tab-bar.vue';

// layout页面
export const pages = createPageRoutes([
  // 首页
  {
    path: `/${RoutePath.HOME}`,
    name: RoutePath.HOME,
    meta: {
      navigationBarTitleText: '首页',
      isTabBar: Is.TRUE,
      iconPath: '',
      selectedIconPath: '',
      text: '首页',
    },
    component: () => import('@/views/home/index.vue'),
  },
  // 广场
  {
    path: `/${RoutePath.SQUARE}`,
    name: RoutePath.SQUARE,
    meta: {
      navigationBarTitleText: '广场',
      isTabBar: Is.TRUE,
      iconPath: '',
      selectedIconPath: '',
      text: '广场',
    },
    component: () => import('@/views/square/index.vue'),
  },
  // 我的
  {
    path: `/${RoutePath.ME}`,
    name: RoutePath.ME,
    meta: {
      navigationBarTitleText: '我的',
      isTabBar: Is.TRUE,
      iconPath: '',
      selectedIconPath: '',
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
