import { ref } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';
import { router } from './route';
import type { PageMeta } from './meta';

console.log('测试');

const routeMeta = ref<PageMeta>({});
const currentRoute = ref<RouteLocationNormalized | null>(null);

router.beforeEach((to, from, next) => {
  next();
  // 获取当前路由信息
  currentRoute.value = to;
  // 获取当前页的meta
  routeMeta.value = to.meta;
});

/**
 * 使用当前页的元数据
 * @returns
 */
export function useCurrentPageMeta() {
  return routeMeta;
}

/**
 * 使用当前页的路由信息
 * @returns
 */
export function useCurrentRoute() {
  return currentRoute;
}
