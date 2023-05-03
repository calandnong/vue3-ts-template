/**
 * 生成唯一id
 * @returns
 */
export function generateUniqueId(): string {
  const timestamp = Date.now().toString(16);
  const randomNumber = Math.floor(Math.random() * 1000000000).toString(16);
  const uuidString = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  const uuid = uuidString.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return `${timestamp}-${randomNumber}-${uuid}`;
}
