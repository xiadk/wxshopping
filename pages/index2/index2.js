var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    recommend:{},
    produsts:[{
      id:1,
      name:"智伴",
      salesCount:12,
      price:756,
      repertoryCount:200,
      imgUrl:"http://",
      updateTime:new Date
    }],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function(){
    let that = this
    var map={"count":1}
    //轮播图
    if (app.globalData.init.VIEWGAGER_IMG) {
      that.setData({
        imgUrls: app.globalData.init.VIEWGAGER_IMG
      })
    }
    wx.request({
      url: app.globalData.baseurl + "/product/recommend",
      data:JSON.stringify(map),
      method: "post",
      success: res => {
        that.setData({
          recommend: res.data
        })
      },fail: res=>{
        console.log(res)
      }
    })
    wx.request({
      url: app.globalData.baseurl+"/product/findProduct?updateTime="+new Date+"&row="+6,
      method:"get",
      success: res => {
        
        that.setData({
          produsts: res.data
        })
      }
    })
  },
  onShow: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({ 
        url: "/pages/authorize/index"
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //跳转到详情
  toDetailsTap: function (e) {
    var product = e.currentTarget.dataset.product
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id + "&product=" + JSON.stringify(product)
    })
  },
})