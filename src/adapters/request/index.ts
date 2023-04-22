import { HttpRequest } from '@applet-request/core';
import type { XHRConfig } from '@applet-request/adapters';
import { XHRAdapter } from '@applet-request/adapters';
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

const instance = new HttpRequest(new XHRAdapter<CommonResponse>());

instance.setDefaultConfig({
  baseURL: 'http://www.example.com',
  config: {
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
});

export class BussinessException extends BaseException<CommonResponse> {
  name = 'BussinessException';
}

// 设置判断是否业务报错
instance.use(async (context, next) => {
  console.log('请求前', context.request);
  await next();
  console.log('请求后', context.response);
  if (context.response.data.code !== 200) {
    throw new BussinessException('业务错误', context.response.data);
  }
});

instance.use(async (context, next) => {
  console.log('请求前', context.request);
  await next();
  console.log('请求后', context.response);
});

export const request = <Reponse>(options: XHRConfig) => {
  return instance.request<Reponse>(options);
};
