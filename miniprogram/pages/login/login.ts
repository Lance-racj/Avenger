// pages/login/login.ts
import {loginAccount} from '../../api/index';

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
    const res: any = await loginAccount(params);
    console.log(res);
  }
})