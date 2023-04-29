import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { UserData } from '../types/userInterface';

class AppService {
  /**
   * 登陆账户
   * @param params UserData
   */
  async loginAccount(userData: UserData) {
    return httpRequest.post<string>(`${baseUrl}/toLogin`, userData).then((res) => {
      return res;
    })
  }
  /**
   * 注册账户
   * @param params UserData
   */
  async registerAccount(userData: UserData) {
    return httpRequest.post<string>(`${baseUrl}/register`, userData).then((res) => {
      return res;
    })
  }
}

export default new AppService();
