// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testList: [
      {
        testtit: "2018宁夏反假币考试真题模拟一",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟三",
        testqus: "207",
        testsocre: "100"
      }, {
        testtit: "2018宁夏反假币考试真题模拟一",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟二",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟三",
        testqus: "207",
        testsocre: "100"
      }, {
        testtit: "2018宁夏反假币考试真题模拟一",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟二",
        testqus: "207",
        testsocre: "100"
      },
      {
        testtit: "2018宁夏反假币考试真题模拟888",
        testqus: "207",
        testsocre: "100"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //进入考试
  enterExam: function (event) {
    console.log(event),
      //带id跳转到指定的页面，这里的event.currentTarget.dataset.id是获取wxml页面上的data-id参数，详见事件说明
      wx.navigateTo({
        url: "../exam/exam?id=" + event.currentTarget.dataset.id,//url跳转地址
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
          console.log(res)
        }
      })
  }
})