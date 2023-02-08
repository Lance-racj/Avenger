import httpRequest from '../utils/http';

// 测试本地接口
export const testLocal = () => {
  return httpRequest.get('http://localhost:3060/hello', {}).then((res) => {
    return res;
  })
}
