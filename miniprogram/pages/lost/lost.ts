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
    lostList: [
      {
        image: '../../assets/images/swipe1.jpg',
        name: '保温杯',
        region: '成都校区',
        date: '2023年3月20日',
        desc: 'dnawdafkjfnjaknd',
        time: '2023年3月23日'
      },
      {
        image: '../../assets/images/swipe1.jpg',
        name: 'res杯',
        region: '南充校区',
        date: '2023年3月10日',
        desc: 'dnawdafkjfn大大的娃大jaknd',
        time: '2023年3月33日'
      }
    ]
  },
  onLoad: function() {},
  goToSearch() {
    wx.navigateTo({
      url: '',
    })
  },
  // 去详情页
  goToDetail(event: WechatMiniprogram.TouchEvent) {
    wx.navigateTo({
      url: '../lostDetail/lostDetail?data='+JSON.stringify(event.currentTarget.dataset.item)
    })
  },
  selectTab(event: WechatMiniprogram.TouchEvent) {
    const {id} = event.currentTarget.dataset;
    this.setData({selectID: id});
  }
})
