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
    selectID: 0
  },
  onLoad: function() {
    // const lostData = await 
  },
  goToSearch() {
    wx.navigateTo({
      url: '',
    })
  },
  selectTab(event: WechatMiniprogram.TouchEvent) {
    const {id} = event.currentTarget.dataset;
    this.setData({selectID: id});
  }
})
