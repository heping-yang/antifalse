// pages/exam/exam.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    layerStus:false,
    report: null,
    wrongs: null,
    questionsArray: [
      {
        no: 1,
        total: 135,
        qutype: '单项选择',
        qu: '人民银行分支机构筛选出可疑的新型假币，并要求金融机构的报送行在解缴假币实物时将筛选出的假币人民银行分支机构筛选出可疑的新型假币，并要求金融机构的报送行在解缴假币实物时将筛选出的假币人民银(  )', 
        options: [ 
          {
            flag: "A",
            optionText: '妥善保管，年末时集中 ',
            correct:true, 
          },
          {
            flag: "B",
            optionText: '单独 ' ,
            correct: false, 
          },
          {
            flag: "C",
            optionText: '与其他假币一并  ' ,
            correct: false
          },
          {
            flag: "D",
            optionText: '假币字样，银行行号标识代码和日期 ' ,
            correct: false,
            userselect: true
          }
        ]
      },
      {
        no: 2,
        total: 135,
        qutype: '单项选择',
        qu: '人民银行分支机构筛选出可疑的新型假币',
        correct: "B",
        options: [
          {
            flag: "A",
            optionText: '妥善保管，年末时集中 ',
            correct: true,
            userselect: true
          },
          {
            flag: "B",
            optionText: '单独 '
          },
          {
            flag: "C",
            optionText: '与其他假币一并  '
          },
          {
            flag: "D",
            optionText: '假币字样，银行行号标识代码和日期 '
          }
        ]
      },
      {
        no: 3,
        total: 135,
        qutype: '单项选择',
        qu: '人民银行分支机构筛选出可疑的新型假币',
        correct: "C",
        options: [
          {
            flag: "A",
            optionText: '妥善保管 '
          },
          {
            flag: "B",
            optionText: '单独 '
          },
          {
            flag: "C",
            optionText: '与其他假币一并  '
          },
          {
            flag: "D",
            optionText: '假币字样 '
          }
        ]
      },
      {
        no: 4,
        total: 135,
        qutype: '单项选择',
        qu: '人民银行分支机构筛选出可疑的新型假币',
        correct: "D",
        options: [
          {
            flag: "A",
            optionText: '单独单独单独 '
          },
          {
            flag: "B",
            optionText: '单独单独单独 '
          },
          {
            flag: "C",
            optionText: '假币一并  '
          },
          {
            flag: "D",
            optionText: '假币字样，银行行号标识代码和日期假币字样，银行行号标识代码和日期 '
          }
        ]
      }

    ]
  },
  //返回首页
  backHome:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  //查看全部题目
  showAll: function () {
    this.setData({
      layerStus: true
    })
  },
  //返回报告
  back: function () {
    this.setData({
      layerStus: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + "/exam",
      data: {
        method: "queryExamWrongAnalysis",
        hId: app.globalData.hId
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          report: res.data.report[0],
          wrongs: res.data.wrongs
        });
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
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

  }
})