import {registerAccount} from '../../api/index';

Page({
  data: {
    username: '',
    password: '',
    confirm: '',
    openid: ''
  },
  onLoad() {
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
            })
          },
          fail: function (error) {
            console.log('获取openid失败', error);
          }
        })
      }
    })
  },
  toLogin() {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  getUsername(e: any) {
    this.setData({
      username: e.detail
    })
  },
  getPassword(e: any) {
    this.setData({
      password: e.detail
    })
  },
  getConfirm(e: any) {
    this.setData({
      confirm: e.detail
    })
  },
  submit: async function() {
    const {username, password, confirm} = this.data;
    if (!username || !password || !confirm) {
      wx.showToast({
        title: '存在未填项，请检查',
        icon: 'none'
      })
      return;
    }
    if (password !== confirm) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      })
      return;
    }
    const params = {
      openid: wx.getStorageSync('openid'),
      username,
      password,
      date: new Date().getTime()
    }
    const res: any = await registerAccount(params);
    if (res == 'success') {
      wx.redirectTo({
        url: '../login/login',
        success: () => {
          wx.showToast({
            title: '注册成功',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '注册失败，请检查账号密码',
        icon: 'none'
      })
      return;
    }
  }
})