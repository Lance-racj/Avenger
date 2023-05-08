import { needItem, idleItem } from '../../types/idleInterface';
import idleService from '../../api/idleService';

Page({
  data: {
    swipeList: [
      {
        url: '../../assets/images/idle.png',
        type: 'url',
        target: 'www.baidu.com'
      },
      {
        url: '../../assets/images/idle1.png',
        type: 'product',
        target: '1'
      },
      {
        url: '../../assets/images/idle2.png',
        type: 'product',
        target: '1'
      },
    ],
    tabList: [
      '闲置出售',
      '求购闲置'
    ],
    idleList: [] as idleItem[],
    needList: [] as needItem[],
    selectID: 0
  },
  onLoad() {
    this.getIdleList();
  },
  getList(id: number) {
    if (id === 0) {
      this.getIdleList();
    } else {
      this.getNeedList();
    }
  },
  getIdleList() {
    idleService.getIdleList().then((res) => {
      this.setData({
        idleList: res
      })
    });
  },
  getNeedList() {
    idleService.getNeedList().then((res) => {
      this.setData({
        needList: res
      })
    })
  },
  getTab(e: any) {
    this.setData({
      selectID: e.detail
    })
    this.getList(e.detail);
  },
  // 去出售详情页
  goToIdleDetail(event: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: '../idleDetail/idleDetail?data='+JSON.stringify(event.currentTarget.dataset.item)
    })
  },
  // 去求购详情页
  goToNeedDetail(event: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: '../needDetail/needDetail?data='+JSON.stringify(event.currentTarget.dataset.item)
    })
  },
  toSearch() {
    if (this.data.selectID === 0) {
      wx.navigateTo({
        url: '../idleSearch/idleSearch',
      })
    } else {
      wx.navigateTo({
        url: '../needSearch/needSearch',
      })
    }
  },
})