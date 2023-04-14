import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
 
Page({ 
  data: { 
    userInfo: {}, 
    openid: '',
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
      title: '二次确认',
      message: '是否退出登录',
    }).then(() => {
        wx.removeStorageSync('login_account');
        this.setData({
          login_account: false
        })
        wx.redirectTo({
          url: '../login/login'
        })
    }).catch(() => {
        // on cancel
    });
  },
  onLoad() {
    const login_account = wx.getStorageSync('login_account');
    const account = wx.getStorageSync('account');
    this.setData({
      login_account: login_account,
      userInfo: account
    })
    if (!login_account) {
      wx.redirectTo({
        url: '../login/login'
      })
    }
  }
}) 