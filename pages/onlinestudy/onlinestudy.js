var app = getApp()
Page({
  data: {
    url: ""
  },
  onLoad: function (options) {
    console.log(app.globalData.baseUrl + "onlinestudy/list/" + app.globalData.user.telnum)
    this.setData({ 
      url: app.globalData.baseUrl + "onlinestudy/list/" + app.globalData.user.telnum
    });
  }
});