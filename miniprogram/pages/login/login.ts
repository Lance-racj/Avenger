import appService from '../../api/appService';

Page({
  data: {
    username: '',
    password: ''
  },
  toRegister() {
    wx.redirectTo({
      url: '../register/register'
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
  submit: async function() {
    const { username, password } = this.data;
    if (!username || !password) {
      wx.showToast({
        title: '请填入必填项',
        icon: 'none'
      })
      return;
    }
    const params = {
      username,
      password
    }
    const res: string = await appService.loginAccount(params);
    if (res == '用户名或密码错误') {
      wx.showToast({
        title: `${res}`,
        icon: 'none'
      })
    } else if (res == '不存在的账户') {
      wx.showToast({
        title: `${res}`,
        icon: 'none'
      })
    } else {
      wx.setStorageSync('login_account', true);
      wx.setStorageSync('account', params);
      wx.switchTab({
        url: '../index/index',
        success: () => {
          wx.showToast({
            title: `${res}`,
            icon: 'none'
          })
        }
      })
    }
  }
})