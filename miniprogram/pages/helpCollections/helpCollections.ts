import helpService from '../../api/helpService';

Page({
  data: {
    collectionList: [] as any,
  },
  onLoad() {
    this.getList();
  },
  async getList() {
    const params = {
      openid: wx.getStorageSync('openid'),
    }
    helpService.getHelpFollowList(params).then((res) => {
      this.setData({
        collectionList: res
      });
      console.log(this.data.collectionList)
    })
  }
})