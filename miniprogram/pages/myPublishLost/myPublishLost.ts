import lostService from '../../api/lostService';
import { lostItem } from '../../types/lostInterface';
import formatTime from '../../utils/formatTime';
import Notify from '@vant/weapp/notify/notify';

Page({
  data: {
    tabList: [
      '寻主',
      '寻物'
    ],
    lostList: [] as lostItem<string>[],
    selectID: 0
  },
  onLoad() {
    this.getMyLoseList();
  },
  getMyLoseList() {
    const params = {
      type: this.data.selectID,
      openid: wx.getStorageSync('openid')
    }
    lostService.getLoseData(params).then((res) => {
      this.setData({
        lostList: res.map((item: lostItem<number>) => {
          return {
            ...item,
            time: formatTime(item.time)
          }
        })
      });
    })
  },
  getTab(e: any) {
    this.setData({
      selectID: e.detail
    })
    this.getMyLoseList();
  },
  deleteItem(e: any) {
    const params = {_id: e.detail}
    lostService.deleteLostItem(params).then((res) => {
      if(res === 'success') {
        Notify({
          type: 'primary',
          message: '删除成功'
        })
        this.getMyLoseList();
      } else {
        Notify({
          type: 'danger',
          message: '删除失败'
        })
      }
    })
  }
})