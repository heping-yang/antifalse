var util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    practiceList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    util.showLoading();
    wx.request({
      url: app.globalData.globalUrl + "/practice",
      data: {
        method: "practiceList",
        userType: app.globalData.user.usertype,
      },
      success: function (res) {
        that.setData({
          practiceList: res.data.dataList
        });
        util.hideLoading();
      },
      fail: function (error) {
        util.showMsg('加载数据失败');
        util.hideLoading();
      }
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

  },

  enterPrictice:function(event){
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    let type = event.currentTarget.dataset.type;

    wx.navigateTo({
      url: "/pages/practice/practice/practice?id=" + id + "&name=" + name+"&type="+type,
      success: function (res) {
      },
      fail: function (res) {
      }
    });
  },
})