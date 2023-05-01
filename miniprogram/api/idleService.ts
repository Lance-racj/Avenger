import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { needItem, idleItem, needItemDetail, idleItemDetail } from '../types/idleInterface';

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

  async deleteIdleItem(params: { _id: string }): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/del`, params);
  }

  async deleteNeedItem(params: { _id: string }): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/need/del`, params);
  }


  async getIdleFollowList(params: {openid: string}): Promise<idleItemDetail[]> {
    return httpRequest.get<idleItemDetail[]>(`${baseUrl}/idle/follow/list`, params);
  }

  async getNeedFollowList(params: {openid: string}): Promise<needItemDetail[]> {
    return httpRequest.get<needItemDetail[]>(`${baseUrl}/idle/need/follow/list`, params);
  }

  async idleFollow(params: idleItem): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/follow/add`, params);
  }

  async needFollow(params: needItem) {
    return httpRequest.post<string>(`${baseUrl}/idle/need/follow/add`, params);
  }

  async idleUnFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/follow/del`, params);
  }

  async needUnFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/need/follow/del`, params);
  }

  async checkIdleItemFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.get<string>(`${baseUrl}/idle/follow/item`, params);
  }

  async checkNeedItemFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.get<string>(`${baseUrl}/idle/need/follow/item`, params);
  }




}

export default new IdleService();
