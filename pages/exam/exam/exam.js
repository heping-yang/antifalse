// pages/exam/exam.js
var app = getApp();
var num = 0;
var examId = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //弹框
    modalShow:false,
    //全部题目
    layerStus: false,
    layerAnimation:{},
    question:null,
    activeIndex: 100
  },
  // 答题
  answerQuestion: function (e) { 
    console.log(e)
    this.setData({
      activeIndex: e.currentTarget.id
    });
    console.log(examId)
    console.log(num)
    wx.navigateTo({
      url: "/pages/exam/exam/exam?examId=" + examId + "&index=" + num,//url跳转地址
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  //查看全部题目
  showAll: function () {
    this.setData({
      layerStus: true
    })
    
  },
  //继续模拟
  testContinue: function () {
    this.setData({
      layerStus: false
    })

   


  },
  //交卷
  handIn: function () {
    wx.redirectTo({
      url: '../examreport/examreport',
    })
  },
  //休息
  rest:function(){
    this.setData({
      modalShow:true
    })
  },
  //继续考试
  testContuine:function(){
    this.setData({
      modalShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "queryNextQuestion",
        examId: options.examId,
        index: options.index
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          question: res.data
        });
        num = res.data.index
        examId = res.data.question[0].examId
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