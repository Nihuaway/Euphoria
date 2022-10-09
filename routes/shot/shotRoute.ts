import $api, { CustomResponse } from 'services/setAxios';
import { IShot } from 'interfaces/models/shot';
import axios, { AxiosResponse } from 'axios';

export default class ShotController {
  static async get(
    data: {
      filter?: Object;
      sort?: Object;
      limit?: number;
      followings?: string | null;
    },
    signal?: AbortSignal
  ): Promise<CustomResponse> {

    return await axios.post(`http://localhost:5000/api/shots/get`, data, {
      signal,
    });
  }

  static async temp(signal?: AbortSignal) {
    return await $api.get('http://localhost:5000/api/shots/temp', { signal });
  }

  static async upload(
    upload: IShot,
    signal?: AbortSignal
  ): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/shots/upload',
      {
        shotID: upload._id,
        upload,
      },
      { signal }
    );
  }

  static async edit(
    shotID: string,
    update: {
      title?: string | null;
      content?: string | null;
      isDraft?: boolean;
      tags?: string[];
    },
    signal?: AbortSignal
  ): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/shots/edit',
      { shotID, update },
      {
        signal,
      }
    );
  }

  static async remove(
    shotID: string,
    signal?: AbortSignal
  ): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/shots/remove',
      {
        shotID,
      },
      { signal }
    );
  }

  /* connectors */

  static async getLikes(
    filter: Object,
    signal?: AbortSignal
  ): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/shots/like/get',
      {
        filter,
      },
      { signal }
    );
  }

  static async like(
    shotID: string,
    signal?: AbortSignal
  ): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/shots/like',
      { shotID },
      { signal }
    );
  }

  static async getViews(
    filter: Object,
    signal?: AbortSignal
  ): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/shots/view/get',
      {
        filter,
      },
      { signal }
    );
  }

  static async view(
    shotID: string,
    signal?: AbortSignal
  ): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/shots/view',
      { shotID },
      { signal }
    );
  }
}
