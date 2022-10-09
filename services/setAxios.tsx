import axios, { AxiosResponse, AxiosRequestConfig, AxiosError, Cancel } from 'axios';
import { IUser } from 'interfaces/models/user';

export interface IRefresh {
  access: string;
  user: IUser;
}

export interface CustomResponse {
  data?: any,
  message?: string,
  status?: string
}

const $api = axios.create({
  withCredentials: true,
});

const onRequest = (config: AxiosRequestConfig) => {
  config.headers = { auth: 'Bearer ' + localStorage.getItem('token') };
  return config;
};
const onRequestError = (config: AxiosRequestConfig) => {
  return config;
};

const onResponse = async (config: AxiosResponse) => {
  return config.data;
};

const onResponseError = async (error: AxiosResponse) => {
  //для того чтобы все произошло бесшовно и незаметно
  // @ts-ignore
  if(error.message==='canceled') return;
  const originalRequest = error;

  if (error.status === 401 && error.config && !error.data.isRetry) {
    originalRequest.data.isRetry = true;
    try {
      const { data }: { data: IRefresh } = await $api.get(
        'http://localhost:5000/api/user/refresh',
        { withCredentials: true }
      );
      localStorage.setItem('token', data.access);
      return $api.request(originalRequest.config);
    } catch (e) {
      console.log('User is not auth!!!');
    }
  }
};

$api.interceptors.request.use(onRequest, onRequestError);
$api.interceptors.response.use(onResponse, onResponseError);

export default $api;
