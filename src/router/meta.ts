import type { RouteRecordRaw } from 'vue-router';
import type { HeaderConfig } from '@/layout/components/common-header.vue';

/**
 * 判断是否
 */
export enum Is {
  /**
   * 否
   */
  FALSE = '1',
  /**
   * 是
   */
  TRUE = '2',
}

export interface NotTabBarPageMeta {
  /**
   * 是否显示tabbar的页面
   */
  isTabBar?: Is.FALSE;
}

export interface TabBarPageMeta {
  /**
   * 是否显示tabbar的页面
   */
  isTabBar: Is.TRUE;
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

export enum NavigateStyle {
  AUTO = 'auto',
  CUSTOM = 'custom',
}

/**
 * 页面公共元数据
 */
export interface PageCommonMeta extends HeaderConfig {
  /**
   * 是否自定义navigate
   */
  navigateStyle?: NavigateStyle;
}

/**
 * 页面元数据
 */
export type PageMeta = PageCommonMeta & (TabBarPageMeta | NotTabBarPageMeta);

/**
 * 页面路由
 */
export type PageRoute = Omit<RouteRecordRaw, 'meta'> & {
  meta?: PageMeta;
};

/**
 * 创建页面路由
 * @param pages
 * @returns
 */
export function createPageRoutes(pages: PageRoute[]) {
  return pages;
}
