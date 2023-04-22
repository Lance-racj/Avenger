import { publishLost } from '../../api/index';
import Notify from '@vant/weapp/notify/notify';

interface imgListType {
  url: string,
  name: string,
  isImage?: boolean,
  deletable?: boolean
}

// 物品类别列表
const options = [
  {
    text: '卡片、证件类',
    value: '32001',
    children: [{ text: '身份证', value: '320011' }, { text: '学生卡', value: '320012' }],
  },
  {
    text: '生活用品',
    value: '32002',
    children: [{ text: '水杯', value: '320021' }, { text: '雨伞', value: '320022' }],
  },
]

Page({
  data: {
    openid: '',
    show: false, // 控制物品类别弹窗显隐
    options, // 物品类别列表
    type: '0', // 寻主 / 寻物
    classifyValue: '', // 种类
    classify_1: '', // 类别1
    classify_2: '', // 类别2
    cascaderValue: '', // 
    name: '', // 物品名称
    region: '', // 丢失/拾取地点
    date: '', // 丢失/拾取日期
    phone: '',
    desc: '', // 物品描述
    imgList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      },
    ] // 图片列表
  },
  // 1. 找失主 2. 找失物
  changeType(e: any) {
    this.setData({
      type: e.detail
    }) 
  },
  changeName(e: any) {
    this.setData({
      name: e.detail
    })
  },
  changeDate(e: any) {
    this.setData({
      date: e.detail
    })
  },
  changeRegion(e: any) {
    this.setData({
      region: e.detail
    })
  },
  // 控制弹窗
  onClick() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onFinish(e: any) {
    const { selectedOptions, value } = e.detail;
    const classifyValue = selectedOptions.map((option: any) => option.text || option.name).join('/');
    this.setData({
      classifyValue,
      cascaderValue: value,
      classify_1: selectedOptions[0].text,
      classify_2: selectedOptions[1].text,
      show: false
    })
  },
  changePhone(e: any) {
    this.setData({
      phone: e.detail
    })
  },
  // 物品描述
  getDesc(event: any) {
    this.setData({
      desc: event.detail
    })
  },
  // 读取图片列表
  afterRead(event: any) {
    const { file } = event.detail;
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success: (res) => {
        // 上传完成需要更新 imgList
        let { imgList } = this.data;
        imgList.push({ ...file, url: res.data });
        this.setData({ imgList });
      },
    });
  },
  async toPublish() {
    const {
      type,
      classify_1,
      classify_2,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
    } = this.data
    const openid = wx.getStorageSync('openid');
    const params = {
      openid,
      type: Number(type),
      classify_1,
      classify_2,
      name,
      date,
      region,
      phone,
      desc,
      imgList,
      time: new Date().getTime()
    }
    publishLost(params).then(() => {
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
