import { needItem, idleItem } from '../../types/idleInterface';
import idleService from '../../api/idleService';

Page({
  data: {
    swipeList: [
      {
        imageUrl: '../../assets/images/help.png',
        type: 'url',
        target: 'www.baidu.com'
      },
      {
        imageUrl: '../../assets/images/help2.png',
        type: 'product',
        target: '1'
      },
    ],
    tabList: [
      '闲置出售',
      '求购闲置'
    ],
    idleList: [] as idleItem[],
    needList: [] as needItem[],
    selectID: 0
  },
  onLoad() {
    this.getIdleList();
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