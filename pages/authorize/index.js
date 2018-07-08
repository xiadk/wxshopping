// pages/authorize/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindGetUserInfo: function (e) { 
    if (!e.detail.userInfo){
      return;
    }
    wx.setStorageSync('userInfo', e.detail.userInfo)
    this.login(e.detail.userInfo);
  },
  login: function (userInfo) {
    let token = wx.getStorageSync('token');
    if (token) {
      // wx.request({
      //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/check-token',
      //   data: {
      //     token: token
      //   },
      //   success: function (res) {
      //     if (res.data.code != 0) {
      //       wx.removeStorageSync('token')
      //       that.login();
      //     } else {
      //       // 回到原来的地方放
      //       wx.navigateBack();
      //     }
      //   }
      // })
      return;
    }
    wx.login({
      success: function (res) {
        userInfo["code"]=res.code;
        app.getHttpPostData(function(result){
          console.log(result);
          if(result.code < 0){
            console.log(result.msg);
            return;
          }
          wx.setStorageSync("token", result.token);
          wx.navigateBack();
        }, userInfo,"/login/getToken"); 
          }
        })
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
            wx.request({
              url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/wxapp/register/complex',
              data: { code: code, encryptedData: encryptedData, iv: iv }, // 设置请求的 参数
              success: (res) => {
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
      }
    })
  }
})