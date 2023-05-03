import { usePageEventBus } from '@/layout/use';

const { on, emit: pageEmit } = usePageEventBus();

export {
  pageEmit,
};

/**
 * 页面滚动
 * @param callback
 */
export function onPageScroll(callback: (payload: UIEvent) => void) {
  on('onPageScroll', callback);
}
