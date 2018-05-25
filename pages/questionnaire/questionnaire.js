var app = getApp()
Page({
  data: {
    url: ""
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      url: "https://www.nxyqedu.com/antifalse/questionnaire/list"
//      url: "http://localhost:8080/antifalse/questionnaire/list"
    });
  }
});