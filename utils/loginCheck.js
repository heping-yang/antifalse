var app = getApp()

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
        app.globalData.user = res.data.user
      }
    })
  }
  if ((url == "/pages/exam/list/list" && app.globalData.user.userstatus == 1) || (url == "/pages/user/grade/grade" && app.globalData.user.userstatus == 1)){
      wx.navigateTo({
        url: '/pages/user/pay/pay'
      })
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