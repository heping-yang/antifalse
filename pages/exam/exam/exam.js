// pages/exam/exam.js
var app = getApp();
var num = 0;
var examId = "";
var standard = "";
var lastFlag = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //弹框
    modalShow:false,
    handInModalShow: false,
    //全部题目
    layerStus: false,
    layerAnimation:{},
    question:null,
    anwsers:null,
    activeIndex: 100
  },
  // 答题
  answerQuestion: function (e) { 
    var that = this;
    console.log(e)
    this.setData({
      activeIndex: e.currentTarget.id
    });
    var user_result = "0"
    if (e.currentTarget.dataset.option == standard) {
      user_result = "1"
    }
    if (lastFlag == "1"){
      wx.reLaunch({
        url: "/pages/exam/exam/exam?examId=" + examId + "&index=" + num + "&userAnwser=" + e.currentTarget.dataset.option + "&userResult=" + user_result,//url跳转地址
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }else{
      wx.request({
        url: app.globalData.globalUrl + "/exam",
        data: {
          method: "queryNextQuestion",
          examId: examId,
          index: num,
          userResult: user_result,
          userAnwser: e.currentTarget.dataset.option,
          hId: app.globalData.hId
        },
        success: function (res) {
          that.setData({
            modalShow: true
          })
        },
        fail: function (error) {
          console.log(error);
          that.setData({
            arr_res: '返回异常'
          })
        }
      })
    }
  },
  //查看全部题目
  showAll: function () {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "queryAnwsers",
        hId: app.globalData.hId
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          anwsers: res.data.anwsers[0]
        });
        console.log(res.data.anwsers[0].answerRecord.data)
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
    this.setData({
      layerStus: true
    })
  },
  //选择某一个题
  selectQuestion:function(e){
    console.log(e)
    wx.reLaunch({
      url: "/pages/exam/exam/exam?examId=" + examId + "&index=" + (e.currentTarget.dataset.index - 1) + "&type=select",//url跳转地址
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
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
      url: '/pages/exam/report/report',
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
        index: options.index,
        userResult: options.userResult,
        userAnwser: options.userAnwser,
        hId: app.globalData.hId,
        type: options.type
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          question: res.data
        });
        standard = res.data.question[0].standard
        num = res.data.index
        examId = res.data.question[0].examId
        lastFlag = res.data.lastFlag
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