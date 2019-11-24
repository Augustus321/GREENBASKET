Component({
  properties: {
    backIcon: String,
    searchIcon: String,
    text: {
      type: String,
      value: '北京',
      observer: function(newv, oldv, path) {
        console.log(newv, oldv, path)
        // 输出malinshu xiaoxiao["name"]
        this.setData({
          text: newv
        })
      }
    }
  },
  data: {
    navH: 0,
    statusBarHeight: 0,
    searchH: 0,
    bound: {}
  },
  methods: {
    handleSeachInputConfirm(event) {
      let keywords = event.detail.value;
      this.triggerEvent("change", {
        keywords
      });
    },
    goSearchRes() {
      wx.navigateTo({
        url: `../../pages/search/search`,
      })
    },
    bindRegionChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        region: e.detail.value
      })
    }
  },
  lifetimes: {
    attached() {
      let bound = wx.getMenuButtonBoundingClientRect()
      wx.getSystemInfo({
        success: res => {
          // 获取状态栏高度
          let {
            statusBarHeight
          } = res;
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