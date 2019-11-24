// pages/details/details.js
const app = getApp();
import {
  url
} from "../../utils/util.js"

Page({
  data:{
    detailShopping:{},//商品数据
    toView:'anchor-0',
    toViewClass:'anchor-0',
    isCollect:false,
    shoppingCart:[],
    evaluate:[],
    mydetail:{},
    addr:[],
    usersId:'',
    collectAll:[]
  },
  onLoad(options) {
    let { commodityId } = options;
    this.request(commodityId);
    this.allRequest();
    this.setData({
      shoppingCart: app.globalData.shoppingCart,
    });
    this.setData({
      addr:app.globalData.addr
    })
    console.log(this.dta.addr)
  },
  onShow(){
    let {detailShopping} = this.data;
    detailShopping.usersId = app.globalData.usersId
    if(app.globalData.collectAll.indexOf(detailShopping) == -1){
      this.setData({
        isCollect: false
      })
    }else{
      this.setData({
        isCollect: true
      })
    }
  },
  request(commodityId){
    wx.request({
      url: `${url}/selectOne?commodityId=${commodityId}`,
      success: res => {
        let shoppingOne = res.data.data.commodity;
        let evaluateOne = res.data.data.evaluates;
        let detailOne = res.data.data.details
        this.setData({
          detailShopping:shoppingOne,
          [`detailShopping.number`]: 1,
          evaluate: evaluateOne,
          mydetail: detailOne
        });
      }
    });
  },
  allRequest(){
    wx.request({
      url: `${url}/selectByDiscount?discount=打折&pageNumber=0&pageSize=500`,
      success: res => {
        let dz = res.data.data.list
        this.setData({
          dzSource: dz
        })
      }
    })
  },
  goDetails(event) {
    let { index } = event.currentTarget.dataset;
    let { commodityId } = this.data.dzSource[index];
    // 跳转至详情页
    wx.navigateTo({
      url: `../details/details?commodityId=${commodityId}`
    });
  },
  anchorTo(event){
    let anchorId = event.target.dataset.id;
    this.setData({
      toView:anchorId,
      toViewClass: anchorId
    })
  },
  scroll(event){
    let scroll_top = event.detail.scrollTop;
    let anchorThis = '';
    if(scroll_top < 400){
      anchorThis = 'anchor-0'
    }else if(scroll_top < 500){
      anchorThis = 'anchor-1'
    }else{
      anchorThis = 'anchor-2'
    }
    this.setData({
      toViewClass:anchorThis
    })
  },
  theCollect(){
    let {detailShopping} = this.data;
    detailShopping.usersId = app.globalData.usersId
    this.isCollect = !this.isCollect
    this.setData({
      isCollect:this.isCollect
    })
    if(this.isCollect){
      app.globalData.collectAll.push(detailShopping)
    }else{
      let a = app.globalData.collectAll.indexOf(detailShopping)
      app.globalData.collectAll.splice(a,1)
    }
    console.log(app.globalData.collectAll)
  },
  joinCart(){
    this.setData({
      [`detailShopping.usersId`]: app.globalData.usersId,
      [`detailShopping.sum`]:parseInt(this.data.detailShopping.currentPrice),
    })
    let {shoppingCart} = this.data;
    let flag = false;
    let add = this.data.detailShopping
    let user = add.user
    for (let i = 0, len = shoppingCart.length; i < len; i++) {
      let obj = shoppingCart[i];
      if (obj.commodityId == add.commodityId) {
        obj.number ++;
        obj.sum = parseInt(obj.currentPrice) * obj.number
        flag = true;
        break;
      }
    }
    if (!flag) {
      shoppingCart.push(add);
    }
    console.log(shoppingCart)
  },
  goSite(){
    wx.navigateTo({
      url: '../../pages/site/site',
    })
  }
})