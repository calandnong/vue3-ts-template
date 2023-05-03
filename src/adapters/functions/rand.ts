/**
 * 获取区间随机数
 * @param min
 * @param max
 * @returns
 */
export function getRandomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
