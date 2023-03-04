import httpRequest from '../utils/http';

// 测试本地接口
export const testLocal = () => {
  return httpRequest.get('http://localhost:3060/hello', {}).then((res) => {
    return res;
  })
}

export const publishLost = (publishLostConfig: any) => {
  return httpRequest.post('http://localhost:3060/publish/lost', publishLostConfig).then((res) => {
    return res;
  })
}

export const registerAccount = (userData: any) => {
  return httpRequest.post('http://localhost:3060/register', userData).then((res) => {
    return res;
  })
}

export const loginAccount = (userData: any) => {
  return httpRequest.post('http://localhost:3060/toLogin', userData).then((res) => {
    return res;
  })
}
