//index.js
//获取应用实例
import {
  url
} from '../../utils/util.js'
Page({
  data: {
    navH: 0, // 导航栏高度
    source: {},//分类数据源
    url,
    info: [{ "title": "热销推荐", "infos": ["猪肉", "白菜", "西兰花", "虾仁"] }, { "title": "蔬菜", "infos": ["西兰花", "西兰花", "西兰花", "西兰花", "西兰花", "西兰花", "西兰花", "西兰花", "西兰花", "西兰花", "西兰花"] }, { "title": "水果", "infos": ["苹果", "香蕉", "梨", "葡萄"] }, { "title": "肉蛋", "infos": ["猪肉", "虾仁", "鸡蛋", "咸鸭蛋"] }],//模拟数据
    tabId:0//设置右侧默认选中
  },
  onLoad(){
    this.request();
  },
  onShow(){

  },
  // => events
  handleNavSize(event) {
    let { navH } = event.detail;
    this.setData({
      navH
    })
  },
  handleClass(event){
    let tabid = event.target.dataset.id;
    this.setData({
      tabId:tabid
    })
  },
  request() {
    // 请求banner
    wx.request({
      url: `${url}/selectCommodityByClass?pageNumber=1&&pageSize=10`,
      success: res => {
        let newSource = res.data.data;
        let thisSource = [];
        console.log(newSource);
        Object.keys(newSource).forEach(function (key) {
          thisSource.push({
            "title":key,
            "infos":newSource[key].list
          })
        });
        this.setData({
          info: thisSource
        })
      }
    });
  },
  goDetails(event){
    let shoppingId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../details/details?commodityId=${shoppingId}`,
    })
  }
  // => methods 
});

// wx.getMenuButtonBoundingClientRect()
// wx.getSystemInfo()
