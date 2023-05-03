import { useCurrentRoute } from '@/router';

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

export const pageEventBusMap = new Map<string, PageEventBus>();

export const defaultKey = 'default--Key' as const;

function getCurrentPageEventBus(key: string = defaultKey) {
  let pageEventBus = pageEventBusMap.get(key);
  if (!pageEventBus) {
    pageEventBus = new PageEventBus();
    pageEventBusMap.set(key, pageEventBus);
  }
  return {
    pageEventBus,
  };
}

export function usePageEventBus() {
  const { currentRoute } = useCurrentRoute();
  function emit(...args: Parameters<(typeof PageEventBus)['prototype']['emit']>) {
    const { pageEventBus } = getCurrentPageEventBus(currentRoute.value?.path);
    pageEventBus.emit(...args);
  }
  function on(...args: Parameters<(typeof PageEventBus)['prototype']['on']>) {
    const { pageEventBus } = getCurrentPageEventBus(currentRoute.value?.path);
    pageEventBus.on(...args);
  }
  return {
    emit,
    on,
  };
}
