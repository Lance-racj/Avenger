import { getLoseData } from '../../api/index';
import formatTime from '../../utils/formatTime';

interface loseListType<T> {
  name: string,
  desc: string,
  imgList: Array<{url: string, name: string}>,
  region: string,
  date: string,
  phone: string,
  time: T
}

Page({
  data: {
    swipeList: [
      {
        imageUrl: '../../assets/images/swipe1.jpg',
        type: 'url',
        target: 'www.baidu.com'
      },
      {
        imageUrl: '../../assets/images/swipe2.jpg',
        type: 'product',
        target: '1'
      },
    ],
    tabList: [
      '寻主',
      '寻物'
    ],
    lostList: [] as loseListType<string>[],
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
    let loseData = await getLoseData(params) as any;
    this.setData({
      lostList: loseData.map((item: loseListType<number>) => {
        return {
          ...item,
          time: formatTime(item.time)
        }
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
