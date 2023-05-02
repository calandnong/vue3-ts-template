import type { InjectionKey } from 'vue';

export interface PageEventBusMap {
  onPageScroll: (payload: UIEvent) => void;
}

export type Keys = keyof PageEventBusMap;

export type ValueOf<K, U> = K extends keyof U ? U[K] : never;

class PageEventBus {
  eventMap: Map<Keys, ValueOf<keyof PageEventBusMap, PageEventBusMap>> = new Map();

  on<Key extends keyof PageEventBusMap>(key: Key, callback: PageEventBusMap[Key]) {
    this.eventMap.set(key, callback);
  }

  emit<Key extends keyof PageEventBusMap>(key: Key, value: Parameters<PageEventBusMap[Key]>[0]) {
    this.eventMap.get(key)?.(value);
  }
}

export function usePageEventBus() {
  const pageEventBus = new PageEventBus();
  function emit(...args: Parameters<typeof pageEventBus.emit>) {
    pageEventBus.emit(...args);
  }
  function on(...args: Parameters<typeof pageEventBus.on>) {
    pageEventBus.on(...args);
  }
  return {
    pageEventBus,
    emit,
    on,
  };
}

export const PAGE_EVENT_BUS_KEY = Symbol('page') as InjectionKey<PageEventBus>;
