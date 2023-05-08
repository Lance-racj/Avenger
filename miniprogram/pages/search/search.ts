import debounce from '../../utils/debounce';
import lostService from '../../api/lostService';

Page({
  data: {
    keyWord: '',
    searchLogs: [],
    searchRes: []
  },
  onLoad() {
    const searchLogs = wx.getStorageSync('searchLogs');
    this.setData({
      searchLogs
    })
  },
  getKeyWord: debounce(function (this: any, event: WechatMiniprogram.Input) {
    this.setData({keyWord: event.detail.value});
    const params = {
      name: event.detail.value
    }
    lostService.searchByName(params).then((res) => {
      this.setData({
        searchRes: res
      })
    })
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
    this.setData({
      keyWord: '',
      searchRes: []
    });
  },
  clearLogs() {
    wx.removeStorageSync('searchLogs');
    this.setData({
      searchLogs: [],
      searchRes: []
    })
  },
  quickSearch(event: WechatMiniprogram.TouchEvent) {
    const data = event.currentTarget.dataset.item
    this.setData({
      keyWord: data
    })
    const params = {
      name: this.data.keyWord
    }
    lostService.searchByName(params).then((res) => {
      this.setData({
        searchRes: res
      })
    })
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
  },
  toDetail(event: any) {
    wx.navigateTo({
      url: '../lostDetail/lostDetail?data='+JSON.stringify(event.currentTarget.dataset.item)
    })
  }
})