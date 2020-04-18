// pages/user/user.js
var app = getApp();
var loginCheck = require("../../../utils/loginCheck.js");
var util = require("../../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginstatus:0,//1登录状态 0未登录
    userInfo:{},
    user:{},
    weixinAuth:0,
    SDKVersion:'0',
  },
  loginbind:function(){
    wx.navigateTo({
      url: '/pages/login/login/login'
    })
  },
  //底部菜单
  //首页
  goHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  //在线模拟
  enterExam: function () {
    if (loginCheck.check('/pages/exam/list/list')) {
      wx.navigateTo({
        url: '/pages/exam/list/list'
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
  //会员状态
  memberStatus: function () {
    if (loginCheck.check('/pages/user/status/status')) {
      wx.navigateTo({
        url: '/pages/user/status/status'
      })
    }
  },
  //关于我们
  abouttap: function () {
      wx.navigateTo({
        url: '/pages/user/about/about'
      })
  },
  //成长记录
  studyTime: function(){
      wx.navigateTo({
        url: '/pages/user/studytime/studytime',
      })
  },
  //练习历史
  practiceHistory: function(){
      wx.navigateTo({
        url: '/pages/practice/history/history',
      })
  },
  loginout:function(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确认退出您的账号?',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            loginstatus: 0
          })
          app.globalData.loginstatus = 0;
          app.globalData.user = null;
          wx.removeStorage({
            key: 'user',
            success: function(res) {},
          });
          wx.reLaunch({
            url: '/pages/index/index'
          })
        } 
      }
    })  
  },
  getuser:function(){
    var that = this;
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        app.globalData.userInfo = res.userInfo;
        util.showMsg("授权成功");
      },
      fail:function(){
        util.showMsg("您放弃了授权");
      }
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
        userInfo: userInfo||{},
        loginstatus: app.globalData.loginstatus,
        user: app.globalData.user,
        weixinAuth: userInfo==null?0:1,
        SDKVersion: app.globalData.SDKVersion,
      })
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