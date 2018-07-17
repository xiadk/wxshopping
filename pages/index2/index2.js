var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    recommend: {
      id: 1,
      name: "智伴",
      salesCount: 12,
      price: 756,
      repertoryCount: 200,
      imgUrl: "http://",
      updateTime: new Date},
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
    app.getHttpGetData(function (data) {
      that.setData({
        imgUrls:data.images,
        recommend: data.recommendProduct,
        produsts: data.sellingProduct
      }) 
      console.log(data);
    }, null, '/home/viewpager')
  },
  onShow: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    console.log(wx.getStorageSync('token'))
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
      url: "/pages/goods-details/index?product=" + JSON.stringify(product)
    })
  },
})