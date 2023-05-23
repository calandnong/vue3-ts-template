import { generateUniqueId } from '@/adapters/functions';

export interface Image {
  /**
   * 图片唯一id
   */
  __uid: string;
  /**
   * 图片地址
   */
  url: string;
  /**
   * 图标上传状态
   */
  status: UploadStatus;
  /**
   * 自身文件对象
   */
  file: File;
  /**
   * 元数据
   */
  meta?: unknown;
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
        __uid: generateUniqueId(),
        url: fileReader.result as string,
        status: UploadStatus.UPLOADING,
        file,
      });
    };
    fileReader.readAsDataURL(file as Blob);
  });
}
