Component({
  data: {
    navH: 0,
    statusBarHeight: 0,
    searchH: 0,
    bound: {}
  },
  methods:{
    goSearchRes() {
      wx.navigateTo({
        url: `../../pages/search/search`,
      })
    }
  },
  lifetimes: {
    attached() {
      let bound = wx.getMenuButtonBoundingClientRect()
      wx.getSystemInfo({
        success: res => {
          // 获取状态栏高度
          let { statusBarHeight } = res;
          let navH = statusBarHeight + (bound.top - statusBarHeight) * 2 + bound.height;
          this.setData({
            navH,
            statusBarHeight,
            bound
          });
          // 返回数据
          this.triggerEvent("size", {
            navH,
            statusBarHeight,
            bound
          });
        }
      });
    }
  }
})
