export interface imgItem {
  name: string,
  url: string
}
export interface idleItem {
  openid: string
  classify_1: string,
  classify_2: string,
  name: string,
  desc: string,
  phone: string,
  money: number,
  imgList: imgItem[],
  status: number,
  time: string
}
export interface needItem {
  openid: string,
  name: string,
  desc: string,
  phone: string,
  status: number,
  time: string
}
export interface idleItemDetail extends idleItem {
  _id: string
}
export interface needItemDetail extends needItem {
  _id: string
}
export interface commentType {
  _id?: string,
  nickname: string,
  content: string,
  time: number
}