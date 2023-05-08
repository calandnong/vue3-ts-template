import type { CommonResponse, params } from '../root/index';
import { get } from '../root/index';

/**
 * 登陆返回的信息
 */
export interface UserData extends CommonResponse {
  name: string;
  age: number;
}

/**
 * 登陆需要的信息
 */
export interface LoginData extends params {
  username: string;
  password: string;
}

/**
 * 登陆接口
 * @param data
 * @returns
 */
export const login = (data: LoginData) => {
  return get<UserData>('/api/login', data);
};
