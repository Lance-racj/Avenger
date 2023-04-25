import { follow, unfollow, checkFollow } from '../../api/index';
import Notify from '@vant/weapp/notify/notify';
import { lostType } from '../../types';


interface lostTypeDetail<T> extends lostType<T> {
  _id: string,
}

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
    data: {} as lostTypeDetail<string>,
    show: false,
    isCollect: false
  },
  onLoad(options: Record<string, string>) {
    const data = JSON.parse(options.data);
    this.setData({data})
    this.checkFollow();
  },
  async checkFollow(){
    const res = await checkFollow({id: this.data.data._id, openid: this.data.data.openid});
    if (res === 'success') this.setData({isCollect: true});
    else this.setData({isCollect: false})
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
      data: this.data.data.phone,
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
  async toCollection() {
    if (this.data.isCollect) { // 取消收藏
      unfollow({id: this.data.data._id, openid: this.data.data.openid});
      this.checkFollow();
      Notify({
        type: 'primary',
        message: '取消收藏成功'
      })
    } else { // 收藏
      follow(this.data.data);
      this.checkFollow();
      Notify({ 
        type: 'primary', 
        message: '收藏成功' 
      });
    }
  }
})