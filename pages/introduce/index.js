//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    categories: [{ id: 0, name: "产品介绍" },{ id: 1, name: "公司介绍" }],
    tempName: "product",
    activeCategoryId:0,
    introduce: {
      goodsIntroduce:[
      '../../images/zb_01.png',
      '../../images/zb_01.png'],
      companyIntoduce: [
        '../../images/zb_01.png']}
  },

  tabClick: function (e) {
    if (e.currentTarget.id==0) {
      this.setData({
        tempName: "product"
      });
    } else {
      this.setData({
        tempName: "company"
      });
    }
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
  },
  onLoad: function () {
    var that = this
    console.log(that.data.goodsIntroduce)
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
    //访问产品介绍和公司介绍
    var goods = 'introduce.goodsIntroduce';
    var company = 'introduce.companyIntoduce';
    if (app.globalData.init.GOODS_INTR){
      that.setData({
        [goods]: app.globalData.init.GOODS_INTR
      })
    }
    if (app.globalData.init.COMPANY_INTR) {
      that.setData({
        [company]: app.globalData.init.COMPANY_INTR
      })
    }
    
  }

  
 
})
