Page({
  data: {
    active: 1,
  },

  onChange(event: any) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
    console.log(this.data.active)
  },
});
