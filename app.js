//app.js
App({
  onLaunch: function () {
    var that = this;
    // var obj = {"uid":"1"};
    // this.getHttpPostData(function(data){
    //   console.log(data);
    // },obj,"/login/test");
    // 判断是否登录
    let token = wx.getStorageSync('token');
    if (!token) {
      that.goLoginPageTimeOut()
      return
    }
    wx.request({
      url: 'https://api.it120.cc/' + that.globalData.subDomain + '/user/check-token',
      data: {
        token: token
      },
      success: function (res) {
        if (res.data.code != 0) {
          wx.removeStorageSync('token')
          that.goLoginPageTimeOut()
        }
      }
    })
  },
   /**
   * cb:回调函数
   * obj:参数
   * url:请求地址
   */
  getHttpGetData:function(cb,data,url){
    var that = this;
    wx.request({
      url: that.globalData.baseurl+url,
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': that.globalData.token == null ? "" : that.globalData.token
      },
      data:data,
      success: function (res) {
        cb(res.data)
      }
    })
  },
  /**
   * cb:回调函数
   * obj:参数
   * url:请求地址
   */
  getHttpPostData: function (cb,data,url) { 
    var that = this;
    wx.request({
      url: that.globalData.baseurl+url, 
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
        'token': that.globalData.token == null ? "" : that.globalData.token
      },
      data:data,
      success: function (res) { 
        cb(res.data)
      }
    })
  },
  sendTempleMsg: function (orderId, trigger, template_id, form_id, page, postJsonString){
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        type:0,
        module:'order',
        business_id: orderId,
        trigger: trigger,
        template_id: template_id,
        form_id: form_id,
        url:page,
        postJsonString: postJsonString
      },
      success: (res) => {
        //console.log('*********************');
        //console.log(res.data);
        //console.log('*********************');
      }
    })
  },
  sendTempleMsgImmediately: function (template_id, form_id, page, postJsonString) {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        type: 0,
        module: 'immediately',
        template_id: template_id,
        form_id: form_id,
        url: page,
        postJsonString: postJsonString
      },
      success: (res) => {
        console.log(res.data);
      }
    })
  },  
  goLoginPageTimeOut: function () {
    setTimeout(function(){
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)    
  },
  globalData:{
    baseurl:"http://localhost:9000/ZIBShopping",
    userInfo:null,
    token: wx.getStorageSync('token'),
    subDomain: "tz", // 如果你的域名是： https://api.it120.cc/abcd 那么这里只要填写 abcd
    version: "2.0",
    shareProfile: '百款精品商品，总有一款适合您' // 首页转发的时候话术
  }
  /*
  根据自己需要修改下单时候的模板消息内容设置，可增加关闭订单、收货时候模板消息提醒；
  1、/pages/to-pay-order/index.js 中已添加关闭订单、商家发货后提醒消费者；
  2、/pages/order-details/index.js 中已添加用户确认收货后提供用户参与评价；评价后提醒消费者好评奖励积分已到账；
  3、请自行修改上面几处的模板消息ID，参数为您自己的变量设置即可。  
   */
})
