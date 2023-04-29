import lostService from '../../api/lostService';

Page({
  data: {
    tabList: [
      '寻主',
      '寻物'
    ],
    collectionList: [] as any,
    selectID: 0
  },
  onLoad() {
    this.getList();
  },
  async getList() {
    const params = {
      openid: wx.getStorageSync('openid'),
      type: this.data.selectID
    }
    lostService.getFollowList(params).then((res) => {
      this.setData({
        collectionList: res
      });
    })
  },
  getTab(e: any) {
    this.setData({
      selectID: e.detail
    })
    this.getList();
  }
})