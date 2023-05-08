/**
 * 写入localStorage的value。value必须是types中的其中一个类型
 * @param key 目标的key
 * @param value
 */
function setItem<T>(key: string, value: T) {
  const str = JSON.stringify(value);
  localStorage.setItem(key, str);
}

/**
 * 获取localStorage的value，查不到则返回undefined
 * @param key 目标的key
 * @returns
 */
function getItem<T>(key: string): T | undefined {
  const str = localStorage.getItem(key);
  if (typeof str !== 'object') {
    return JSON.parse(str);
  }
  return undefined;
}

/**
 * 删除本地存储
 * @param key 目标的key
 */
function removeItem(key: string) {
  localStorage.removeItem(key);
}

export {
  setItem,
  getItem,
  removeItem,
};
export * from './content';
