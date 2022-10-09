import $api, { CustomResponse } from 'services/setAxios';
import axios from 'axios';

export default class UserRoute {

  static async get(data: {filter?: Object, sort?: Object, limit?: number}, signal?: AbortSignal): Promise<CustomResponse> {
    //axios.interceptors.response.use(onGetResponse, onCancelError);
    return await axios.post('http://localhost:5000/api/user/get', data, {signal});
  }

  static async edit(update: {name?: string, biography?: string, skills?: string[], email?: string}, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post('http://localhost:5000/api/user/edit', { update },{signal});
  }

  static async editPass(password: string, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post('http://localhost:5000/api/user/edit/password', { password },{signal});
  }

  static async remove(): Promise<CustomResponse> {
    return await $api.get('http://localhost:5000/api/user/remove');
  }

  static async restore(): Promise<CustomResponse> {
    return await $api.get('http://localhost:5000/api/user/restore');
  }

  /* connectors */

  static async getSubscribers(filter: Object, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post('http://localhost:5000/api/user/subscribe/get', { filter },{signal});
  }

  static async subscribe(authorID: string, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post('http://localhost:5000/api/user/subscribe', { authorID },{signal});
  }
}