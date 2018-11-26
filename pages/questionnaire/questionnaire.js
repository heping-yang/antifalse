var app = getApp()
Page({
  data: {
    url: ""
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      url: app.globalData.baseUrl+"questionnaire/list"
//      url: "http://localhost:8080/antifalse/questionnaire/list"
    });
  }
});