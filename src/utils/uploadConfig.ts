import { getPreSignUrl } from '@/services/Known/Assets';
import { UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';

export const localConfig: UploadProps = {
  action: async (file) => {
    return '/api/assets/upload?uid=' + file.uid;
  },

  beforeUpload: (file, FileList) => {
    file.uid = crypto.randomUUID();
  },
  withCredentials: true,
  multiple: true,
};

export const minioConfig: UploadProps = {
  action: async (file) => {
    return (await getPreSignUrl({ name: file.uid + '.' + file.name })).data;
  },

  beforeUpload: (file, FileList) => {
    file.uid = crypto.randomUUID();
  },

  customRequest: async (options) => {
    const { action, file, onError, onProgress, onSuccess } = options;
    return axios
      .put(action, file, {
        headers: { 'Content-Type': (file as RcFile).type },
        onUploadProgress: (ev) => {
          const percent = (ev.loaded / ev.total) * 100;
          onProgress && onProgress({ percent });
        },
      })
      .then(
        () => {
          onSuccess && onSuccess({ result_status: true });
        },
        (res) => {
          onError && onError(res);
        },
      );
  },
};
