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
  /**
   * get 获取求助收藏列表
   * @param params ....
   */
  async getIdleFollowList(params: {openid: string}): Promise<helpItemDetail[]> {
    return httpRequest.get<helpItemDetail[]>(`${baseUrl}/idle/follow/list`, params);
  }
  /**
   * post 收藏求助贴
   * @param params ....
   */
  async idleFollow(params: helpItem): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/follow/add`, params);
  }
  /**
   * post 取消求助收藏
   * @param params ....
   */
  async idleUnFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/follow/del`, params);
  }
  /**
   * check 检查单个求助收藏状态
   * @param params ....
   */
  async checkIdleItemFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.get<string>(`${baseUrl}/idle/follow/item`, params);
  }

}

export default new HelpService();

