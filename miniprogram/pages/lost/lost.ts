import lostService from '../../api/lostService';
import formatTime from '../../utils/formatTime';
import { lostItem } from '../../types/lostInterface';

Page({
  data: {
    swipeList: [
      {
        url: '../../assets/images/lost.png',
        type: 'url',
        target: 'www.baidu.com'
      },
      {
        url: '../../assets/images/lost1.png',
        type: 'product',
        target: '1'
      },
    ],
    tabList: [
      '寻主',
      '寻物'
    ],
    lostList: [] as lostItem<string>[],
    selectID: 0
  },
  onLoad: function() {
    this.getLose();
  },
  toSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 去详情页
  goToDetail(event: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: '../lostDetail/lostDetail?data='+JSON.stringify(event.currentTarget.dataset.item)
    })
  },
  getLose: async function() {
    const params = { type: this.data.selectID };
    lostService.getLoseData(params).then((loseData) => {
      this.setData({
        lostList: loseData.map((item: lostItem<number>) => {
          return {
            ...item,
            time: formatTime(item.time)
          }
        })
      })
    })
  },
  getTab(e: any) {
    this.setData({
      selectID: e.detail
    })
    this.getLose();
  }
})
