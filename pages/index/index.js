//index.js
//获取应用实例
const app = getApp();
  import {
    url
  } from '../../utils/util.js'
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
    data: {
      navH: 0, // 导航栏高度
      url,
      province: '',
      city: '',
      latitude: '',
      longitude: '',
      ify: [{ "title": "蔬菜", "ifys": [{ "name": "小青菜", "price": "4.5", "quantity": "500g", "imgUrl": `${url}/resource/img/weixin/xcx/index/shucai_01@2x.png` }, { "name": "青菜心", "price": "5.6", "quantity": "500g", "imgUrl": `${url}/resource/img/weixin/xcx/index/shucai_02@2x.png` }, { "name": "胡萝卜", "price": "4.0", "quantity": "500g", "imgUrl": `${url}/resource/img/weixin/xcx/index/shucai_03@2x.png` }, { "name": "老南瓜", "price": "3.8", "quantity": "500g" ,
        "imgUrl": `${url}/resource/img/weixin/xcx/index/shucai_04@2x.png`
      }]
      }, { "title": "水果", "ifys": [{ "name": "新疆红提", "price": "6.0", "quantity": "500g", "imgUrl": `${url}/resource/img/weixin/xcx/index/shuiguo_01@2x.png` }, { "name": "青柑", "price": "4.0", "quantity": "500g", "imgUrl": `${url}/resource/img/weixin/xcx/index/shuiguo_02@2x.png` }, { "name": "红心火龙果", "price": "8.5", "quantity": "500g",
          "imgUrl": `${url}/resource/img/weixin/xcx/index/shuiguo_03@2x.png` }] }]//模拟数据
    },
    onLoad(){
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
          key: 'GMLBZ-Y57WK-ZITJO-ASF5D-BZO35-DMB46'
        });
    },
  onShow: function () {
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  // => events
  handleNavSize(event) {
    let { navH } = event.detail;
    this.setData({
      navH
    })
  },
  // => methods 
  goDetails(){
    wx.navigateTo({
      url: `../../pages/details/details`,
    })
  },
});

// wx.getMenuButtonBoundingClientRect()
// wx.getSystemInfo()
