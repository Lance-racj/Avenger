import helpService from '../../api/helpService';
import formatTime from '../../utils/formatTime';
import Notify from '@vant/weapp/notify/notify';

Page({
  data: {
    openid: '',
    title: '',
    phone: '',
    desc: '',
    money: 1
  },
  changeTitle(e: any) {
    this.setData({
      title: e.detail
    })
  },
  changePhone(e: any) {
    this.setData({
      phone: e.detail
    })
  },
  changeMoney(e: any) {
    this.setData({
      money: e.detail
    })
  },
  // 物品描述
  getDesc(event: any) {
    this.setData({
      desc: event.detail
    })
  },
  // 读取图片列表
  async toPublish() {
    const {
      title,
      phone,
      desc,
      money,
    } = this.data
    const openid = wx.getStorageSync('openid');
    if (!title || !phone || !desc || !money) {
      Notify({ 
        type: 'warning', 
        message: '请检查必填项是否完整' 
      });
      return;
    }
    const params = {
      openid,
      title,
      phone,
      desc,
      money,
      status: 0,
      time: formatTime(new Date().getTime())
    }
    helpService.publishHelp(params).then(() => {
      Notify({ 
        type: 'primary', 
        message: '发布成功，页面将于2s后跳回首页' 
      });
      setTimeout(() => {
        wx.reLaunch({
          url: '../index/index'
        })
      }, 2000)
    }).catch(() => {
      Notify('发布失败，请检查内容后重新发布');
    });
  }
})
