Page({
  data: {
    swipeList: [
      {
        imageUrl: '../../assets/images/swipe1.jpg',
        type: 'url',
        target: 'www.baidu.com'
      },
      {
        imageUrl: '../../assets/images/swipe2.jpg',
        type: 'product',
        target: '1'
      },
    ],
    data: {},
    show: false,
    isCollect: false
  },
  onLoad(options: Record<string, string>) {
    const data = JSON.parse(options.data);
    this.setData({data})
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  // 复制手机号
  copyNumber() {
    wx.setClipboardData({
      data: '15184436833',
      success: () => {
        wx.showToast({
          icon: "none",
          title: "内容已复制"
        })
        this.onClose();
      }
    })
  },
  // 收藏
  toCollection() {
    // 后续改为由后端传回数据控制
    this.setData({isCollect: !this.data.isCollect});
  }
})