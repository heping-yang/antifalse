// pages/exam/exam.js
var app = getApp();
var num = 0;
var examId = "";
var standard = "";
var lastFlag = "";
var method = "queryNextQuestion";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //弹框
    modalShow:false,
    handInModalShow: false,
    lastmodalShow:false,
    isloaded:false,
    examtype:0,
    //全部题目
    layerStus: false,
    layerAnimation:{},
    question:null,
    answers:null,
    optionA: false,
    optionB: false,
    optionC: false,
    optionD: false,
    optionE: false,
    optionF: false,
    clock:''
  },
  changeOption:function(option){
    switch (option) {
      case 'A':
        this.setData({
          optionA : !this.data.optionA
        })
        break;
      case 'B':
        this.setData({
          optionB: !this.data.optionB
        })
        break;
      case 'C':
        this.setData({
          optionC: !this.data.optionC
        })
        break;
      case 'D':
        this.setData({
          optionD: !this.data.optionD
        })
        break;
      case 'E':
        this.setData({
          optionE: !this.data.optionE
        })
        break;
      case 'F':
        this.setData({
          optionF: !this.data.optionF
        })
        break;
    }
  },
  getOption: function (){
    var answsers = ""
    if (this.data.optionA){
      answsers += 'A'
    }
    if (this.data.optionB) {
      answsers += 'B'
    }
    if (this.data.optionC) {
      answsers += 'C'
    }
    if (this.data.optionD) {
      answsers += 'D'
    }
    if (this.data.optionE) {
      answsers += 'E'
    }
    if (this.data.optionF) {
      answsers += 'F'
    }
    return answsers
  },
  // 答题
  answerQuestion: function (e) {
    var that = this
    this.changeOption(e.currentTarget.dataset.option)
    //单选题和判断题
    if (that.data.question.question[0].type == 1 || that.data.question.question[0].type == 3){
      var user_result = "0"
      if (e.currentTarget.dataset.option == standard) {
        user_result = "1"
      }
      if (lastFlag == "1"){
        wx.reLaunch({
          url: "/pages/exam/exam/exam?examId=" + examId + "&index=" + num + "&userAnswer=" + e.currentTarget.dataset.option + "&userResult=" + user_result,//url跳转地址
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
            method: method,
            examId: examId,
            index: num,
            userResult: user_result,
            userAnswer: e.currentTarget.dataset.option,
            hId: app.globalData.hId,
            examtype: app.globalData.examtype,
            surplustime: app.globalData.total_micro_second
          },
          success: function (res) {
            stoptime()
            that.setData({
              lastmodalShow: true
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
    }
  },
  //多选提交
  submitbnt:function(){
    var that = this
    var user_result = "0"
    var tempAnswser = this.getOption()
    if (tempAnswser == standard) {
      user_result = "1"
    }
    if (lastFlag == "1") {
      wx.reLaunch({
        url: "/pages/exam/exam/exam?examId=" + examId + "&index=" + num + "&userAnswer=" + tempAnswser + "&userResult=" + user_result,//url跳转地址
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    } else {
      wx.request({
        url: app.globalData.globalUrl + "/exam",
        data: {
          method: method,
          examId: examId,
          index: num,
          userResult: user_result,
          userAnswer: tempAnswser,
          hId: app.globalData.hId,
          examtype: app.globalData.examtype,
          telnum: app.globalData.user.telnum,
          surplustime: app.globalData.total_micro_second
        },
        success: function (res) {
          stoptime()
          that.setData({
            lastmodalShow: true
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
  //上一题
  prebnt: function () {
    var that = this
    var user_result = "0"
    var tempAnswser = this.getOption()
    if (tempAnswser == standard) {
      user_result = "1"
    }
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: method,
        examId: examId,
        index: num,
        userResult: user_result,
        userAnswer: tempAnswser,
        hId: app.globalData.hId,
        examtype: app.globalData.examtype,
        surplustime: app.globalData.total_micro_second
      },
      success: function (res) {
        stoptime()
        that.setData({
          lastmodalShow: true
        })
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
    wx.reLaunch({
      url: "/pages/exam/exam/exam?examId=" + examId + "&index=" + (num - 2) + "&type=select",//url跳转地址
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
    stoptime()
    var that = this;
    that.setData({
      layerStus: true
    });
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "queryAnswers",
        hId: app.globalData.hId
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          answers: res.data.answers[0]
        });
        console.log(res.data.answers[0].answerRecord.data)
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
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
    count_down(this);
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
    stoptime()
    this.setData({
      modalShow:true
    })
  },
  //休息结束
  rested: function () {
    count_down(this);
    this.setData({
      modalShow: false,
      handInModalShow: false,
      lastmodalShow: false
    })
  },
  //返回首页
  home: function () {
    stoptime()
    this.setData({
      handInModalShow: true,
    })
  },
  //继续考试
  testContuine:function(){
    count_down(this);
    this.setData({
      modalShow: false,
      handInModalShow: false,
      lastmodalShow: false
    })
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
    count_down(this);
    console.log(options)
    console.log(options.examtype)
    var that = this;
    that.setData({ examtype: app.globalData.examtype })
    if (options.examtype != null && options.examtype != ''){
      console.log(options.examtype)
      if (options.examtype == 0){
        that.setData({ examtype: options.examtype})
        method = "queryNextQuestion"
        app.globalData.examtype = 0
      }else{
        that.setData({ examtype: options.examtype })
        method = "queryNextTypeQuestion"
        app.globalData.examtype = options.examtype
      }
    }
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: method,
        examId: options.examId,
        index: options.index,
        userResult: options.userResult,
        userAnswer: options.userAnswer,
        hId: app.globalData.hId,
        type: options.type,
        examtype: app.globalData.examtype,
        telnum: app.globalData.user.telnum,
        surplustime: app.globalData.total_micro_second
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          question: res.data,
          isloaded:true
        });
        standard = res.data.question[0].standard
        num = res.data.index
        examId = res.data.question[0].examId
        lastFlag = res.data.lastFlag
        that.getUserAnswer(res.data.userAnswer)
      },
      fail: function (error) {
        that.onLoad(options);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
  },
  //获取用户答案
  getUserAnswer: function (userAnswer) {
    if (userAnswer.indexOf('A') >= 0) {
      this.setData({
        optionA: true
      })
    }
    if (userAnswer.indexOf('B') >= 0) {
      this.setData({
        optionB: true
      })
    }
    if (userAnswer.indexOf('C') >= 0) {
      this.setData({
        optionC: true
      })
    }
    if (userAnswer.indexOf('D') >= 0) {
      this.setData({
        optionD: true
      })
    }
    if (userAnswer.indexOf('E') >= 0) {
      this.setData({
        optionE: true
      })
    }
    if (userAnswer.indexOf('F') >= 0) {
      this.setData({
        optionF: true
      })
    }
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
    stoptime();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    stoptime();
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

/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */

// 定义一个总毫秒数，以一分钟为例。TODO，传入一个时间点，转换成总毫秒数
var timer = null;
/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(app.globalData.total_micro_second)
  });

  if (app.globalData.total_micro_second <= 0) {
    that.setData({
      clock: "00:00"
    });
    // timeout则跳出递归
    return;
  }
  timer = setTimeout(function () {
    // 放在最后--
    app.globalData.total_micro_second -= 10;
    count_down(that);
  }, 10)
}

function stoptime() {
  clearTimeout(timer)
}

// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));

  return min + ":" + sec;
  // return hr + ":" + min + ":" + sec + " " + micro_sec;
}

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}