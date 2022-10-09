import $api, { CustomResponse } from 'services/setAxios';
import axios from 'axios';

export default class CollectionRoute {
  static async get(filter: Object, signal?: AbortSignal) {
    //axios.interceptors.response.use(onGetResponse, onCancelError);
    return await axios.post(
      'http://localhost:5000/api/collections/get',
      { filter }, {signal}
    );
  }

  static async upload(upload: Object, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/collections/upload',
      { upload }, {signal}
    );
  }

  static async edit(collectionID: string, update: {title: string, description: string}, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/collections/edit',
      { collectionID, update }, {signal}
    );
  }

  static async remove(collectionID: string, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/collections/remove',
      { collectionID }, {signal}
    );
  }

  /* connectors */

  static async getSaves(filter: Object, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/collections/save/get',
      { filter }, {signal}
    );
  }

  static async save(collectionID: string, shotID: string, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post(
      'http://localhost:5000/api/collections/save',
      { collectionID, shotID }, {signal}
    );
  }
}
