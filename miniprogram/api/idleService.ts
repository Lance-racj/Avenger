import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { needItem, idleItem } from '../types/idleInterface';

// 轻量级后端，返回data即所需，无需处理
class IdleService {
  /**
   * publish unused thing
   * @param params idleItem
   */
  async publishIdle(params: idleItem): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/publish`, params);
  }
  /**
   * need unused thing
   * @param params needItem
   */
  async publishNeed(params: needItem): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/need/publish`, params);
  }
  /**
   * get idle list
   * @param params { openid: string }
   */
  async getIdleList(params?: { openid: string }): Promise<idleItem[]> {
    return httpRequest.get<idleItem[]>(`${baseUrl}/idle/list`, params);
  }
  /**
   * get need list
   * @param params { openid: string }
   */
  async getNeedList(params?: { openid: string }): Promise<needItem[]> {
    return httpRequest.get<needItem[]>(`${baseUrl}/idle/need/list`, params);
  }
}

export default new IdleService();

