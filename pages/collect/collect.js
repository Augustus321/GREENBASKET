// pages/collect/collect.js
import {
  url
} from "../../utils/util.js"
const app = getApp();
Page({
  data:{
    usersId:'',
    collectAll:[],
    isdel: true,
  },
  onShow(){
    this.setData({
      collectAll: app.globalData.collectAll
    }) 
  },
  ndel(){
    let de = !this.data.isdel
    this.setData({
      isdel:de
    })
  }
})