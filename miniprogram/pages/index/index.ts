// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

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
      {
        imageUrl: '../../assets/images/swipe3.jpg',
        type: 'url',
        target: 'www.baidu.com'
      },
    ]
  },
  // 事件处理函数
  goToShopping() {
    wx.navigateTo({
      url: '../shopping/shopping',
    })
  },
  goToLost() {
    wx.navigateTo({
      url: '../lost/lost',
    })
  },
})
