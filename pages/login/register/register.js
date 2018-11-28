// pages/register/register.js
var telnum = ""
var password = ""
var smscode = ""
var bksmscode = ""
var repassword =""
var idcard = ""
var username = ""
var timer = null
var timecnt = 30
var util = require('../../../utils/util.js');
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //下一步面板
    nextStus: false,
    //下一步按钮
    nextbtnStus: false,
    // 完成注册按钮
    finishbtnStus:false,
    telinputStus:false,
    tipsText: "",
    telnum : "",
    password : "",
    smscode : "",
    repassword : "",
    codeText:"获取验证码"
  },
  //电话号码输入
  iptelnum: function (e) {
    telnum = e.detail.value
    this.setData({
      tipsText: ""
    })
  },
  //密码输入
  ippassword: function (e) {
    password = e.detail.value
    this.setData({
      tipsText: ""
    })
  },
  //验证码输入
  ipsmscode: function (e) {
    smscode = e.detail.value
    this.setData({
      tipsText: ""
    })
  },
  //确认密码输入
  iprepassword: function (e) {
    repassword = e.detail.value
    if (smscode.length == 6 && password.length >= 6 && repassword.length >= 6) {
      this.setData({
        nextbtnStus: true,
        tipsText: ""
      })
    }else{
      tipsText: "信息输入有误，请输入确认信息"
    }
  },
  //用户姓名输入
  ipusername: function (e) {
    username = e.detail.value
    console.log(username)
  },
  //身份证输入
  ipidcard: function (e) {
    idcard = e.detail.value
    this.setData({
      finishbtnStus: true
    })
  },
  // 下一步
  next:function(){
    var that = this
    if (password != repassword){
      this.setData({
        tipsText: "两次密码输入不一致"
      })
      return
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if (telnum.length != 11 && !myreg.test(telnum)) {
      this.setData({
        tipsText: "手机号码输入有误！"
      })
      return
    }
    if (smscode.length != 6 ||smscode != bksmscode) {
      this.setData({
        tipsText: "验证码输入错误"
      })
      return
    }
    util.showLoading();
    wx.request({
      url: app.globalData.globalUrl + "/user",
      data: {
        method: "userIsExist",
        telnum: telnum
      },
      success: function (res) {
        console.log(res);
        if (res.data.isExist == '0'){
          that.setData({
            nextStus: true
          })
        }else{
          that.setData({
            tipsText: "账号已存在"
          })
        }
        util.hideLoading();
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        });
        util.hideLoading();
      }
    })
  },
  //发送验证码
  getsmscode:function(){
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if (telnum.length == 11 && myreg.test(telnum)){
      if (that.data.codeText == '获取验证码') {
        that.setData({telinputStus:true})
        timer = setInterval(function () {
          if (timecnt <= 1) {
            console.log(timecnt)
            timecnt = 30;
            that.setData({
              codeText: "获取验证码"
            })
            clearInterval(timer);
          } else {
            timecnt--;
            that.setData({
              codeText: timecnt
            })
          }
        }, 1000);
        util.showMsg('消息已发送');
        wx.request({
          url: app.globalData.globalUrl + "/smsVerify",
          data: {
            method: "send",
            telnum: telnum
          },
          success: function (res) {
            console.log(res);
            bksmscode = res.data.smscode
          },
          fail: function (error) {
            console.log(error);
            that.setData({
              arr_res: '返回异常'
            })
          }
        })
      }
    }else{
      that.setData({
        tipsText: "请输入正确手机号码"
      })
    }
  },
  loginsubmit: function () {
    if(username.length == 0){
      console.log(username.length)
      this.setData({
        tipsText: "用户名不能为空"
      })
      return
    }
    if (idcard.length != 18){
      this.setData({
        tipsText: "身份证号输入有误"
      })
      return
    }
    util.showLoading();
    wx.request({
      url: app.globalData.globalUrl + "/user",
      data: {
        method: "register",
        telnum: telnum,
        password: password,
        openid: app.globalData.openid,
        username: username,
        idcard: idcard
      },
      success: function (res) {
        if (res.data.register == 'success'){
          app.globalData.user = res.data.user
          app.globalData.loginstatus = 1
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }, 800)
        }else{
          wx.showToast({
            title: '请稍后再试',
            icon: 'none',
            duration: 1000
          })
        }
        util.hideLoading();
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        });
        util.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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