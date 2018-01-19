// pages/examlist/examlist.js
var app = getApp()
Page({
  data: {
    examlist: null,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    currentTab2:0
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "list"
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          examlist: res.data.list
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
  //进入考试
  enterExam: function (event) {
    console.log(event)
      wx.navigateTo({
        url: "/pages/announcement/webview/webview?index=" + event.currentTarget.dataset.id,//url跳转地址
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
  }
}) 