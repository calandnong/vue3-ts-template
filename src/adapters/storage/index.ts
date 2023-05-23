export function setItem(key: string, value: unknown): void {
  let item: string;
  try {
    item = JSON.stringify(value);
  }
  catch (error) {
    throw new Error('设置值失败！');
  }
  localStorage.setItem(key, item);
}

export function getItem<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      const value = JSON.parse(item);
      return value;
    }
    catch (error) {
      throw new Error('解析值出现异常');
    }
  }
  return defaultValue;
}
