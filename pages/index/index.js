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
  onLoad: function () {
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
      url: app.globalData.globalUrl,
      data: {
        'openid': 'oe7H80FPDvTYI7317jpD91UoCiSE',
        'total_free': '1'
      },
      success: function (res) {
        console.log("res=" + res);
        var count = res.data.indexOf("\r\n\r\n<!DOC");
        console.log("count=" + count);
        var str = res.data.substring(0, count);
        var js = JSON.parse(str);
        console.log("timeStamp=" + js.timeStamp);
        console.log("nonceStr=" + js.nonceStr);
        console.log("package=" + js.package);
        console.log("paySign=" + js.paySign);
        console.log("out_trade_no=" + js.out_trade_no);
        wx.requestPayment({
          'timeStamp': js.timeStamp,
          'nonceStr': js.nonceStr,
          'package': js.package,
          'signType': 'MD5',
          'paySign': js.paySign,
          success: function (res) {
            wx.showToast({ title: '完成' });
          }
        })
      }
    })
  },
  enterTap:function(){
    wx.navigateTo({
      url: '/pages/exam/list/list'
    })
  }
})
