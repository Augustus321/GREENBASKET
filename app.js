const {
  url
} = require("./utils/util.js");
const Promise = require('utils/promise.js');
App({
  onLaunch: function() {
    let _this = this;
    // 判断是否授权
    wx.getSetting({
      success(res) {
        // 没有授权
        if (!res.authSetting["scope.userInfo"]) {
          // 跳转至授权页
          wx.showModal({
            title: '温馨提示',
            content: '青篮需要您授权用户信息！',
            showCancel: false,
            confirmText: '去设置',
            success: function(res) {
              wx.navigateTo({
                url: '../auth/auth'
              });
            }
          })
        } else {
          wx.showLoading({
            title: '加载中...',
            mask: true
          })
          wx.login({
            success: function(res) {
              if (res.code) {
                wx.getUserInfo({
                  success: function(res) {}
                });
                var appid = "wxe9e3d02ca6ceb3b1" //这里是我的appid，需要改成你自己的
                var secret = "6c094902709ce058d9f5db79ca6b2f4e" //密钥也要改成你自己的
                var openid = ""
                var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
                wx.request({
                  url: l,
                  data: {},
                  method: 'POST',
                  success: function(res) {
                    var obj = {};
                    obj.openid = res.data.openid;
                    _this.globalData.openid = obj.openid;
                    obj.expires_in = Date.now() + res.data.expires_in;
                    _this.appRequest();
                  }
                });
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });
        }
      }
    })
  },
  appRequest() {
    let _this = this;
    wx.request({
      url: `${url}/weiXinLogin`,
      data: {
        weixin: _this.globalData.openid
      },
      method: 'POST',
      success: function(res) {
        _this.globalData.usersId = res.data.data.usersId
        wx.request({
          url: `${url}/selectShopCart/commodity?usernameId=${_this.globalData.usersId}&pageNumber=0&pageSize=500`,
          success: function(response) {
            if (!Object.keys(response.data).length == 0){
              let list = response.data.data.list;
              list.forEach((item, index) => {
                let num = item.number;
                item.commodity.number = num;
                item.commodity.usersId = _this.globalData.usersId;
                _this.globalData.shoppingCart.push(item.commodity)
              })
            }
            _this.getUser();
            // 赋值购物车数据
            wx.hideLoading();
          }
        })
      }
    })
  },
  getUser() {
    let _this = this;
    wx.getUserInfo({
      success: function(res) {
        _this.globalData.userInfo = res.userInfo;
      }
    })
  },
  onHide() {
    let {
      shoppingCart
    } = this.globalData;
    // 上传购物车数据至服务器
    if (shoppingCart.length > 0) {
      wx.request({
        url: `${url}/addShopCart/commodity`,
        data: shoppingCart,
        method: 'POST',
        success: function(res) {}
      });
    } else {
      let {
        usersId
      } = this.globalData;
      shoppingCart.push({usersId:usersId})
      wx.request({
        url: `${url}/addShopCart/commodity`,
        data: shoppingCart,
        method: 'POST',
        success: function (res) { }
      })
    }
  },
  // 全局数据
  globalData: {
    shoppingCart: [], // 购物车
    loginUser: {},
    addr: [], //用户地址信息
    openid: '',
    usersId: '',
    userInfo: {},
    collectAll:[]
  },
});