function wxpay(app, money, orderId, orderNumber, redirectUrl) {
  let remark = "在线充值";
  let nextAction = {};
  if (orderId != 0) {
    remark = "支付订单 ：" + orderId;
    nextAction = { type: 0, id: orderId };
  }
  app.getHttpPostData(function (data) {
    if (data.code == 1) {
      // 发起支付
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: 'prepay_id=' + data.package,
        signType: 'MD5',
        paySign: data.paySign,
        fail: function (aaa) {
          wx.showToast({ title: '支付失败:' + aaa })
        },
        success: function () {
          wx.showToast({ title: '支付成功' })
          wx.redirectTo({
            url: redirectUrl
          });
        }
      })
    } else {
      wx.showToast({ title: '服务器忙' + data.code})
    }
  }, {
      money: money,
      orderNumber: orderNumber,
      payName: "在线支付",
      orderId: orderId
    }, '/order/pay'); 
 
}

module.exports = {
  wxpay: wxpay
}
