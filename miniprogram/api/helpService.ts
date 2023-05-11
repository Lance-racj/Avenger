import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { helpItem, helpItemDetail, commentType } from '../types/helpInterface';

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
    return httpRequest.get<helpItem[]>(`${baseUrl}/help/list`, params).then((res) => {
      return res.reverse();
    });
  }
  /**
   * get 获取求助收藏列表
   * @param params ....
   */
  async getHelpFollowList(params: {openid: string}): Promise<helpItemDetail[]> {
    return httpRequest.get<helpItemDetail[]>(`${baseUrl}/help/follow/list`, params).then((res) => {
      return res.reverse();
    });
  }
  /**
   * post 收藏求助贴
   * @param params ....
   */
  async helpFollow(params: helpItem): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/help/follow/add`, params);
  }
  /**
   * post 取消求助收藏
   * @param params ....
   */
  async helpUnFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/help/follow/del`, params);
  }
  /**
   * check 检查单个求助收藏状态
   * @param params ....
   */
  async checkHelpItemFollow(params: {id: string, openid: string}): Promise<string> {
    return httpRequest.get<string>(`${baseUrl}/help/follow/item`, params);
  }
  /**
   * check 删除单个求助帖
   * @param params ....
   */
  async deleteHelpItem(params: {_id: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/help/delete`, params);
  }
  /**
   * update 更新状态
   * @param params ....
   */
  async upDateHelpItem(params: {_id: string}): Promise<string> {
    return httpRequest.post<string>(`${baseUrl}/help/edit`, params);
  }
  /**
   * publish 发布评论
   * @param params ....
   */
  async publishComment(params: commentType): Promise<commentType[]> {
    return httpRequest.post<commentType[]>(`${baseUrl}/help/comment/add`, params);
  }
  /**
   * search 搜索
   * @param params ....
   */
  async searchByName(params: { title: string }): Promise<any> {
    return httpRequest.get<any>(`${baseUrl}/help/search/name`, params);
  }
}

export default new HelpService();

