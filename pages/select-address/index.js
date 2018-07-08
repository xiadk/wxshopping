//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    addressList: [{ 
      isDefault:true,
      id:1,
      linkMan:'曾建海',
      mobile:150000595,
      address:"江西丰城"
    },{
      isDefault: true,
      id: 2,
      linkMan: 'dk',
      mobile: 150000595,
      address: "江西广丰"
    }]
  },

  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.baseurl +'/place/save',
      method: 'post',
      data: {
        token: wx.getStorageSync('token'),
        id:id,
        isDefault:true
      },
      success: (res) =>{
        wx.navigateBack({})
      }
    })
  },

  addAddess : function () {
    wx.navigateTo({
      url:"/pages/address-add/index"
    })
  },
  
  editAddess: function (e) {
    wx.navigateTo({
      url: "/pages/address-add/index?id=" + e.currentTarget.dataset.id
    })
  },
  
  onLoad: function () {
    console.log('onLoad')

   
  },
  onShow : function () {
    this.initShippingAddress();
  },
  initShippingAddress: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseurl + '/place/findAllPlace',
      method: 'post',
      data: {
        token: wx.getStorageSync('token')
      },
      success: (res) =>{
        console.log(res.data)
        
      }
    })
  }

})
