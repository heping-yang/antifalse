//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    var that = this;
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        if (res.code) {
          //获取openId
          wx.request({
            url: that.globalData.globalUrl + "/wsordersubmit",
            data: {
              method: "getOpenid",
              code: res.code
            },
            success: function (openIdRes) {
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              that.globalData.openid = openIdRes.data.openid;
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    });
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
//    globalUrl: "https://www.nxyqedu.com/antifalse/api",
    globalUrl: "http://localhost:8080/antifalse/api",
    userInfo: null,
    openid:"",
    h_id:"",
    user:{},
    loginstatus:0,
    examtype:0
  }
})
