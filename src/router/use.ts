import type { RouteLocationNormalized } from 'vue-router';
import { ref } from 'vue';
import { router } from './route';

export type RouterSwitchEvent = (route: RouteLocationNormalized) => void;
export type RouterSwitchEventKeys = 'onLeave' | 'onEnter';

const currentRoute = ref<RouteLocationNormalized | null>(null);

class RouterSwitchEventBus {
  eventMap: Map<RouterSwitchEventKeys, RouterSwitchEvent> = new Map();

  on(key: RouterSwitchEventKeys, callback: RouterSwitchEvent) {
    this.eventMap.set(key, callback);
  }

  emit(key: RouterSwitchEventKeys, to: RouteLocationNormalized) {
    this.eventMap.get(key)?.(to);
  }
}

const routerSwitchEventInstance = new RouterSwitchEventBus();

router.beforeEach((to, from, next) => {
  currentRoute.value = to;
  routerSwitchEventInstance.emit('onLeave', from);
  next();
  routerSwitchEventInstance.emit('onEnter', to);
});

export function useCurrentRoute() {
  return {
    currentRoute,
  };
}

export function onRouterEnter(callback: RouterSwitchEvent) {
  routerSwitchEventInstance.on('onEnter', callback);
}
export function onRouterLeave(callback: RouterSwitchEvent) {
  routerSwitchEventInstance.on('onLeave', callback);
}
