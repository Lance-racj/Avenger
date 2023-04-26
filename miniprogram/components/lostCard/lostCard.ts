Component({
  properties: {
    lostItem: {},
    handle: Boolean
  },
  methods: {
    deleteItem(e: WechatMiniprogram.TouchEvent) {
      const { id } = e.currentTarget.dataset;
      this.triggerEvent('getDeleteID', id)
    }
  }
})