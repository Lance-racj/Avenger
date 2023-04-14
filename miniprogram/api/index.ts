import { TimeData } from 'miniprogram/miniprogram_npm/@vant/weapp/count-down/utils';
import httpRequest from '../utils/http';

interface UserData {
  openid: string,
  username: string,
  password: string,
  date: TimeData
}

// export const publishLost = (publishLostConfig: any) => {
//   return httpRequest.post('http://localhost:3060/publish/lost', publishLostConfig).then((res) => {
//     return res;
//   })
// }

// 注册账号
export const registerAccount = (userData: UserData) => {
  return httpRequest.post('http://localhost:3060/register', userData).then((res) => {
    return res;
  })
}

// 登录账号
export const loginAccount = (userData: UserData) => {
  return httpRequest.post('http://localhost:3060/toLogin', userData).then((res) => {
    return res;
  })
}
