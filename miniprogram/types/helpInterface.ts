export interface helpItem {
  openid: string,
  title: string,
  money: number,
  desc: string,
  phone: string,
  status: number,
  time: string
}

export interface helpItemDetail extends helpItem {
  _id: string
}

export interface commentType {
  _id?: string,
  nickname: string,
  content: string,
  time: string
}