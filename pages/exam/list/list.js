// pages/examlist/examlist.js
var app = getApp()
var examtypeId = 'type01'
app.globalData.examtype = '1'
Page({
  data: {
    examlist: null,
    typelist: null,
    isSelect: false,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    currentTab2:1,
    userInfo: {},
    user: {}
  },
  isSelection() {
    this.setData({
      isChecked: true
    })
  },
  //我的
  enterUserCenter: function () {
    wx.navigateTo({
      url: '/pages/user/user/user'
    })
  },
  //首页
  goHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  onLoad: function () {
    var that = this;
    examtypeId = 'type01'
    app.globalData.examtype = '1'
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        loginstatus: app.globalData.loginstatus,
        user: app.globalData.user
      })
    })
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "list"
      },
      success: function (res) {
        console.log(res);
        that.setData({
          examlist: res.data.list,
          typelist: res.data.typelist
        });
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    }),
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange:function (e) {
    console.log(e)
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 1){
      examtypeId = 'type01'
      app.globalData.examtype = '1'
      that.setData({currentTab2 : '1'})
    }
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) { 
    var that = this; 
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //按类型选题
  isSelection: function (e) {
    app.globalData.examtype = e.target.dataset.current
    examtypeId = "type0" + e.target.dataset.current
    var that = this;
    if (this.data.currentTab2 === e.target.dataset.current) {
      return ;
    } else {
      that.setData({
        currentTab2: e.target.dataset.current
      })
    }
  },
  //进入考试
  enterExam:function (event) {
    console.log(event),
      //带id跳转到指定的页面，这里的event.currentTarget.dataset.id是获取wxml页面上的data-id参数，详见事件说明
    app.globalData.hId = this.guid();
      wx.navigateTo({
        url: "/pages/exam/exam/exam?examId=" + event.currentTarget.dataset.id + "&index=0&examtype=0",//url跳转地址
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })

  },
  //进入考试
  enterTypeExam: function () {
      //带id跳转到指定的页面，这里的event.currentTarget.dataset.id是获取wxml页面上的data-id参数，详见事件说明
      app.globalData.hId = this.guid();
    wx.navigateTo({
      url: "/pages/exam/exam/exam?examId=" + examtypeId + "&index=0&examtype=" + app.globalData.examtype,//url跳转地址
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //产生一个uuid
  guid:function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
})