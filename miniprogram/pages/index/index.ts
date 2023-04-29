// index.ts
const app = getApp<IAppOption>()

Page({
  data: {
    swipeList: [
      {
        url: '../../assets/images/swipe1.jpg',
        type: 'url',
        target: 'www.baidu.com'
      },
      {
        url: '../../assets/images/swipe2.jpg',
        type: 'product',
        target: '1'
      },
      {
        url: '../../assets/images/swipe3.jpg',
        type: 'url',
        target: 'www.baidu.com'
      },
    ]
  },
  goToShopping() {
    wx.navigateTo({
      url: '../idle/idle',
    })
  },
  goToLost() {
    wx.navigateTo({
      url: '../lost/lost',
    })
  },
  goToHelp() {
    wx.navigateTo({
      url: '../help/help'
    })
  }
  // goToLostClassify() {
  //   wx.navigateTo({
  //     url: '../lostClassify/lostClassify'
  //   })
  // }
})
