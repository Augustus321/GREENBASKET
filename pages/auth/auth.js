import {
  url
} from "../../utils/util.js"
const app = getApp();
Page({
  data:{
    openid:'',
    userInfo:{}
  },
  onLoad(){
    this.setData({
      userInfo:app.globalData.userInfo
    })
  },
  // => events
  getUserInfo(event) {
    let _this = this;
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.getUserInfo({
                  success: function (res) {
                  }
                });
                var appid = "wxe9e3d02ca6ceb3b1"        //这里是我的appid，需要改成你自己的
                var secret = "6c094902709ce058d9f5db79ca6b2f4e"    //密钥也要改成你自己的
                var openid = ""
                var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
                wx.request({
                  url: l,
                  data: {},
                  method: 'POST',
                  success: function (res) {
                    var obj = {};
                    obj.openid = res.data.openid;
                    _this.setData({
                      openid: obj.openid
                    })
                    obj.expires_in = Date.now() + res.data.expires_in;
                    _this.appRequest();
                  }
                });
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您需授权才能继续！',
            confirmText: '去设置',
            showCancel: false
          })
        }
      }
    })
  },
  appRequest() {
    let _this = this;
    wx.request({
      url: `${url}/weiXinLogin`,
      data: {
        weixin: _this.data.openid
      },
      method: 'POST',
      success: function (res) {
        app.globalData.usersId = res.data.data.usersId
        wx.request({
          url: `${url}/selectShopCart/commodity?usernameId=${app.globalData.usersId}&pageNumber=0&pageSize=500`,
          success: function (response) {
            let list = response.data.data.list;
            list.forEach((item, index) => {
              let num = item.number;
              item.commodity.number = num;
              item.commodity.usersId = app.globalData.usersId;
              app.globalData.shoppingCart.push(item.commodity)
            })
            _this.getUser();
            // 赋值购物车数据
            wx.hideLoading();
          }
        })
        console.log(_this.data.openid)
        console.log(res)
        wx.navigateBack({ 
          delta: 1
           })
      }
    })
  },
  getUser() {
    let _this = this;
    let {userInfo} = this.data.userInfo
    wx.getUserInfo({
      success: function (res) {
        userInfo = res.userInfo;
        _this.setData({
          userInfo
        })
      }
    })
  },
})