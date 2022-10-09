import $api, { CustomResponse } from 'services/setAxios';
import axios from 'axios';

export default class AvatarRoute {
  static async get(
    data: {
      filter?: Object;
      limit?: number;
    },
    signal: AbortSignal
  ): Promise<CustomResponse> {
    //axios.interceptors.response.use(onGetResponse, onCancelError);
    return await $api.post('http://localhost:5000/api/user/avatar/get', data, {
      signal,
    });
  }

  static async create(
    avatar: File | null | undefined
  ): Promise<CustomResponse> {
    const formData = new FormData();
    formData.set('avatar', avatar ? avatar : '');
    return await $api.post(
      'http://localhost:5000/api/user/avatar/create',
      formData
    );
  }

  static async edit(avatar: File | null | undefined): Promise<CustomResponse> {
    const formData = new FormData();
    formData.set('avatar', avatar ? avatar : '');
    return await $api.post(
      'http://localhost:5000/api/user/avatar/edit',
      formData
    );
  }

  static async remove(): Promise<CustomResponse> {
    return await $api.post('http://localhost:5000/api/user/avatar/remove');
  }
}
