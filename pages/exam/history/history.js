// pages/history/history.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList: [
      {
        testtit: "2018宁夏反假币考试真题模拟一",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟三",
        testqus: "207",
        testsocre: "100"
      }, {
        testtit: "2018宁夏反假币考试真题模拟一",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟二",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟三",
        testqus: "207",
        testsocre: "100"
      }, {
        testtit: "2018宁夏反假币考试真题模拟一",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟二",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟888",
        testqus: "207",
        testsocre: "100"
      }
    ],
    historylist:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "queryHistoryList",
        telnum: app.globalData.user.telnum
      },
      success: function (res) {
        console.log(res);
        that.setData({
          historylist: res.data.list
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
  
  },
  //进入考试
  enterExam: function (e) {
      //带id跳转到指定的页面，这里的event.currentTarget.dataset.id是获取wxml页面上的data-id参数，详见事件说明
    app.globalData.total_micro_second = parseInt(e.currentTarget.dataset.item.surplustime);
    var item = e.currentTarget.dataset.item; 
    if (item.examType != '0'){
      app.globalData.examType = item.examType
    }
    wx.navigateTo({
      url: "/pages/exam/exam/exam?examId=" + item.examId + "&examName="+item.examName+"&index=" + (parseInt(item.indexnum) -  1) + "&examtype=" + parseInt(item.examType),//url跳转地址
      success: function (res) {
      },
      fail: function (res) {
      }
    })
  },
    //
  enterReport: function (e) {
    app.globalData.examtype = e.currentTarget.dataset.item.examType
    app.globalData.hId = e.currentTarget.dataset.item.hId
    wx.navigateTo({
      url: '/pages/exam/report/report',
    })
  },
})