import { getLoseData } from '../../api/index';
import { lostType } from '../../types/index';
import formatTime from '../../utils/formatTime';

Page({
  data: {
    tabList: [
      '寻主',
      '寻物'
    ],
    lostList: [] as lostType<string>[],
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
    getLoseData(params).then((res) => {
      this.setData({
        lostList: res.map((item: lostType<number>) => {
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
  }
})