var app = getApp()
Page({
  data: {
    statusType: ["待发货", "待收货", "待评价", "已完成"],
    status: ['AWAIT_SEND', 'AWAIT_RECEIVE', 'AWAIT_REMARK', 'FINISH'],
    currentType: 0,
    tabClass: ["", "", "", "", ""]
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
  },
  orderDetail: function (e) {
    var orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/order-details/index?id=" + orderId +"&dealType=dealwith"
    })
  },
 

  onShow: function () {
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
      console.log("result:" + result)
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

      }
    }, postData, '/order/businessOrders');


  },
  
})
