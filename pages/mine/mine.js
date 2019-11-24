// pages/mine/mine.js
const app = getApp();
import {
  url
} from "../../utils/util.js"
Page({
  data:{
    userInfo:{},//获取用户信息
    collectAll:[],
    deimg:{
      a: ` ${url}/resource/img/weixin/xcx/mine/scan@2x.png`,
      b: ` ${url}/resource/img/weixin/xcx/mine/code@2x.png`,
      c: ` ${url}/resource/img/weixin/xcx/mine/MemberCenter@2x.png`,
      d: ` ${url}/resource/img/weixin/xcx/mine/VIP@2x.png`,
      e: ` ${url}/resource/img/weixin/xcx/mine/Aftersale@2x.png`,
      f: ` ${url}/resource/img/weixin/xcx/mine/Selfmention@2x.png`,
      g: ` ${url}/resource/img/weixin/xcx/mine/Shipped@2x.png`,
      h: ` ${url}/resource/img/weixin/xcx/mine/Tapepayment@2x.png`,
      i: ` ${url}/resource/img/weixin/xcx/mine/地址@2x.png`,
      j: ` ${url}/resource/img/weixin/xcx/mine/Coupon@2x.png`,
      k: ` ${url}/resource/img/weixin/xcx/mine/Signin@2x.png`,
      l: ` ${url}/resource/img/weixin/xcx/mine/join@2x.png`,
      m: ` ${url}/resource/img/weixin/xcx/mine/help@2x.png`,
      n: ` ${url}/resource/img/weixin/xcx/mine/edit@2x.png`,
      o: ` ${url}/resource/img/weixin/xcx/mine/pic@2x.png`,
      p: ` ${url}/resource/img/weixin/xcx/mine/Withdelivery@2x.png`,
      q: ` ${url}/resource/img/weixin/xcx/mine/pot@2x.png`,
      }//本地图片
  },
  onLoad(){
    this.request();
  },
  onShow(){
    let _this = this;
    let {userInfo} = this.data;
    wx.getUserInfo({
      success: function (res) {
        userInfo = res.userInfo;
        _this.setData({
          userInfo
        })
      }
    })
    this.setData({
      collectAll: app.globalData.collectAll
    })
  },
  goCollect(){
    wx.navigateTo({
      url: `../../pages/collect/collect`,
    })
  },
  goSite(){
    wx.navigateTo({
      url: `../../pages/site/site`,
    })
  },
  request(){
    wx.request({
      url: `${url}/selectByRecommend?recommend=推荐&pageNumber=0&pageSize=500`,
      success:res =>{
        let tj = res.data.data.list
        this.setData({
          tjSource:tj
        })
      }
    })
  },
  goDetails(event) {
    let { index } = event.currentTarget.dataset;
    let { commodityId } = this.data.tjSource[index];
    // 跳转至详情页
    wx.navigateTo({
      url: `../details/details?commodityId=${commodityId}`
    });
  },
})