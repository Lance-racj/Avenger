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
  imgList: imgItem[],
  time: string
}
export interface needItem {
  openid: string,
  name: string,
  desc: string,
  phone: string,
  time: string
}