// pages/shopping-cart/shopping-cart.js
const app = getApp();
import {
  url
} from "../../utils/util.js"
Page({
  data:{
    have:false,
    shoppingCart: [],
    total: 0, // 商品结算总价
    selArr: [], // 记录选中的项
    isAllSel: false,
    shimg:{
      a: ` ${url}/resource/img/weixin/xcx/icon/shopping-cart2.png`,
      b: ` ${url}/resource/img/weixin/xcx/mine/pot@2x.png`,
      c: ` ${url}/resource/img/weixin/xcx/search/delete@2x.png`
    }
  },
  onLoad() {
    this.request();
  },
  onShow(){
    let shoppingCart = app.globalData.shoppingCart;
    // 为所有购物车数据添加选中状态
    shoppingCart.forEach(item => {
      item.sum = item.number * parseInt(item.currentPrice)
      item.checked = false;
    });
    this.setData({
      shoppingCart,
      isAllSel:false
    })
  this.have();
    console.log(this.data.shoppingCart)
  },
  checkboxChange(event){
    let {shoppingCart} = this.data;
    let tIndex = event.currentTarget.dataset.index;
    let isCheck = event.detail.value;
    if(isCheck == false){
      this.setData({
        isAllSel:false,
        [`shoppingCart[${tIndex}].checked`]:false,
      })
    }else{
      this.setData({
        [`shoppingCart[${tIndex}].checked`]: true
      })
      let check = true
      shoppingCart.forEach(item =>{
       if(item.checked == false){
         check = false
       }
      })
      this.setData({
        isAllSel:check,
      })
    }
    this.selwho();
    this.calcTotal();
  },
  ckecboxAll(event){
    let {shoppingCart} = this.data;
    let isCheckAll = event.detail.value;
    if(isCheckAll == false){
      shoppingCart.forEach((item,index) => {
        this.setData({
          [`shoppingCart[${index}].checked`]: false,
        })
      })
    }else{
      shoppingCart.forEach((item,index) => {
        shoppingCart[index].checked = true
        this.setData({
          shoppingCart,
        })
      })
    }
    this.selwho();
    this.calcTotal();
  },
  request() {
    wx.request({
      url: `${url}/selectByRecommend?recommend=推荐&pageNumber=0&pageSize=500`,
      success: res => {
        let tj = res.data.data.list
        this.setData({
          tjSource: tj
        })
      }
    })
  },
  // 计算总价
  calcTotal() {
    let { selArr } = this.data;
    let total = 0;
    selArr.forEach(order => {
      total += order.sum;
    });
    this.setData({
      total
    });
  },
  // 选中状态
  selwho(){
    let {shoppingCart} = this.data;
    let {selArr} = this.data;
    selArr=[]
    shoppingCart.forEach(item =>{
      if(item.checked){
        selArr.push(item)
      }
    })
    this.setData({
      selArr
    })
    console.log(this.data.selArr)
  },
  handleCounterChange(event) {
    let { shoppingCart } = this.data;
    let { num } = event.detail;
    let { index } = event.target.dataset;
    this.setData({
      [`shoppingCart[${index}].number`]: num,
      [`shoppingCart[${index}].sum`]: num * parseInt(shoppingCart[index].currentPrice)
    });
    // // 计算总价
    this.calcTotal();
  },
  // 点击删除
  delShop(){
    let { selArr, shoppingCart } = this.data;
    selArr.forEach(order => {
      let index = shoppingCart.indexOf(order);
      shoppingCart.splice(index, 1);
    selArr = [];
    this.setData({
      shoppingCart,
      selArr
    })
  })
  this.have();
  },
  have(){
    let {shoppingCart} = this.data;
    if (shoppingCart.length == 0) {
      this.setData({
        have: true
      })
    } else {
      this.setData({
        have: false
      })
    }
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