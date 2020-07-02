var util = require('../../../utils/util.js');
var app = getApp()
Page({
  data: {
    examlist: null,
    typelist: null,
    isSelect: false,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    currentTab2:1,
    userInfo: {},
    user: {},
    //还需要在线学习时长
    needTime: 0,
  },

  //我的
  enterUserCenter: function () {
    wx.navigateTo({
      url: '/pages/user/user/user'
    })
  },
  //首页
  goHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  onLoad: function () {
    var that = this;
    app.globalData.examtype = '0'
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        loginstatus: app.globalData.loginstatus,
        user: app.globalData.user
      })
    });
    util.showLoading();
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "list",
        telnum: app.globalData.user.telnum,
      },
      success: function (res) {
        if (!!res.data && res.data!='error'){
          that.setData({
            examlist: res.data.list,
            typelist: res.data.typelist,
            needTime: res.data.needTime,
          });
        }
        util.hideLoading();
      },
      fail: function (error) {
        util.showMsg('加载数据失败');
        util.hideLoading();
      }
    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange:function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 1){
      app.globalData.examtype = 1
    }else{
      app.globalData.examtype = 0
    }
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
    app.globalData.examtype = e.target.dataset.current;
    if (this.data.currentTab2 != e.target.dataset.current) {
      this.setData({
        currentTab2: e.target.dataset.current
      })
    }
  },
  //进入考试
  enterExam:function (event) {
    let times = event.currentTarget.dataset.times;
    let isexam = event.currentTarget.dataset.isexam;
    let examStart = event.currentTarget.dataset.start;
    let examEnd = event.currentTarget.dataset.end;
    let examType = event.currentTarget.dataset.type;
    let duration = event.currentTarget.dataset.duration;
    if(isexam==1){
      if(times!=null && times!="" && parseInt(times)>0){
        util.showMsg('已经考试过');
        return;
      }
      //如果是考试试题，需要判断是否在考试时间段内，用户是否可以考试
      if(examType!=app.globalData.user.examType){
        util.showMsg('非当日考试学员');
        return;
      }
      
      var dtStart = new Date(examStart);
      var dtEnd = new Date(examEnd);
      var now = new Date();
      if(now.getTime()<dtStart.getTime()){
        util.showMsg('未到考试时间');
        return;
      }
      if(now.getTime()>dtEnd.getTime()){
        util.showMsg('考试已结束');
        return;
      }

    }else{
      if(this.data.needTime){
        util.showMsg('请先在线学习');
        console.log('还需在线学习['+this.data.needTime+']分钟');
        return;
      }
    }
    this.startExam(event.currentTarget.dataset.id, event.currentTarget.dataset.name, 0,isexam,duration);
  },
  //进入考试
  enterTypeExam: function () {
    //带id跳转到指定的页面，这里的event.currentTarget.dataset.id是获取wxml页面上的data-id参数，详见事件说明
    var typeName = '';
    if (app.globalData.examtype==1){
      typeName="单选题";
    } else if (app.globalData.examtype == 2) {
      typeName= "多选题";
    } else if (app.globalData.examtype == 3) {
      typeName = "判断题";
    } else if (app.globalData.examtype == 4) {
      typeName = "案例分析";
    }
    
    this.startExam("type" + app.globalData.examtype, typeName, app.globalData.examtype);
  },
  startExam:function(examId,examName,examType,isexam,duration){  
    app.globalData.hId = this.guid();
    if(!duration){
      duration = 50;
    }
    app.globalData.total_micro_second = duration * 60 * 1000;
    var page = "test/test";
    if(isexam==1){
      page = "exam/exam";
    }
    wx.navigateTo({
      url: "/pages/exam/"+page+"?examId=" + examId + "&examName="+examName+"&examtype=" + examType,//url跳转地址
      success: function (res) {
      },
      fail: function (res) {
      }
    });
  },
  //产生一个uuid
  guid:function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
})