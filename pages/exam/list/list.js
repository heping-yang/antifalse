// pages/examlist/examlist.js
var app = getApp()
Page({
  data: {
    examlist: null,
    isSelect: false,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    currentTab2:0
  },
  isSelection() {
    this.setData({
      isChecked: true
    })
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
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

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
  enterExam: function (event) {
    console.log(event),
      //带id跳转到指定的页面，这里的event.currentTarget.dataset.id是获取wxml页面上的data-id参数，详见事件说明
    app.globalData.hId = this.guid();
      wx.navigateTo({
      url: "/pages/exam/exam/exam?examId=" + event.currentTarget.dataset.id + "&index=0",//url跳转地址
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