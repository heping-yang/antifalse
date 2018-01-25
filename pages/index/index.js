//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    user:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //底部菜单跳转
  //在线模拟
  enterExam: function () {
    wx.navigateTo({
      url: '/pages/exam/list/list'
    })
  },
  //成为会员
  paybind: function() {
    wx.navigateTo({
      url: '/pages/user/pay/pay'
    })
  },
  //成绩查询
  gradebind: function () {
    wx.navigateTo({
      url: '/pages/user/grade/grade'
    })
  },
  announcementbind:function(){
    wx.navigateTo({
      url: '/pages/announcement/announcement'
    })
  },
  //底部菜单
  //我的
  enterUserCenter: function () {
    wx.navigateTo({
      url: '/pages/user/user/user'
    })
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        user: app.globalData.user
      })
    })
  },
  enterTap:function(){
    wx.navigateTo({
      url: '/pages/exam/list/list'
    })
  }
})
