import debounce from '../../utils/debounce';
import idleService from '../../api/idleService';

Page({
  data: {
    keyWord: '',
    searchLogs: [],
    searchRes: []
  },
  onLoad() {
    const searchLogs = wx.getStorageSync('needSearchLogs');
    this.setData({
      searchLogs
    })
  },
  getKeyWord: debounce(function (this: any, event: WechatMiniprogram.Input) {
    this.setData({keyWord: event.detail.value});
    if (event.detail.value === '') {
      this.clearKeyWord();  // test
      return;
    }
    const params = {
      name: event.detail.value
    }
    idleService.searchNeedByName(params).then((res) => {
      this.setData({
        searchRes: res
      })
    })
    // 输入的内容在数据库中能查到，切换视图,并获取数据库数据，wx:for展示,上下文无关
    let searchLogs = wx.getStorageSync('needSearchLogs');
    // 去重校验
    if (searchLogs && !searchLogs.includes(event.detail.value)) {
      searchLogs.unshift(event.detail.value);
    } else {
      searchLogs = [event.detail.value];
    }
    wx.setStorageSync('needSearchLogs', searchLogs);
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
    wx.removeStorageSync('needSearchLogs');
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
    idleService.searchNeedByName(params).then((res) => {
      this.setData({
        searchRes: res
      })
    })
    // 删除元素重新插入顶部
    let searchLogs = wx.getStorageSync('needSearchLogs');
    searchLogs = searchLogs.filter((item: string) => {
      if (item !== data) return true;
      else return false;
    });
    searchLogs.unshift(data);
    // 重新设置缓存
    wx.setStorageSync('needSearchLogs', searchLogs);
    // 重新设置data且刷新页面
    this.setData({
      searchLogs
    })
  },
  toDetail(event: any) {
    wx.navigateTo({
      url: '../needDetail/needDetail?data='+JSON.stringify(event.currentTarget.dataset.item)
    })
  }
})