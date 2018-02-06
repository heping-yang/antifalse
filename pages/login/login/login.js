// pages/login/login.js
var telnum = ""
var password = ""
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnStus:false,
    tipsText: "", 
    telnum : "",
    password : ""
    
  },
  //电话号码输入
  iptelnum: function(e) {
    telnum = e.detail.value
    if (telnum.length == 11 && password.length >= 6) {
      this.setData({
        btnStus: true
      })
    }
  },
  //密码输入
  ippwd:function(e){
    password = e.detail.value
    if (telnum.length == 11 && password.length >= 6){
      this.setData({
        btnStus: true
      })
    }
  },
  logintap:function(){
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + "/user",
      data: {
        method: "login",
        telnum:telnum,
        password:password,
        openid: app.globalData.openid
      },
      success: function (res) {
        console.log(res);
        if (res.data.login == 'success'){
          app.globalData.user = res.data.user
          app.globalData.loginstatus = 1
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 3000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }, 800)
        }else{
          that.setData({
            btnStus: false,
            tipsText: res.data.msg,
            telnum : "",
            password: ""
          })
          telnum = ""
          password = ""
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
  //注册新用户
  goregister:function(){
    wx.navigateTo({
      url: '/pages/login/register/register',
    })
  },
  //忘记密码
  resetpassword: function () {
    wx.navigateTo({
      url: '/pages/login/respwd/respwd',
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