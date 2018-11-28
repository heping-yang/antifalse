//index.js
//获取应用实例
var app = getApp()
var loginCheck = require("../../utils/loginCheck.js");
var util = require('../../utils/util.js');
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
  //平台公告
  announcementbind:function(){
    wx.navigateTo({
      url: '/pages/announcement/announcement'
    })
  },
  //模拟历史
  historybind: function () {
    if (loginCheck.check('/pages/user/grade/grade')) {
      wx.navigateTo({
        url: '/pages/exam/history/history'
      })
    }
  },
  //在线报名
  onlineRegbind: function () {
    util.showLoading();
    if (loginCheck.check('/pages/user/grade/grade')) {
      wx.request({
        url: app.globalData.globalUrl + "/apply",
        data: {
          method: "queryApplyStatus",
          idcard:this.data.user.idcard
        },
        success: function (res) {
          console.log(res);
          if (res.data.status == '0'){
            wx.navigateTo({
              url: '/pages/apply/applyonline/applyonline'
            })
          } else if (res.data.status == '6'){
            wx.showModal({
              title: '提示',
              content: '恭喜您，已通过考试，请点击确认跳转成绩查询页面！',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/user/grade/grade'
                  })
                } 
              }
            })
          }else{
            wx.navigateTo({
              url: '/pages/apply/applyaudit/applyaudit'
            })
          }
          util.hideLoading();
        },
        fail: function (error) {
          console.log(error);
          that.setData({
            arr_res: '返回异常'
          });
          util.hideLoading();
        }
      })

    }
  },
  //在线学习
  studyOnlinebind: function() {
    if (loginCheck.check('/pages/user/grade/grade')) {
      wx.navigateTo({
        url: '/pages/onlinestudy/onlinestudy'
      })
    }
  },
  //问卷调查
  questionnairebind: function () {
    wx.navigateTo({
      url: '/pages/questionnaire/questionnaire'
    })
  },
  //联系我们
  goCantact: function() {
    wx.navigateTo({
      url: '/pages/user/about/about'
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
