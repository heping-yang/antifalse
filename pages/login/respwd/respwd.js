// pages/resetpassword/resetpassword.js
var telnum = ""
var password = ""
var smscode = ""
var bksmscode = ""
var repassword = ""
var timer = null
var timecnt = 30
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnStus:false,
    telinputStus: false,
    tipsText: "",
    telnum: "",
    password: "",
    smscode: "",
    repassword: "",
    codeText: "获取验证码"
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
        btnStus: true,
        tipsText: ""
      })
    } else {
      tipsText: "信息输入有误，请输入确认信息"
    }
  },
  // 下一步
  submitbnt: function () {
    var that = this
    if (password != repassword) {
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
    if (smscode.length != 6 || smscode != bksmscode) {
      this.setData({
        tipsText: "验证码输入错误"
      })
      return
    }
    wx.request({
      url: app.globalData.globalUrl + "/user",
      data: {
        method: "respwd",
        telnum: telnum,
        password: password
      },
      success: function (res) {
        if (res.data.respwd == 'success') {
          wx.showToast({
            title: '重置成功',
            icon: 'success',
            duration: 1000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }, 800)
        } else {
          that.setData({
            btnStus:true,
            password: "",
            smscode: "",
            repassword: "",
            tipsText: "信息输入有误，请输入确认信息"
          })
          password = ""
          smscode = ""
          repassword = ""
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
  //发送验证码
  getsmscode: function () {
    var that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if (telnum.length == 11 && myreg.test(telnum)) {
      if (that.data.codeText == '获取验证码') {
        that.setData({ telinputStus: true })
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
    } else {
      that.setData({
        tipsText: "请输入正确手机号码"
      })
    }
  },
  //保存密码
  submit: function () {
    wx.redirectTo({
      url: '../index/index'
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