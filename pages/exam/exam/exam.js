var app = getApp();
var util = require('../../../utils/util.js');
var clearFlag = false;
var examId = "";
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
    answerCnt:0,
    noAnswerCnt:0,
    optionA: false,
    optionB: false,
    optionC: false,
    optionD: false,
    optionE: false,
    optionF: false,
    clock:'',

    pageNo:0,
    questions:[],
    questionIndex:0,
    total:0,
    userAnswer:{},
    examId:'',
    examName:'',
  },
  changeOption: function (type ,option){
    var data = {};
    if (type == 1 || type == 3) {
      data.optionA = false;
      data.optionB = false;
      data.optionC = false;
      data.optionD = false;
      data.optionE = false;
      data.optionF = false;
    }
    switch (option) {
      case 'A':
        data.optionA = !this.data.optionA
        break;
      case 'B':
        data.optionB = !this.data.optionB;
        break;
      case 'C':
        data.optionC = !this.data.optionC;
        break;
      case 'D':
        data.optionD = !this.data.optionD;
        break;
      case 'E':
        data.optionE = !this.data.optionE;
        break;
      case 'F':
        data.optionF = !this.data.optionF;
        break;
    }
    this.setData(data);
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
  chooseAnswer: function (e) {
    var that = this;
    var type = that.data.questions[this.data.questionIndex].type;
    this.changeOption(type,e.currentTarget.dataset.option);
    //单选题和判断题
    if (type == 1 || type == 3){
      //进入下一题
      this.nextQuestion();
    }
  },
  //查看全部题目
  showAll: function () {
    stoptime();
    var data = this.data.userAnswer;
    this.setData({
      layerStus: true,
      userAnswer:data,
    });
  },
  //选择某一个题
  selectQuestion:function(e){
    var data1 = { questionIndex: e.currentTarget.dataset.index, layerStus:false, };
    var data2 = this.setUserAnswer(this.data.userAnswer[this.data.questions[e.currentTarget.dataset.index]['questionId']],true);
    var data3 = Object.assign(data1,data2);
    this.setData(data3);
    count_down(this);
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
    //保存当前问题的答案
    var option = this.getOption();
    if (!!option) {
      this.data.userAnswer[this.data.questions[this.data.questionIndex]['questionId']] = option;
    }
    //提交答案
    var that = this;
    var results = [];
    var indexnum = 0;
    var totalscore = 0;
    var rightCnt = 0;
    var wrongCnt = 0;
    for(var i=0;i<this.data.questions.length;i++){
      var item = this.data.questions[i];
      var answer = this.data.userAnswer[item.questionId];
      var result = 0;
      
      if (typeof(answer)=='undefined' || answer==null){
        answer = '';
      }
      var standard = item.standard;
      if (item.type == '3') {
        standard = "T" == standard ? "A" : "B";
      }
      if (answer == standard) {
        result = 1;
        totalscore += 1;
        rightCnt++;
      } else {
        wrongCnt++;
      }
      var json = { type: item.type, questionId: item.questionId, answer: answer, result: result, index: parseInt(item.questionId.substring(3)) };
      results.push(json);
      indexnum = item.index;
    }
    var answerRecord = {};
    answerRecord.data = results;
    answerRecord.rightCnt = rightCnt;
    answerRecord.wrongCnt = wrongCnt;

    util.showLoading();
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        method: "saveAnswer",
        telnum: app.globalData.user.telnum,
        examId: this.data.examId,
        examName:this.data.examName,
        examType: this.data.examtype,
        indexnum: indexnum,
        totalscore: totalscore,
        surplustime: app.globalData.total_micro_second,
        usedtime: date_format(50 * 60 * 1000 - app.globalData.total_micro_second),
        answerRecord: JSON.stringify(answerRecord),
      }, 
      success: function (res) {
        util.hideLoading();
        if(res.data=="error"){
          util.showMsg('上传数据失败');
        }else{
          //清空记录
          wx.removeStorageSync(that.data.examId);
          clearFlag = true;
          app.globalData.hId = res.data;
          wx.redirectTo({
            url: '/pages/exam/report/report',
          });
        }
      },
      fail: function (error) {
        util.hideLoading();
        util.showMsg('交卷失败');
      }
    });
   
  },
  //休息
  rest:function(){
    stoptime();
    var answerCnt = Object.getOwnPropertyNames(this.data.userAnswer).length;
    this.setData({
      modalShow: true,
      answerCnt:answerCnt,
      noAnswerCnt:this.data.total-answerCnt,
    });
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
    stoptime();
    var answerCnt = Object.getOwnPropertyNames(this.data.userAnswer).length;
    this.setData({
      handInModalShow: true,
      answerCnt: answerCnt,
      noAnswerCnt: this.data.total - answerCnt,
    });
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
  nextQuestion:function(){
      var index = this.data.questionIndex;
      //保存当前问题的答案
      var option = this.getOption();
      if(!!option){
        this.data.userAnswer[this.data.questions[index]['questionId']] = option;
      }
      if(index>=this.data.questions.length-1){
        util.showMsg('已经是最后一题了');
        return;
      }
      
      index++; 
      this.setData({"questionIndex":index});
    this.setUserAnswer(this.data.userAnswer[this.data.questions[index]['questionId']]);
  },
  preQuestion:function(){
    var index = this.data.questionIndex;
    var option = this.getOption();
    if (!!option) {
    //保存当前问题的答案
      this.data.userAnswer[this.data.questions[index]['questionId']] = option;
    }
    if (index <= 0) {
      util.showMsg('已经是第一题了');
      return;
    }
    index--;
    this.setData({ "questionIndex": index });
    this.setUserAnswer(this.data.userAnswer[this.data.questions[index]['questionId']]);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    count_down(this);
    var that = this;
    util.showLoading();
    //加载缓存答案
    var us = wx.getStorageSync(options.examId)||{};
    if (options.examtype != null && options.examtype != '') {
      app.globalData.examtype = parseInt(options.examtype);
    }
    this.data.examId = options.examId;
    this.data.examName = options.examName;
    this.data.examtype = app.globalData.examtype;
    this.data.userAnswer = us;
    this.data.questionIndex = options.index||0;

    //加载题目列表
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "queryQuestions",
        examId: options.examId,
        pageNo: 0,
        examType: app.globalData.examtype,
      },
      success: function (res) {
        var data1 = {
          questions: res.data.questions,
          pageNo: that.data.pageNo + 1,
          questionIndex: 0,
          total: res.data.total,
          isloaded: true,
        };
        var data2 = (!!res.data.questions && res.data.questions.length > 0) ? that.setUserAnswer(us[res.data.questions[that.data.questionIndex]['questionId']], true):{};
        var data3 = Object.assign(data1,data2);
        that.setData(data3);
        util.hideLoading();
      },
      fail: function (error) {
        util.hideLoading();
        util.showMsg('加载题目失败');
      }
    })
  },
  //设置用户答案
  setUserAnswer: function (userAnswer,needRet=false) {
    var data = { optionA: false, optionB: false, optionC: false, optionD: false, optionE: false, optionF:false};
    if(!!userAnswer){
      if (userAnswer.indexOf('A') >= 0) {
        data.optionA = true;
      }
      if (userAnswer.indexOf('B') >= 0) {
        data.optionB = true;
      }
      if (userAnswer.indexOf('C') >= 0) {
        data.optionC = true;
      }
      if (userAnswer.indexOf('D') >= 0) {
        data.optionD = true;
      }
      if (userAnswer.indexOf('E') >= 0) {
        data.optionE = true;
      }
      if (userAnswer.indexOf('F') >= 0) {
        data.optionF = true;
      }
    }
    if (needRet){
      return data;
    }else{
      this.setData(data);
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
    if (!clearFlag){
      //保存当前答案信息
      wx.setStorage({
        key: this.data.examId,
        data: this.data.userAnswer,
      });
      console.log("保存当前答题数据");
    }
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
    app.globalData.total_micro_second -= 1000;
    count_down(that);
  }, 1000)
  
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