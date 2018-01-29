// pages/exambuy/exambuy.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalBg: false,
    modalCont:false,
    user:{},
    userInfo:{},
    product:{},
    count:0
  },
  modal_suc: function () {
    this.setData({
      modalBg: true,
      modalCont: true 
    })
  },
  modal_close:function(){
    this.setData({
      modalBg: false,
      modalCont: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        user: app.globalData.user
      })
      if (that.data.user.userstatus > 1) {
        wx.navigateTo({
          url: '/pages/user/status/status'
        })
      }
    })
    wx.request({
      url: app.globalData.globalUrl + "/user",
      data: {
        method: "queryProduct",
        idcard: that.data.user.idcard,
        userstatus: that.data.user.userstatus
      },
      success: function (res) {
        console.log(res);
        that.setData({
          product: res.data.product,
          count: res.data.count
        });
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
  },

  payment: function () {
    var that = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1500
    })
    wx.request({
      url: app.globalData.globalUrl + "/wsordersubmit",
      data: {
        method: "payOrder",
        openid: app.globalData.openid,
        productId: that.data.product.productId,
        productName: that.data.product.productName,
        orderId: this.guid(),
        phone: that.data.user.telnum,
        proddesc: that.data.product.productName,
        prodFee: '1'
      },
      success: function (res) {
        wx.hideToast();
        console.log(res);
        console.log("timeStamp=" + res.data.body.timeStamp);
        console.log("nonceStr=" + res.data.body.nonceStr);
        console.log("package=" + res.data.body.package);
        console.log("paySign=" + res.data.body.paySign);
        wx.requestPayment({
          'timeStamp': res.data.body.timeStamp,
          'nonceStr': res.data.body.nonceStr,
          'package': res.data.body.package,
          'signType': 'MD5',
          'paySign': res.data.body.paySign,
          success: function (res) {
            wx.showToast({ title: '完成' });
          }
        })
      }
    })
  },
  //产生一个uuid
  guid: function () {
    return 'xxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
  
  }
})