import type { RouteLocationNormalized } from 'vue-router';
import { router } from './route';

export type RouterSwitchEvent = (route: RouteLocationNormalized) => void;
export type RouterSwitchEventKeys = 'onLeave' | 'onEnter';

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
  routerSwitchEventInstance.emit('onLeave', from);
  next();
  routerSwitchEventInstance.emit('onEnter', to);
});

export function onRouterEnter(callback: RouterSwitchEvent) {
  routerSwitchEventInstance.on('onEnter', callback);
}
export function onRouterLeave(callback: RouterSwitchEvent) {
  routerSwitchEventInstance.on('onLeave', callback);
}
