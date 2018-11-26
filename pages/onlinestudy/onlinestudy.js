var app = getApp()
Page({
  data: {
    url: ""
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({ 
      url: app.globalData.baseUrl+"onlinestudy/list"
    });
  }
});