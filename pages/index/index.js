//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  payment:function(){
    wx.request({
      url: app.globalData.globalUrl + "/wsordersubmit",
      data: {
        method: "payOrder",
        openid: app.globalData.openid,
        productId: 'pro01',
        productName:'365',
        orderId: this.guid(),
        phone:'18888888888',
        proddesc:'365',
        prodFee: '1'
      },
      success: function (res) {
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
  enterTap:function(){
    wx.navigateTo({
      url: '/pages/exam/list/list'
    })
  }
})
