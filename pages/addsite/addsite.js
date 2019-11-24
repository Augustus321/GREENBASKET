// pages/addsite/addsite.js
import {
  url
} from "../../utils/util.js"
const app = getApp();
Page({
  data: {
    address: "点击选择收货地址",
    name: "",
    tel: "",
    info: "",
    isDefault: false,
    addr: [],
    addrOne:{},
    usersId:''
  },
  onShow() {
    this.setData({
      addr: app.globalData.addr
    })
  },
  choiceSite() {
    let that = this;
    wx.chooseLocation({
      // 如果已经授权，则直接调用
      success: function(res) {
        that.setData({
          address: res.address //调用成功直接设置地址
        })
      },
      // 如果失败，则是没有授权
      fail: function() {
        wx.getSetting({
          success(res) {
            // 判断authSetting有没有scope.userlocation
            if (!res.authSetting['scope.userLocation']) {
              // 设置authorize中的scope
              wx.authorize({
                scope: 'scope.userLocation',
                success() {
                  // 设置成功直接调用
                  wx.chooseLocation({
                    success: function(res) {
                      that.setData({
                        address: res.address //调用成功直接设置地址
                      })
                    },
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  setSite(e) {
    let that = this;
    let {
      name,
      tel,
      info,
      isDefault
    } = e.detail.value;
    if (!name || !tel || !info || that.data.address == '点击选择收货地址') {
      wx.showToast({
        title: '请填写完整信息！',
        icon: 'none',
        duration: 1000
      })
    } else {
      this.setData({
        name: name,
        tel: tel,
        info: info,
        isDefault: isDefault
      })
      this.tankuang();
    }
  },
  tankuang() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定添加此地址吗？',
      success: function(res) {
        if (that.data.isDefault == true) {
          that.data.addr.forEach((item, index) => {
            that.setData({
              [`addr[${index}].isDefault`]: false
            })
          })
        }
        that.data.addr.push({
          address: that.data.address,
          name: that.data.name,
          tel: that.data.tel,
          info: that.data.info,
          isDefault: that.data.isDefault
        })
        let {addrOne} = that.data;
        let {usersId} = app.globalData.usersId
        addrOne = {
          address: that.data.address,
          name: that.data.name,
          tel: that.data.tel,
          info: that.data.info,
          isDefault: that.data.isDefault,
          usersId:usersId
        }
        that.setData({
          addrOne
        })
        that.addaddr();
        wx.redirectTo({
          url: '../site/site',
        })
      }
    })
  },
  addaddr() {
    let {
      addrOne
    } = this.data;
    // 上传购物车数据至服务器
  wx.request({
    url: `${url}/addShip?${addrOne}`,
    success:res =>{
      console.log(res)
    }
  })
  }
})