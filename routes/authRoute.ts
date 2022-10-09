import $api, { CustomResponse } from 'services/setAxios';

export default class AuthRoute {
  static async login(email: string, password: string): Promise<CustomResponse> {
    return await $api.post(`http://localhost:5000/api/auth/login`, {email, password})
  }

  static async registration(name: string,email: string, password: string): Promise<CustomResponse> {
    return await $api.post(`http://localhost:5000/api/auth/registration`, {name,email, password})
  }

  static logout() {
    $api.post(`http://localhost:5000/api/auth/logout`)
  }

  static async refresh(): Promise<CustomResponse>{
    return await $api.get('http://localhost:5000/api/auth/refresh', {
      withCredentials: true,
    });
  }


  static async restorePassRequest(email: string){
    await $api.post('http://localhost:5000/api/auth/restore_link', {email});
  }

  static async restorePassCheck(token: string): Promise<boolean>{
    return await $api.post('http://localhost:5000/api/auth/check_restore_link', {token});
  }

  static async restorePass(password: string, token: string): Promise<CustomResponse>{
    return await $api.post('http://localhost:5000/api/auth/restore_pass', {password, token});
  }

  //TODO: Дописать восстановление пароля
}