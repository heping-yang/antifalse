//index.js
//获取应用实例
var app = getApp()
var loginCheck = require("../../utils/loginCheck.js")
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    user:{},
    loginstatus : 0
  },
  //请登录
  loginbind: function () {
    wx.navigateTo({
      url: '/pages/login/login/login'
    })
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
    if (loginCheck.check('/pages/exam/list/list')){
      wx.navigateTo({
        url: '/pages/exam/list/list'
      })
    }
  },
  //成为会员
  paybind: function() {
    if (loginCheck.check('/pages/user/pay/pay')) {
      wx.navigateTo({
        url: '/pages/user/pay/pay'
      })
    }
  },
  //成绩查询
  gradebind: function () {
    if (loginCheck.check('/pages/user/grade/grade')) {
      wx.navigateTo({
        url: '/pages/user/grade/grade'
      })
    }
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
        user: app.globalData.user,
        loginstatus: app.globalData.loginstatus
      })
    })
  },
  enterTap:function(){
    wx.navigateTo({
      url: '/pages/exam/list/list'
    })
  }
})
