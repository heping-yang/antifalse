// pages/applyaudit/applyaudit.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalBg: false,
    modalCont: false,
    userInfo: {},
    user:{},
    applyInfo:null,
    status: '',
    nation:'汉族',
    region:null,
    payamount:310,
    productName:'第一次报考理论和实操',
    checkEnd:''
  },
  modal_suc: function () {
    if (this.data.applyInfo.ksstatus == '0'){
      this.setData({
        payamount: 300,
        productName:'补考理论和实操'
      })
    } else if (this.data.applyInfo.ksstatus == '2') {
      this.setData({
        payamount: 150,
        productName: '补考理论'
      })
    } else if (this.data.applyInfo.ksstatus == '3'){
      this.setData({
        payamount: 150,
        productName: '补考实操'
      })
    }
    this.setData({
      modalBg: true,
      modalCont: true
    })
  },
  modal_close: function () {
    this.setData({
      modalBg: false,
      modalCont: false
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
          userInfo: userInfo,
          loginstatus: app.globalData.loginstatus,
          user: app.globalData.user
        })
      })

      wx.request({
        url: app.globalData.globalUrl + "/apply",
        data: {
          method: "initApply",
          idcard: this.data.user.idcard
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            applyInfo: res.data.applyInfo,
            status: res.data.status,
            nation: (res.data.applyInfo && res.data.applyInfo.nation),
            region: res.data.region,
            checkEnd: res.data.checkEnd
          });
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
  
  },

  goHome: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  paytapbind:function(){
    wx.request({
      url: app.globalData.globalUrl + "/wsordersubmit",
      data: {
        method: "payOrder",
        openid: app.globalData.openid,
        productId: this.data.payamount,
        productName: this.data.productName,
        orderId: this.guid(),
        phone: this.data.user.telnum,
        proddesc: this.data.productName,
        prodFee: '1'
      },
      success: function (res) {
        wx.hideToast();
        console.log(res);
        console.log("timeStamp=" + res.data.body.timeStamp);
        console.log("nonceStr=" + res.data.body.nonceStr);
        console.log("package=" + res.data.body.package);
        console.log("paySign=" + res.data.body.paySign);
        wx.requestPayment({
          'timeStamp': res.data.body.timeStamp,
          'nonceStr': res.data.body.nonceStr,
          'package': res.data.body.package,
          'signType': 'MD5',
          'paySign': res.data.body.paySign,
          success: function (res) {
            wx.showToast({ title: '完成' });
            wx.request({
              url: app.globalData.globalUrl + "/user",
              data: {
                method: "relogin",
                telnum: app.globalData.user.telnum
              },
              success: function (res) {
                if (app.globalData.user.userstatus != res.data.user.userstatus) {
                  app.globalData.user = res.data.user
                  return false
                }
              }
            })
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        })
      }
    })
  },
  //产生一个uuid
  guid: function () {
    return 'xxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
})