import { helpItem } from '../../types/helpInterface';
import helpService from '../../api/helpService';

Page({
  data: {
    myHelpList: [] as helpItem[]
  },
  onLoad() {
    this.getMyHelpList();
  },
  getMyHelpList(): void {
    const openid = wx.getStorageSync('openid');
    helpService.getHelpList({openid: openid}).then((res) => {
      this.setData({myHelpList: res});
    })
  }
})