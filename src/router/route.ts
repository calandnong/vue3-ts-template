import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { RoutePath } from './path';
import { pages } from './views';

// 路由结构
const routes: RouteRecordRaw[] = [
  // layout
  {
    path: `/${RoutePath.ROOT}`,
    component: () => import('@/layout/index.vue'),
    redirect: RoutePath.HOME,
    children: pages as RouteRecordRaw[],
  },
  // 404
  {
    path: '/:catchAll(.*)',
    name: `/${RoutePath.NOT_FOUND}`,
    component: () => import('@/views/not-found/index.vue'),
  },
];

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
