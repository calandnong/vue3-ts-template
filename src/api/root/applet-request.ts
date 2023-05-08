import { HttpRequest } from '@applet-request/core';
import type { AxiosConfig } from '@applet-request/adapters';
import { AxiosAdapter } from '@applet-request/adapters';
import { BaseException } from '@applet-request/shared';

export interface CommonResponse {
  /**
   * 自定义状态码，0为成功，其他为失败
   */
  code: number;
  /**
   * 自定义错误信息
   */
  msg: string;
}
// UniRequestAdapter
const instance = new HttpRequest(new AxiosAdapter<CommonResponse>());

instance.setDefaultConfig({
  baseURL: 'http://localhost',
  config: {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      // todo用户token
    },
  },
});

export class BusinessException extends BaseException<CommonResponse> {
  name = 'BusinessException';
}

// 设置判断是否业务报错
instance.use(async (context, next) => {
  console.log('请求前', context.request);
  await next();
  console.log('请求后', context.response);
  if (context.response.data.code !== 200) {
    throw new BusinessException('业务错误', context.response.data);
  }
});

instance.use(async (context, next) => {
  console.log('请求前', context.request);
  await next();
  console.log('请求后', context.response);
});
// UniRequestConfig
export const request = <Response>(options: AxiosConfig) => {
  return instance.request<Response>(options);
};
