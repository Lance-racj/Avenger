import httpRequest from '../utils/http';
const baseUrl = 'http://localhost:3060/api';
import { UserData, lostType } from '../types';

// 获取失物招领首页详情信息
export const getLoseData = (params: {
  type: number,
  openid?: string
}) => {
  return httpRequest.get<lostType<number>[]>(`${baseUrl}/lost/list`, params).then((res) => {
    return res;
  })
}

// 获取个人失物收藏信息
export const getFollowList = (params: {openid: string, type: number}) => {
  return httpRequest.get<lostType<string>[]>(`${baseUrl}/getfollow/list`, params).then((res) => {
    return res;
  })
}

// 查询是否收藏
export const checkFollow = (params: {id: string, openid: string}) => {
  return httpRequest.get<string>(`${baseUrl}/lost/follow/item`, params).then((res) => {
    return res;
  })
}

// 收藏失物招领帖
export const follow = (params: lostType<string>) => {
  return httpRequest.post<string>(`${baseUrl}/lost/follow/add`, params).then((res) => {
    return res;
  })
}

// 取消收藏失物招领帖
export const unfollow = (params: {id: string, openid: string}) => {
  return httpRequest.post<string>(`${baseUrl}/lost/follow/del`, params).then((res) => {
    return res;
  })
}

// 发布失物(寻物)信息帖
export const publishLost = (publishLostConfig: lostType<number>) => {
  return httpRequest.post<string>(`${baseUrl}/lost/publish`, publishLostConfig).then((res) => {
    return res;
  })
}

// 删除失物帖
export const deleteLostItem = (params: {_id: string}) => {
  return httpRequest.post<string>(`${baseUrl}/lost/delete`, params).then((res) => {
    return res;
  })
}

// 注册账号
export const registerAccount = (userData: UserData) => {
  return httpRequest.post<string>(`${baseUrl}/register`, userData).then((res) => {
    return res;
  })
}

// 登录账号
export const loginAccount = (userData: UserData) => {
  return httpRequest.post<string>(`${baseUrl}/toLogin`, userData).then((res) => {
    return res;
  })
}
