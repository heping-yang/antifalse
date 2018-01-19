var app = getApp()
Page({
  data: {
    url: ""
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({ 
      url: "https://www.nxyqedu.com/antifalse/" + options.index + ".jsp"
//      url: "http://localhost:8080/antifalse/" + options.index + ".jsp"
    });
  }
});