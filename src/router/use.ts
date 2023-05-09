import { ref } from 'vue';
import type { RouteLocationNormalized, LocationQueryRaw } from 'vue-router';
import { router } from './route';
import type { PageMeta } from './meta';
import type { RoutePath } from './path';

const routeMeta = ref<PageMeta>({});
const currentRoute = ref<RouteLocationNormalized | null>(null);

router.beforeEach((to, from, next) => {
  next();
  // 获取当前路由信息
  currentRoute.value = to;
  console.log(to);

  // 获取当前页的meta
  routeMeta.value = to.meta;
});

/**
 * 使用当前页的元数据 仅内部模块使用
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

/**
 * 路由重定向
 * @param target 目标路由地址
 * @param parms 传递给目标的参数对象
 */
export function pageRedirect(target: RoutePath, query?: LocationQueryRaw) {
  router.replace({ name: target, query });
}

/**
 * 路由跳转
 * @param target 目标路由地址
 * @param parms   传递给目标的参数对象
 */
export function pageNext(target: RoutePath, query?: LocationQueryRaw) {
  router.push({ name: target, query });
}

/**
 * 路由返回
 * @param step 后退的步数 默认后退一页
 * @param parms   传递给目标的参数对象
 */
export function pageBack(step = 1) {
  if (step <= 0) {
    throw new Error('页面返回参数必须大于0');
  } else {
    router.go(-step);
  }
}
