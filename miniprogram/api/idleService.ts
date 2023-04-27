import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { needItem, idleItem } from '../types/idleInterface';

class IdleService {
  /**
   * publish unused thing
   * @param params ....
   */
  async publishIdle(params: idleItem): Promise<string> {
    return await httpRequest.post<string>(`${baseUrl}/idle/publish`, params);
  }
  /**
   * need unused thing
   * @param params ....
   */
  async publishNeed(params: needItem): Promise<string> {
    return await httpRequest.post<string>(`${baseUrl}/idle/need/publish`, params);
  }
  /**
   * get idle list
   * @param params ....
   */
  async getIdleList(params?: {openid: string}): Promise<idleItem[]> {
    return await httpRequest.get<idleItem[]>(`${baseUrl}/idle/list`, params);
  }
  /**
   * get need list
   * @param params ....
   */
  async getNeedList(params?: {openid: string}): Promise<needItem[]> {
    return await httpRequest.get<needItem[]>(`${baseUrl}/idle/need/list`, params);
  }
}

export default new IdleService();

