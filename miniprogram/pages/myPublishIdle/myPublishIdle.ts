import Notify from '@vant/weapp/notify/notify';
import { idleItem, needItem } from '../../types/idleInterface'
import idleService from '../../api/idleService';

Page({
  data: {
    tabList: [
      '闲置出售',
      '求购闲置'
    ],
    lostList: [] as idleItem[],
    needList: [] as needItem[],
    selectID: 0
  },
  onLoad() {
    this.getList(this.data.selectID);
  },
  getList(id: number) {
    if (id === 0) {
      this.getIdleList();
    } else {
      this.getNeedList();
    }
  },
  getIdleList() {
    idleService.getIdleList().then((res) => {
      this.setData({
        idleList: res
      })
    });
  },
  getNeedList() {
    idleService.getNeedList().then((res) => {
      this.setData({
        needList: res
      })
    })
  },
  getTab(e: any) {
    this.setData({
      selectID: e.detail
    })
    this.getList(e.detail);
  }
})