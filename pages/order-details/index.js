var app = getApp();
Page({
    data:{
      orderId:0,
        goodsList:[],
        yunPrice:"0.00"
    },
    onLoad:function(e){
      var orderId = e.id;
      this.data.orderId = orderId;
      this.setData({
        orderId: orderId
      });
    },
    onShow : function () {
      var that = this;
      // wx.request({
      //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/order/detail',
      //   data: {
      //     token: wx.getStorageSync('token'),
      //     id: that.data.orderId
      //   },
      //   success: (res) => {
      //     wx.hideLoading();
      //     if (res.data.code != 0) {
      //       wx.showModal({
      //         title: '错误',
      //         content: res.data.msg,
      //         showCancel: false
      //       })
      //       return;
      //     }
      //     that.setData({
      //       orderDetail: res.data.data
      //     });
      //   }
      // })
      var goods={
        goodsName: "智班",
        price: 399,
        productCount: 2,
        img: "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
      }
     
      var orderList={
        updateTime:"2018-07-07",
        status:2,
        statusValue:"待收货",
        id:1,
        orderNumber:"0707",
        remark:"鸟",
        score:0,
        amountReal:50,
        pic:"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        goodsName:"智班",
        price: goods.price * goods.productCount,
        oldPlace:499,
        productCount:2}
      var logistics={
        trackingNumber:238723783,
        linkMan:"zlh",
        mobile:1507970403,
        address:"234234北京局"
      }
 
     
     
      var orderDetail = {
        orderInfo: orderList,
        goods: [goods],
        place: {},
        logistics:logistics
      }
     

      app.getHttpGetData(function (result) {
        wx.hideLoading();
        if (result==null) {
          wx.showModal({
            title: '错误',
            content: "result.msg",
            showCancel: false
          })
          return;
        }
        console.log(result)
        goods = {
          goodsName: result.order.goodsName,
          price: result.order.price,
          productCount: result.order.productCount,
          img: result.order.pic,
        }
        orderDetail = {
          orderInfo: result.order,
          goods: [goods],
          place: result.place,
          logistics: result.logistics
        }
        that.setData({
          orderDetail: orderDetail
        });
      }, { id: that.data.orderId}, '/order/orderDetails'); 

      var yunPrice = parseFloat(this.data.yunPrice);
      var allprice = 0;
      var goodsList = this.data.goodsList;
      for (var i = 0; i < goodsList.length; i++) {
        allprice += parseFloat(goodsList[0].price) * goodsList[0].number;
      }
      this.setData({
        allGoodsPrice: allprice,
        yunPrice: yunPrice
      });
    },
    wuliuDetailsTap:function(e){
      var orderId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "/pages/wuliu/index?id=" + orderId
      })
    },
    confirmBtnTap:function(e){
      let that = this;
      let orderId = this.data.orderId;
      wx.showModal({
          title: '确认您已收到商品？',
          content: '',
          success: function(res) {
            if (res.confirm) {
              wx.showLoading();
              app.getHttpGetData(function (result) {
                if (result.code == 1) {
                  that.onShow();
                }
              }, { id: orderId, statusType: "AWAIT_REMARK" }, '/order/updateStatus');
             
            }
          }
      })
    },
    submitReputation: function (e) {
      let that = this;
    
      let postJsonString = {};
      postJsonString.token = wx.getStorageSync('token');
      postJsonString.orderId = that.data.orderId;
      // let reputations = [];
      // let i = 0;
      // while (e.detail.value["orderGoodsId" + i]) {
      //   let orderGoodsId = e.detail.value["orderGoodsId" + i];
      //   let goodReputation = e.detail.value["goodReputation" + i];
      //   let goodReputationRemark = e.detail.value["goodReputationRemark" + i];

      //   let reputations_json = {};
      //   reputations_json.id = orderGoodsId;
      //   reputations_json.reputation = goodReputation;
      //   reputations_json.remark = goodReputationRemark;

      //   reputations.push(reputations_json);
      //   i++;
      // }
      // postJsonString.reputations = reputations;
      postJsonString.reputation = e.detail.value["goodReputation0"];
      postJsonString.remark = e.detail.value["goodReputationRemark0"];
      console.log(postJsonString)
      
      var flag = false;
      //评论完成
      
      
      //添加评论
      wx.showModal({
        title: '确认您已收到商品？',
        content: '',
        success: function (res) {
          if (res.confirm) {
            wx.showLoading();
            app.getHttpGetData(function (result) {
              if (result.code == 1) {
                flag = true
              }
            }, { id: that.data.orderId, statusType: "FINISH" }, '/order/updateStatus');

            app.getHttpPostData(function (result) {
              wx.hideLoading();
              if (result.code == 1 && flag) {
                that.onShow();
              }
            }, postJsonString, '/order/reputation');
          }
        }
      })
      
    }
})