import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060';
import { needItem, idleItem } from '../types/idleInterface';

class IdleService {
  /**
   * publish unused thing
   * @param params ....
   */
  async publishIdle(params: idleItem): Promise<string> {
    console.log(params);
    const data = await httpRequest.post<string>(`${baseUrl}/publish/idle`, params);
    return data;
  }
  /**
   * need unused thing
   * @param params ....
   */
  async publishNeed(params: needItem): Promise<string> {
    const data = await httpRequest.post<string>(`${baseUrl}/publish/idle/need`, params);
    return data;
  }
}

export default new IdleService();

