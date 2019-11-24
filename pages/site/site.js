// pages/site/site.js
const app = getApp();

Page({
  data:{
    addr:[],//用户地址信息
    show:false
  },
  onLoad(){
    let addr = app.globalData.addr;
    this.setData({
      addr
    })
  },
  onshow(){
    this.onLoad()
  },
  goAddSite(){
    wx.redirectTo({
      url: '../../pages/addsite/addsite',
    })
  }
})