var app = getApp()
Page({
  data: {
    url: ""
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({ 
      url: "https://www.nxyqedu.com/antifalse/announcement/notice"
//      url: "http://localhost:8080/antifalse/announcement/notice"
    });
  }
});