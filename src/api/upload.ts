import { request } from '@/adapters/request';

export type Params = Record<string, unknown>;

export interface UploadFileData {
  params?: Params;
  data: File;
}

export interface UploadOptions {
  name: string;
  data: File;
  params?: Params;
}

export interface ImageFile {
  id: string;
  url: string;
}

export interface UploadResponse {
  code: number;
  data: ImageFile;
  message: string;
}

// 模拟上传接口
function upload(options: UploadOptions): Promise<UploadResponse> {
  const file = new FormData();
  file.append(options.name, options.data);
  console.log('上传了，拿到的数据是', file);
  // return new Promise((resolve) => {
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setTimeout(() => {
  //       resolve({
  //         code: 200,
  //         data: {
  //           id: generateUniqueId(),
  //           url: fileReader.result as string,
  //         },
  //         message: '上传成功',
  //       });
  //     }, 2000);
  //   };
  //   fileReader.readAsDataURL(options.data);
  // });
  return request({
    url: '/api/login',
    data: file,
    config: {
      method: 'post',
      headers: {
        'Content-type': 'multipart/form-data',
      },
    },
  });
}

export function publishUploadFile(options: UploadFileData) {
  console.log(options);
  return upload({
    name: 'file',
    ...options,
  });
}
