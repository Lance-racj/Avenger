import idleService from '../../api/idleService';

Page({
  data: {
    tabList: [
      '闲置出售',
      '求购闲置'
    ],
    idleCollectionList: [] as any,
    needCollectionList: [] as any,
    selectID: 0
  },
  onLoad() {
    this.getList(this.data.selectID);
  },
  async getList(id: number) {
    if (id === 0) {
      this.getIdleList();
    } else {
      this.getNeedList();
    }
  },
  getIdleList() {
    const openid = wx.getStorageSync('openid');
    idleService.getIdleFollowList({openid: openid}).then((res) => {
      this.setData({
        idleCollectionList: res
      })
    });
  },
  getNeedList() {
    const openid = wx.getStorageSync('openid');
    idleService.getNeedFollowList({openid: openid}).then((res) => {
      this.setData({
        needCollectionList: res
      })
    })
  },
  getTab(e: any) {
    this.setData({
      selectID: e.detail
    })
    this.getList(this.data.selectID);
  }
})