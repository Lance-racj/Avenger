import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { needItem, idleItem, needItemDetail, idleItemDetail, commentType } from '../types/idleInterface';

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
  /**
   * delete 删除闲置发布
   * @param params ...
   */
  async deleteIdleItem(params: { _id: string }): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/del`, params);
  }
  /**
   * delete 删除求购发布
   * @param params ...
   */
  async deleteNeedItem(params: { _id: string }): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/need/del`, params);
  }
  /**
   * get 获取闲置收藏列表
   * @param params ...
   */
  async getIdleFollowList(params: {openid: string}): Promise<idleItemDetail[]> {
    return httpRequest.get<idleItemDetail[]>(`${baseUrl}/idle/follow/list`, params);
  }
  /**
   * get 获取求购收藏列表
   * @param params ...
   */
  async getNeedFollowList(params: {openid: string}): Promise<needItemDetail[]> {
    return httpRequest.get<needItemDetail[]>(`${baseUrl}/idle/need/follow/list`, params);
  }
  /**
   * post 收藏闲置发布帖
   * @param params ...
   */
  async idleFollow(params: idleItem): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/follow/add`, params);
  }
  /**
   * post 收藏求购闲置帖
   * @param params ...
   */
  async needFollow(params: needItem) {
    return httpRequest.post<string>(`${baseUrl}/idle/need/follow/add`, params);
  }
  /**
   * post 取消收藏闲置发布帖
   * @param params ...
   */
  async idleUnFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/follow/del`, params);
  }
  /**
   * post 取消收藏求购闲置帖
   * @param params ...
   */
  async needUnFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/need/follow/del`, params);
  }
  /**
   * check 检查单个闲置收藏状态
   * @param params ...
   */
  async checkIdleItemFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.get<string>(`${baseUrl}/idle/follow/item`, params);
  }
  /**
   * check 检查单个求购收藏状态
   * @param params ...
   */
  async checkNeedItemFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.get<string>(`${baseUrl}/idle/need/follow/item`, params);
  }
  /**
   * update update status
   * @param params ...
   */
  async updateIdleItemStatus(params: {_id: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/edit`, params);
  }
  /**
   * update update status
   * @param params ...
   */
  async updateNeedItemStatus(params: {_id: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/idle/need/edit`, params);
  }
  /**
   * publish 发布闲置评论
   * @param params ....
   */
  async publishIdleComment(params: commentType): Promise<commentType[]> {
    return httpRequest.post<commentType[]>(`${baseUrl}/idle/comment/add`, params);
  }
  /**
   * publish 发布求购评论
   * @param params ....
   */
  async publishNeedComment(params: commentType): Promise<commentType[]> {
    return httpRequest.post<commentType[]>(`${baseUrl}/idle/need/comment/add`, params);
  }
}

export default new IdleService();
