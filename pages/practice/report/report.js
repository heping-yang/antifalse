// pages/practice/report/report.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    report: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + "/practice",
      data: {
        method: "queryReport",
        hId: app.globalData.hId
      },
      success: function (res) {
        if (!!res.data) {
          var data = res.data;
          data.answerRecord = JSON.parse(data.answerRecord);
          that.setData({
            report: res.data
          });
        }
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
  },
  //查看全部答案
  allAnswer: function () {
    wx.navigateTo({
      url: '/pages/practice/analysis/analysis'
    })
  },
  //首页
  goHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
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

  }
})