import httpRequest from '../utils/http';

interface UserData {
  openid: string,
  username: string,
  password: string,
  date: Number
}

interface pic {
  url: string,
  name: string
}

interface publishLostType {
  openid: string,
  type: number
  classify_1: string,
  classify_2: string,
  name: string,
  date: string,
  region: string,
  phone: string,
  desc: string,
  imgList: Array<pic>,
  time: number
}

export const publishLost = (publishLostConfig: publishLostType) => {
  return httpRequest.post('http://localhost:3060/publish/lost', publishLostConfig).then((res) => {
    return res;
  })
}

// 注册账号
export const registerAccount = (userData: UserData) => {
  return httpRequest.post('http://localhost:3060/register', userData).then((res) => {
    return res;
  })
}

// 登录账号
export const loginAccount = (userData: {
  username: string,
  password: string
}) => {
  return httpRequest.post('http://localhost:3060/toLogin', userData).then((res) => {
    return res;
  })
}
