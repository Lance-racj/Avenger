// pages/mine/mine.ts
Page({
  data: {
    userInfo: {}
  },
  login() {
    const that = this;
    wx.getUserProfile({
      desc: `完善个人信息`,
      success: (res) => {
        that.setData({userInfo: res.userInfo})
      }
    })
  }
})