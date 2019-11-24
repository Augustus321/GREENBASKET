//index.js
//获取应用实例
import {
  url
} from '../../utils/util.js'
Page({
  data: {
      hots: ["新鲜", "土豆", "鸡蛋", "蔬菜", "青菜"]
  },
  // => events
  handleEvents(event) {
    let keywords = event.type == "confirm" ? event.detail.value : event.target.dataset.text;
    wx.navigateTo({
      url: `../search-res/search-res?keywords=${keywords}`,
    })
  },
  // => methods 
});

// wx.getMenuButtonBoundingClientRect()
// wx.getSystemInfo()
