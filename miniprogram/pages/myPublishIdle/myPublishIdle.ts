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
  },
  deleteIdleItem(e: any) {
    const params = {_id: e.detail};
    idleService.deleteIdleItem(params).then((res) => {
      if(res === 'success') {
        Notify({
          type: 'primary',
          message: '删除成功'
        })
        this.getList(this.data.selectID);
      } else {
        Notify({
          type: 'danger',
          message: '删除失败'
        })
      }
    })
  },
  updateIdleItem(e: any) {
    const params = {_id: e.detail}
    idleService.updateIdleItemStatus(params).then((res) => {
      if(res === 'success') {
        Notify({
          type: 'primary',
          message: '更新成功'
        })
        this.getList(this.data.selectID);
      } else {
        Notify({
          type: 'danger',
          message: '更新失败'
        })
      }
    })
  },
  deleteNeedItem(e: any) {
    const { id } = e.currentTarget.dataset;
    const params = {_id: id};
    idleService.deleteNeedItem(params).then((res) => {
      if(res === 'success') {
        Notify({
          type: 'primary',
          message: '删除成功'
        })
        this.getList(this.data.selectID);
      } else {
        Notify({
          type: 'danger',
          message: '删除失败'
        })
      }
    })
  },
  updateNeedItem(e: any) {
    const { id } = e.currentTarget.dataset;
    const params = {_id: id}
    idleService.updateNeedItemStatus(params).then((res) => {
      if(res === 'success') {
        Notify({
          type: 'primary',
          message: '更新成功'
        })
        this.getList(this.data.selectID);
      } else {
        Notify({
          type: 'danger',
          message: '更新失败'
        })
      }
    })
  }
})