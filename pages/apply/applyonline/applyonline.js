// pages/applyonline/applyonline.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
    //民族
    nation: ['汉族', '回族', '其他'],
    nationindex: 0,
    //银行名称
    BackNameStu:false,
    backName: [],
    //支行名称
    subBackNameStu:false,
    subBackName: [],
   
    //申请考试时间
    examDateStu:false,
    examDate: [],
    
    region: ['宁夏回族自治区', '银川市', '兴庆区'],

    multiArray: [['银川','石嘴山','中卫','固原', '吴忠'], ['兴庆区', '金凤区', '西夏', '贺兰县', '中宁县']], 
    multiIndex: [0, 0],
    userInfo: {},
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        loginstatus: app.globalData.loginstatus,
        user: app.globalData.user
      })
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
  
  },
  // 民族
  bindPickerNation: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nationindex: e.detail.value
    })
  },
  //
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 银行名称
  bindPickerBackName: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      backNameindex: e.detail.value,
      BackNameStu:true
    })
  },
  // 支行
  bindPickerSubBackName: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      subBackNameindex: e.detail.value,
      subBackNameStu:true
    })
  },
  // 申请考试地区时间
  bindPickerExamDate: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      examDateindex: e.detail.value,
      examDateStu:true
    })
  },
  


})