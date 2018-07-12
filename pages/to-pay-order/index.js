//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    totalScoreToPay: 0,
    goodsList:[],
    isNeedLogistics:0, // 是否需要物流信息
    allGoodsPrice:0,
    yunPrice:0,
    allGoodsAndYunPrice:0,
    goodsJsonStr:"",
    orderType:"", //订单类型，购物车下单或立即支付下单，默认是购物车，

    hasNoCoupons: true,
    coupons: [],
    youhuijine:0, //优惠券金额
    curCoupon:null // 当前选择使用的优惠券
  },
  onShow : function () {
    var that = this;
    var buyNowInfoMem={};
    //立即购买下单
    if ("buyNow"==that.data.orderType){
      buyNowInfoMem = wx.getStorageSync('buyNowInfo');
     
    }else{
      //购物车下单
      var shopCarInfoMem = wx.getStorageSync('shopCarInfo');
      
    }
    that.setData({
      goodsList: [buyNowInfoMem],
    });
    that.initShippingAddress();
  },

  onLoad: function (e) {
    var that = this;
    //显示收货地址标识
    that.setData({
      isNeedLogistics: 1,
      orderType: e.orderType
    });
  },

  getDistrictId : function (obj, aaa){
    if (!obj) {
      return "";
    }
    if (!aaa) {
      return "";
    }
    return aaa;
  },

  createOrder:function (e) {
    wx.showLoading();
    var that = this;
    var loginToken = wx.getStorageSync('token') // 用户登录 token
    var remark = ""; // 备注信息
    if (e) {
      remark = e.detail.value.remark; // 备注信息
    }

    var postData = {
      token: loginToken,
      // goodsJsonStr: that.data.goodsJsonStr,
      productId: that.data.goodsList[0].id+"",
      remark: remark,
      pic: that.data.goodsList[0].pic,
      goodsName: that.data.goodsList[0].goodsName,
      price: that.data.goodsList[0].price,
      productCount: that.data.goodsList[0].productCount
    };
    //设置地址信息
    if (that.data.isNeedLogistics > 0) {
      if (!that.data.curAddressData) {
        wx.hideLoading();
        wx.showModal({
          title: '错误',
          content: '请先设置您的收货地址！',
          showCancel: false
        })
        return;
      }
      postData.placeOfReceiptId=that.data.curAddressData.id+""; //收货地址id
      // postData.area = that.data.curAddressData.area;
      // postData.city = that.data.curAddressData.city;
      // if (that.data.curAddressData.counties) {
      //   postData.counties = that.data.curAddressData.counties;
      // }
      // postData.address = that.data.curAddressData.address;
      // postData.linkMan = that.data.curAddressData.linkMan;
      // postData.mobile = that.data.curAddressData.mobile;
      // postData.code = that.data.curAddressData.code;
    }
    // if (that.data.curCoupon) {
    //   postData.couponId = that.data.curCoupon.id;
    // }
    if (!e) {
      postData.calculate = "true";
    }

    app.getHttpPostData(function (data) {
      wx.hideLoading();
      if (data.code != 1) {
        wx.showModal({
          title: '错误',
          content: data.msg,
          showCancel: false
        })
        return;
      }
      if (e && "buyNow" != that.data.orderType) {
        // 清空购物车数据
        wx.removeStorageSync('shopCarInfo');
      }
      wx.redirectTo({
        url: "/pages/order-list/index"
      });
    }, postData, '/order/save');

    // wx.request({
    //   url: 'https://api.it120.cc/'+ app.globalData.subDomain +'/order/create',
    //   method:'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: postData, // 设置请求的 参数
    //   success: (res) =>{
    //     wx.hideLoading();
    //     if (res.data.code != 0) {
    //       wx.showModal({
    //         title: '错误',
    //         content: res.data.msg,
    //         showCancel: false
    //       })
    //       return;
    //     }

    //     if (e && "buyNow" != that.data.orderType) {
    //       // 清空购物车数据
    //       wx.removeStorageSync('shopCarInfo');
    //     }
    //     if (!e) {
    //       that.setData({
    //         totalScoreToPay: res.data.data.score,
    //         isNeedLogistics: res.data.data.isNeedLogistics,
    //         allGoodsPrice: res.data.data.amountTotle,
    //         allGoodsAndYunPrice: res.data.data.amountLogistics + res.data.data.amountTotle,
    //         yunPrice: res.data.data.amountLogistics
    //       });
    //       that.getMyCoupons();
    //       return;
    //     }
    //     // 配置模板消息推送
    //     var postJsonString = {};
    //     postJsonString.keyword1 = { value: res.data.data.dateAdd, color: '#173177' }
    //     postJsonString.keyword2 = { value: res.data.data.amountReal + '元', color: '#173177' }
    //     postJsonString.keyword3 = { value: res.data.data.orderNumber, color: '#173177' }
    //     postJsonString.keyword4 = { value: '订单已关闭', color: '#173177' }
    //     postJsonString.keyword5 = { value: '您可以重新下单，请在30分钟内完成支付', color:'#173177'}
    //     app.sendTempleMsg(res.data.data.id, -1,
    //       'mGVFc31MYNMoR9Z-A9yeVVYLIVGphUVcK2-S2UdZHmg', e.detail.formId,
    //       'pages/index/index', JSON.stringify(postJsonString));
    //     postJsonString = {};
    //     postJsonString.keyword1 = { value: '您的订单已发货，请注意查收', color: '#173177' }
    //     postJsonString.keyword2 = { value: res.data.data.orderNumber, color: '#173177' }
    //     postJsonString.keyword3 = { value: res.data.data.dateAdd, color: '#173177' }
    //     app.sendTempleMsg(res.data.data.id, 2,
    //       'Arm2aS1rsklRuJSrfz-QVoyUzLVmU2vEMn_HgMxuegw', e.detail.formId,
    //       'pages/order-details/index?id=' + res.data.data.id, JSON.stringify(postJsonString));
    //     // 下单成功，跳转到订单管理界面
    //     wx.redirectTo({
    //       url: "/pages/order-list/index"
    //     });
    //   }
    // })
  },
  //初始化获取默认地址
  initShippingAddress: function () {
    var that = this;
    app.getHttpGetData(function (result) {
      console.log(result.place.id)
      if (result.code == 1) {
        console.log("result")
        that.setData({
          curAddressData: result.place
        });
      } else {
        that.setData({
          curAddressData: null
        });
      }
      that.processYunfei();
    }, null, '/place/defaultPlace');
  
  },
  processYunfei: function () {
    var that = this;
    var goodsList = this.data.goodsList;
    var goodsJsonStr = "[";
    var isNeedLogistics = 0;
    var allGoodsPrice = 0;

    for (let i = 0; i < goodsList.length; i++) {
      let carShopBean = goodsList[i];
      if (carShopBean) {
        isNeedLogistics = 1;
      }
      allGoodsPrice += carShopBean.price * carShopBean.productCount;

      var goodsJsonStrTmp = '';
      if (i > 0) {
        goodsJsonStrTmp = ",";
      }


    

      goodsJsonStrTmp += '"number":' + carShopBean.productCount +'}';
      goodsJsonStr += goodsJsonStrTmp;


    }
    that.data.allGoodsAndYunPrice = allGoodsPrice;
    goodsJsonStr += "]";
    that.setData({
      isNeedLogistics: isNeedLogistics,
      // goodsJsonStr: goodsJsonStr
    });
    that.createOrder();
  },
  addAddress: function () {
    wx.navigateTo({
      url:"/pages/address-add/index"
    })
  },
  selectAddress: function () {
    wx.navigateTo({
      url:"/pages/select-address/index"
    })
  },
  getMyCoupons: function () {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/' + app.globalData.subDomain + '/discounts/my',
      data: {
        token: wx.getStorageSync('token'),
        status:0
      },
      success: function (res) {
        if (res.data.code == 0) {
          var coupons = res.data.data.filter(entity => {
            return entity.moneyHreshold <= that.data.allGoodsAndYunPrice;
          });
          if (coupons.length > 0) {
            that.setData({
              hasNoCoupons: false,
              coupons: coupons
            });
          }
        }
      }
    })
  },
  bindChangeCoupon: function (e) {
    const selIndex = e.detail.value[0] - 1;
    if (selIndex == -1) {
      this.setData({
        youhuijine: 0,
        curCoupon:null
      });
      return;
    }
    //console.log("selIndex:" + selIndex);
    this.setData({
      youhuijine: this.data.coupons[selIndex].money,
      curCoupon: this.data.coupons[selIndex]
    });
  }
})
