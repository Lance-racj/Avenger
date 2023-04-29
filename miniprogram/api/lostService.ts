/* eslint-disable  */
import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { lostItem } from '../types/lostInterface';


class LostService {
  /**
   * 获取失物招领首页详情信息
   * @param params {type: number, openid?: string}
   */
  async getLoseData(params: {type: number, openid?: string}): Promise<lostItem<number>[]> {
    return await httpRequest.get<lostItem<number>[]>(`${baseUrl}/lost/list`, params);
  }
  /**
   * 发布失物(寻物)信息帖
   * @param params lostItem<number>
   */
  async publishLost(params: lostItem<number>): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/lost/publish`, params)
  }
  /**
   * 删除失物(寻物)信息帖
   * @param params {_id: string}
   */
  async deleteLostItem(params: {_id: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/lost/delete`, params)
  }
  /**
   * 获取个人失物收藏信息
   * @param params {openid: string, type: number}
   */
  async getFollowList(params: {openid: string, type: number}): Promise<lostItem<string>[]> {
    return httpRequest.get<lostItem<string>[]>(`${baseUrl}/lost/follow/list`, params)
  }
  /**
   * 查询是否收藏
   * @param params {id: string, openid: string}
   */
  async checkFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.get<string>(`${baseUrl}/lost/follow/item`, params)
  }
  /**
   * 收藏失物招领帖
   * @param params lostItem<string>
   */
  async follow(params: lostItem<string>): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/lost/follow/add`, params)
  }
  /**
   * 取消收藏失物招领帖
   * @param params {id: string, openid: string}
   */
  async unfollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/lost/follow/del`, params)
  }
}

export default new LostService();
