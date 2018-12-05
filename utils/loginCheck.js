var app = getApp()
var util = require('./util.js');
function check(url) {
  if (app.globalData.loginstatus == 0){
    wx.navigateTo({
      url: '/pages/login/login/login'
    })
    return false
  }
  if (app.globalData.user.userstatus == 1){
    wx.request({
      url: app.globalData.globalUrl + "/user",
      data: {
        method: "relogin",
        telnum: app.globalData.user.telnum
      },
      success: function (res) {
        if (app.globalData.user.userstatus != res.data.user.userstatus){
          app.globalData.user = res.data.user
          return false
        }
      }
    })
  }
  if (url == "/pages/exam/list/list" && app.globalData.user.userstatus == 1){
      /*wx.navigateTo({
        url: '/pages/user/pay/pay'
      })*/
      util.showMsg('您还不是会员');
      return false
  }
  if ((url == "/pages/user/pay/pay" && app.globalData.user.userstatus != 1) ) {
    wx.navigateTo({
      url: '/pages/user/status/status'
    })
    return false
  }
  return true
}

module.exports = {
  check: check
}