import type { CommonResponse } from './base';
import { request } from '@/adapters/request';

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
export interface LoginData {
  username: string;
  password: string;
}

/**
 * 登陆接口
 * @param data
 * @returns
 */
export const login = (data: LoginData) => {
  console.log(data);

  const form = new FormData();
  form.append('name', '1111');

  return request<UserData>({
    url: '/api/login',
    data: form,
    config: {
      method: 'post',
    },
  });
};
