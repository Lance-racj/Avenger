Component({
  properties: {
    tabList: {
      type: Array
    }
  },
  data: {
    selectID: 0
  },
  methods: {
    selectTab(event: WechatMiniprogram.TouchEvent) {
      const {id} = event.currentTarget.dataset;
      this.setData({selectID: id});
    }
  }
})