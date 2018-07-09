//app.js
App({
  onLaunch: function () {
    var that = this;

    // 判断是否登录
    let token = wx.getStorageSync('token');
    console.log("token:" + token)
    if (!token) {
      that.goLoginPageTimeOut()
      return
    }
    
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
    version: "2.0",
    shareProfile: '百款精品商品，总有一款适合您' // 首页转发的时候话术
  }
})
