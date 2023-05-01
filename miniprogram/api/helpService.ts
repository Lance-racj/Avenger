import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { helpItem, helpItemDetail } from '../types/helpInterface';

class HelpService {
  /**
   * publish help thing
   * @param params ....
   */
  async publishHelp(params: helpItem): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/help/publish`, params);
  }
  /**
   * get help list
   * @param params ....
   */
  async getHelpList(params?: {openid: string}): Promise<helpItem[]> {
    return httpRequest.get<helpItem[]>(`${baseUrl}/help/list`, params);
  }


  async getIdleFollowList(params: {openid: string}): Promise<helpItemDetail[]> {
    return httpRequest.get<helpItemDetail[]>(`${baseUrl}/idle/follow/list`, params);
  }

  async idleFollow(params: helpItem): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/follow/add`, params);
  }

  async idleUnFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/follow/del`, params);
  }

  async checkIdleItemFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.get<string>(`${baseUrl}/idle/follow/item`, params);
  }

}

export default new HelpService();

