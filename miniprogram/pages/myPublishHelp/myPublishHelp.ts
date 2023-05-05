import { helpItem } from '../../types/helpInterface';
import helpService from '../../api/helpService';
import Notify from '@vant/weapp/notify/notify';

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
  },
  deleteItem(e: any) {
    const params = {_id: e.detail}
    helpService.deleteHelpItem(params).then((res) => {
      if(res === 'success') {
        Notify({
          type: 'primary',
          message: '删除成功'
        })
        this.getMyHelpList();
      } else {
        Notify({
          type: 'danger',
          message: '删除失败'
        })
      }
    })
  },
  updateItem(e: any) {
    const params = {_id: e.detail}
    helpService.upDateHelpItem(params).then((res) => {
      if(res === 'success') {
        Notify({
          type: 'primary',
          message: '更新成功'
        })
        this.getMyHelpList();
      } else {
        Notify({
          type: 'danger',
          message: '更新失败'
        })
      }
    })
  }
})