// pages/user/userstatus/status.js
var app = getApp()
var loginCheck = require("../../../utils/loginCheck.js")
var timeFmt = require("../../../utils/timeFmt.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberStu:0,//会员1  非会员0
    stime:null,
    etime:null,
    userInfo: {},
    user:{},
    product: {}
  },
  enterExam: function () {
    if (loginCheck.check('/pages/exam/list/list')) {
      wx.navigateTo({
        url: '/pages/exam/list/list'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      let stime = "";
      if(!!app.globalData.user.effstart && !!app.globalData.user.effstart.time){
        stime = timeFmt.formatTime(app.globalData.user.effstart.time,'Y-M-D');
      }
      let ttime = "";
      if(!!app.globalData.user.effend && !!app.globalData.user.effend.time){
        etime = timeFmt.formatTime(app.globalData.user.effend.time, 'Y-M-D');
      }
      that.setData({
        userInfo: userInfo,
        user: app.globalData.user,
        stime: stime,
        etime: etime
      })
      if (that.data.user.userstatus>1){
        that.setData({
          memberStu: 1
        })
      }else{
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
              product: res.data.product
            });
          },
          fail: function (error) {
            console.log(error);
            that.setData({
              arr_res: '返回异常'
            })
          }
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
            wx.request({
              url: app.globalData.globalUrl + "/user",
              data: {
                method: "relogin",
                telnum: app.globalData.user.telnum
              },
              success: function (res) {
                if (app.globalData.user.userstatus != res.data.user.userstatus) {
                  app.globalData.user = res.data.user
                  return false
                }
              }
            })
            wx.reLaunch({
              url: '/pages/index/index'
            })
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