import $api, { CustomResponse} from 'services/setAxios';
import axios from 'axios';

export default class ImageRoute {
  static async get(data: {filter: Object, sort?: Object, limit?: number | null}, signal?: AbortSignal): Promise<CustomResponse>{
    //axios.interceptors.response.use(onGetResponse, onCancelError);
    return await axios.post(`http://localhost:5000/api/shots/images/get`, data, {signal});
  }

  static async getPalette(filter: Object,limit: number | null, signal?: AbortSignal): Promise<CustomResponse>{
    return await axios.post(`http://localhost:5000/api/shots/images/get_palette`, {filter, limit}, {signal});
  }

  static async add(shotID: string,file: File, signal?: AbortSignal): Promise<CustomResponse> {
    const formData = new FormData();
    formData.set('image', file);
    formData.set('shotID', shotID);
    return await $api.post(`http://localhost:5000/api/shots/images/add`, formData, {signal});
  }

  static async remove(imageID: string, signal?: AbortSignal): Promise<CustomResponse> {
    return await $api.post(`http://localhost:5000/api/shots/images/remove`, {imageID}, {signal});
  }
}