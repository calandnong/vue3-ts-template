import { generateUniqueId } from '@/adapters/functions';

export interface Image {
  /**
   * 图片唯一id
   */
  uid: string;
  /**
   * 图片地址
   */
  url: string;
  /**
   * 图标上传状态
   */
  status: UploadStatus;
  /**
   * 图片上传返回的内容
   */
  response?: unknown;
}

export enum UploadStatus {
  /**
   * 正在上传
   */
  UPLOADING = 'uploading',
  /**
   * 上传成功
   */
  SUCCESS = 'success',
  /**
   * 上传成功
   */
  FAIL = 'fail',
}

export function readFileContent(file: File): Promise<Image> {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve({
        uid: generateUniqueId(),
        url: fileReader.result as string,
        status: UploadStatus.UPLOADING,
      });
    };
    fileReader.readAsDataURL(file as Blob);
  });
}
