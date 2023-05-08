import type { AxiosConfig } from '@applet-request/adapters';
import { request } from './applet-request';

// 请求方法
enum Method {
  POST = 'post',
  GET = 'get',
  DELETE = 'delete',
  PUT = 'put',
}

// 简单http数据类型
type params = Record<string, number | string | boolean>;

/**
 * request方法 不包含file上传操作
 * @param url 地址
 * @param method http方法
 * @param value 传递的数据
 * @returns
 */
function baseRequest<ResponseData>(url: string, method: Method, value: unknown | params) {
  const requestObject: AxiosConfig = {
    url,
    data: null,
    params: undefined,
    config: {
      method,
    },
  };

  // 根据请求方法传递参数
  if (method === Method.GET || method === Method.DELETE) {
    requestObject.params = value as params;
  } else {
    requestObject.data = value;
  }
  return request<ResponseData>(requestObject);
}
/**
 * @param url 地址
 * @param params url传参 对象
 * @returns
 */
function get<ResponseData>(url: string, params: params) {
  return baseRequest<ResponseData>(url, Method.GET, params);
}

/**
 * @param url 地址
 * @param params url传参 对象
 * @returns
 */
function dele<ResponseData>(url: string, params: params) {
  return baseRequest<ResponseData>(url, Method.DELETE, params);
}

/**
 * @param url 地址
 * @param data 传输到请求体的对象 或者FormData
 * @returns
 */
function post<ResponseData>(url: string, data: unknown) {
  return baseRequest<ResponseData>(url, Method.POST, data);
}

/**
 * @param url 地址
 * @param data 传输到请求体的对象 或者FormData
 * @returns
 */
function put<ResponseData>(url: string, data: unknown) {
  return baseRequest<ResponseData>(url, Method.PUT, data);
}

/**
 * 文件上传上层函数(只支持单文件)
 * @param url 地址
 * @param method 请求方法 Method.PUT | Method.POST
 * @param file 文件内容
 * @param params 其他附带的参数
 * @returns
 */
function uploadFile<ResponseData>(url: string, method: Method.PUT | Method.POST, file: any, params: params, filename = 'file') {
  // 数据转换处理
  const formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key].toString());
  }
  // 加入文件
  formData.append(filename, file);

  const requestObject: AxiosConfig = {
    url,
    data: formData,
    config: {
      method,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  };

  return request<ResponseData>(requestObject);
}
/**
 * @param url 地址
 * @param data 传输到请求体的对象 或者FormData
 * @returns
 */
function putFile(url: string, file: any, params: params, filename = 'file') {
  return uploadFile(url, Method.PUT, file, params, filename);
}

/**
 * @param url 地址
 * @param data 传输到请求体的对象 或者FormData
 * @returns
 */
function postFile(url: string, file: any, params: params, filename = 'file') {
  return uploadFile(url, Method.POST, file, params, filename);
}

// 导出错误码
export * from './enum-code';
// 返回数据的父类类型
export type { CommonResponse } from './applet-request';
export { Method, put, post, dele, get, putFile, postFile };
export type { params };
