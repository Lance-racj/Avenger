import debounce from '../../utils/debounce';

Page({
  data: {
    keyWord: '',
    searchLogs: []
  },
  onLoad() {
    const searchLogs = wx.getStorageSync('searchLogs');
    this.setData({
      searchLogs
    })
  },
  getKeyWord: debounce(function (this: any, event: WechatMiniprogram.Input) {
    this.setData({keyWord: event.detail.value});
    // 输入的内容在数据库中能查到，切换视图,并获取数据库数据，wx:for展示,上下文无关
    let searchLogs = wx.getStorageSync('searchLogs');
    // 去重校验
    if (searchLogs && !searchLogs.includes(event.detail.value)) {
      searchLogs.unshift(event.detail.value);
    } else {
      searchLogs = [event.detail.value];
    }
    wx.setStorageSync('searchLogs', searchLogs);
    this.setData({
      searchLogs
    })
  }, 1000),
  clearKeyWord() {
    this.setData({keyWord: ''});
  },
  clearLogs() {
    wx.removeStorageSync('searchLogs');
    this.setData({
      searchLogs: []
    })
  },
  quickSearch(event: WechatMiniprogram.TouchEvent) {
    const data = event.currentTarget.dataset.item
    this.setData({
      keyWord: data
    })
    /* 如果后续发送网络请求可以写在这里 */
    // 删除元素重新插入顶部
    let searchLogs = wx.getStorageSync('searchLogs');
    searchLogs = searchLogs.filter((item: string) => {
      if (item !== data) return true;
      else return false;
    });
    searchLogs.unshift(data);
    // 重新设置缓存
    wx.setStorageSync('searchLogs', searchLogs);
    // 重新设置data且刷新页面
    this.setData({
      searchLogs
    })
  }
})