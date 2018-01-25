// pages/scoreinquiry/scoreinquiry.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examResult:1 ,//0未通过 1通过
    userInfo:{},
    grade:null
  },
  //首页
  goHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
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
        userInfo: userInfo
      })
    })
    wx.request({
      url: app.globalData.globalUrl + "/user",
      data: {
        method: "queryGrade",
        idcard: app.globalData.user.idcard
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          grade:res.data.grade
        });
        if (res.data.grade == "无记录"){

        }else{
          if (res.data.grade == '通过'){
            that.setData({
              examResult: 1
            });
          }else{
            that.setData({
              examResult: 0
            });
          }
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