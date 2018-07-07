//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    categories: [{ id: 0, name: "产品介绍" },{ id: 1, name: "公司介绍" }],
    tempName: "product",
    activeCategoryId:0
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
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
    
  }

  
 
})
