var wxpay = require('../../utils/pay.js')
var app = getApp()
Page({
  data:{
    statusType: ["待付款", "待发货", "待收货", "待评价", "已完成"],
    status: ['AWAIT_PAY', 'AWAIT_SEND', 'AWAIT_RECEIVE', 'AWAIT_REMARK','FINISH'],
    currentType:0,
    tabClass: ["", "", "", "", ""]
  },
  statusTap:function(e){
     var curType =  e.currentTarget.dataset.index;
     this.data.currentType = curType
     this.setData({
       currentType:curType
     });
     this.onShow();
  },
  orderDetail : function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId
    })
  },
  cancelOrderTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
     wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success: function(res) {
        if (res.confirm) {
          wx.showLoading();
          app.getHttpGetData(function (result) {
            wx.hideLoading();
            if (result.code == 1) {
              that.onShow();
            }
          }, { id: orderId, statusType:"CLOSE"}, '/order/updateStatus'); 
          
        }
      }
    })
  },
  toPayTap:function(e){
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var money = e.currentTarget.dataset.money;
    var needScore = e.currentTarget.dataset.score;
    var orderNumber = that.data.orderList[0].orderNumber;
    wxpay.wxpay(app, money, orderId, orderNumber, "/pages/order-list/index");
    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/amount',
    //   data: {
    //     token: wx.getStorageSync('token')
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       // res.data.data.balance
    //       money = money - res.data.data.balance;
    //       if (res.data.data.score < needScore) {
    //         wx.showModal({
    //           title: '错误',
    //           content: '您的积分不足，无法支付',
    //           showCancel: false
    //         })
    //         return;
    //       }
    //       if (money <= 0) {
    //         // 直接使用余额支付
    //         wx.request({
    //           url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/pay',
    //           method:'POST',
    //           header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //           },
    //           data: {
    //             token: wx.getStorageSync('token'),
    //             orderId: orderId
    //           },
    //           success: function (res2) {
    //             that.onShow();
    //           }
    //         })
    //       } else {
    //         //付款
    //         var orderNumber = that.data.orderList[0].orderNumber;
    //         wxpay.wxpay(app, money, orderId, orderNumber, "/pages/order-list/index");
    //       }
    //     } else {
    //       wx.showModal({
    //         title: '错误',
    //         content: '无法获取用户资金信息',
    //         showCancel: false
    //       })
    //     }
    //   }
    // })    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
   
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
 
  },
  
  onShow:function(){
    // 获取订单列表
    wx.showLoading();
    var that = this;
    var postData = {
      token: wx.getStorageSync('token')
    };
    //选择订单状态
    postData.statusType = that.data.status[that.data.currentType];
    console.log("postData.status:" + postData.statusType)
    
   //订单状态
    app.getHttpGetData(function (result) {
      wx.hideLoading();
      if (result.code == 0) {
        console.log(result.orders)
        that.setData({
          orderList: result.orders
        });
      } else {
        that.setData({
          orderList: null
        });
        console.log(that.data.orderList)
      }
    }, postData, '/order/findOrders'); 
    
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
 
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
   
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  
  }
})
