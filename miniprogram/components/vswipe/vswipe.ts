// components/vswipe/vswipe.ts
Component({
  properties: {
    swipeList: {
      type: Array,
      value: []
    }
  },
  data: {
    cur: 0
  },
  methods: {
    onSwipeChange: function(e: any) {
      this.setData({ cur: e.detail.current });
    }
  }
})
