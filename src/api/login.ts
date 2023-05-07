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

// /**
//  * 接口请求地址
//  */
// url: string;
// /**
//  * 路由参数
//  */
// params?: RequestParams;
// /**
//  * 请求体, 以后有更动态需求可以考虑替换为unknown
//  */
// data?: unknown;

// /**
//  * 其他配置
//  */
// config?: Config;

// method?: string;
// /**
//  * 请求头
//  */
// header?: Record<string, string>;
// responseType?: XMLHttpRequestResponseType;
// timeout?: number;
// withCredentials?: boolean;
// xsrfCookieName?: string;
// xsrfHeaderName?: string;
// auth?: XHRBasicCredentials;

/**
 * 登陆接口
 * @param data
 * @returns
 */
export const login = (data: LoginData) => {
  return request<UserData>({
    url: '/api/login',
    data,
    config: {
      method: 'post',
    },
  });
};
