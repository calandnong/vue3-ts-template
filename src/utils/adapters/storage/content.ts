// 保存了所有将被使用的localstorage字段
// Storage的key就是local存储的key值，value为对应的value类型
interface ValueType {
  // 用户token
  token: string;
  test: number;
}

// storage key枚举
enum Key {
  Token = 'token',
  Test = 'test',
}

// type Types = Pick<StorageValueType, keyof StorageValueType>;
export type {
  ValueType,
};
export {
  Key,
};
