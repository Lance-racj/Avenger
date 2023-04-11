import { TimeData } from 'miniprogram/miniprogram_npm/@vant/weapp/count-down/utils';
import httpRequest from '../utils/http';

interface UserData {
  openid: string,
  username: string,
  password: string,
  date: TimeData
}

// 测试本地接口
export const testLocal = () => {
  return httpRequest.get('http://localhost:3060/hello', {}).then((res) => {
    return res;
  })
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

// export const getLost = (type: object) => {
//   return httpRequest.get('http://localhost:3060', type).then((res) => {
//     return res;
//   })
// }
