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
  onLoad: function() {
    wx.request({
      url: `http://localhost:3060/hello`,
      success: (res)  => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err);
      }
    })
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
