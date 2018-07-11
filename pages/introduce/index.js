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
  
  },
  onShow: function(){
    var that = this
    app.getHttpGetData(function (data) { 
      that.setData({
        'introduce.goodsIntroduce': data.goodsImages,
        'introduce.companyIntoduce': data.companyImages,
      })
    }, null, '/introduce/detail')
  }
 
})
