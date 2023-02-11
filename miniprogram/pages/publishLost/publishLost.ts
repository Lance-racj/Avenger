// pages/publishLost/publishLost.ts
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
    show: false,
    options,
    type: 1,
    classifyValue: '',
    classify_1: '',
    classify_2: '',
    cascaderValue: '',
    name: '',
    region: '',
    date: '',
  },
  // 1. 找失主 2. 找失物
  changeType(e: any) {
    this.setData({
      type: e.detail
    })
  },
  changeName(e: any) {

  },
  changeDate(e: any) {

  },
  changeRegion(e: any) {

  },
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
})
