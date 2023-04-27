import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { helpItem } from '../types/helpInterface';

class HelpService {
  /**
   * publish help thing
   * @param params ....
   */
  async publishHelp(params: helpItem): Promise<string> {
    return await httpRequest.post<string>(`${baseUrl}/help/publish`, params);
  }
  /**
   * get help list
   * @param params ....
   */
  async getHelpList(params?: {openid: string}): Promise<helpItem[]> {
    return await httpRequest.get<helpItem[]>(`${baseUrl}/help/list`, params);
  }
}

export default new HelpService();

