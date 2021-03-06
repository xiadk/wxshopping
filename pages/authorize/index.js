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
      console.log(token+"==============");
      return;
    }
    wx.login({ 
      success: function (res) {
        userInfo["code"]=res.code
        console.log(">>>>>>>>>>>>"+res.code)
        app.getHttpPostData(function(result){
          console.log(result);
          if(result.code < 0){
            console.log(result.msg);
            return;
          }
          app.globalData.token = result.token;
          wx.setStorageSync("token", result.token);
          wx.navigateBack();
        }, userInfo,"/login/getToken"); 
       }
    })
  
  },
})