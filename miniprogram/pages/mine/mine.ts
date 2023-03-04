// pages/mine/mine.ts
// index.ts 
// 获取应用实例 
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp<IAppOption>() 
 
Page({ 
  data: { 
    userInfo: {}, 
    canIUse: wx.canIUse('button.open-type.getUserInfo'), 
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false 
    openid: '',
    login: false,
    show: false
  }, 
  toLogin() {
    let that = this;
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx81ee064393ad2911',
            secret: 'fc36f5c83d58ed9e4cc9d82a667887df',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          success: function(response: any) {
            var openid = response.data.openid;
            wx.setStorageSync('openid', openid);
            that.setData({
              openid: openid,
              login: true
            })
            wx.setStorageSync('login', true);
          },
          fail: function (error) {
            console.log('获取openid失败', error);
          }
        })
      }
    })
  },
  showDialog() {
    Dialog.confirm({
      title: '是否退出登录',
    }).then(() => {
        // on confirm
    }).catch(() => {
        // on cancel
    });
  },
  onLoad() {
    const login = wx.getStorageSync('login');
    this.setData({
      login: login
    })
  }
}) 