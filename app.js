//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    this.versionCheck();
    var logs = wx.getStorageSync('logs') || []
    var that = this;
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.user = wx.getStorageSync('user');
    if(!!this.globalData.user){
      this.globalData.loginstatus = 1;
      this.globalData.user.userstatus = 1;
    }
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

  versionCheck:function(){
    if (!wx.getUpdateManager){
      return;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      //console.log(res.hasUpdate?"发现新版本":"当前是最新版本")
    });

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      });
    });
  },

  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        },
        fail:function(){
          typeof cb == "function" && cb(null);
        }
      })
    }
  },

  globalData: {
    globalUrl: "https://www.nxyqedu.com/antifalse/api",
    //globalUrl: "http://192.168.2.101:8080/antifalse/api",
    baseUrl: "https://www.nxyqedu.com/antifalse/",
    //baseUrl: "http://192.168.2.101:8080/antifalse/",
    openid:"",
    userInfo:null,
    user:{},
    loginstatus:0,
    examtype:1,
    total_micro_second: 50 * 60 * 1000
  }
})
