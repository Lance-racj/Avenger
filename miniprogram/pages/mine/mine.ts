// pages/mine/mine.ts
// index.ts 
// 获取应用实例 
const app = getApp<IAppOption>() 
 
Page({ 
  data: { 
    userInfo: {}, 
    canIUse: wx.canIUse('button.open-type.getUserInfo'), 
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false 
  }, 
  onLoad() { 
    wx.login({
      success (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://example.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }, 
}) 