// pages/applyonline/applyonline.js
var app = getApp()
var pazonename = '';
var padiquname = '';
var panation = '01';
var pabankName = '';
var paexamDate = '';
var pasource=0;
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
    //民族
    nation: [],
    nationindex: 0,
    //银行名称
    BackNameStu:false,
    backName: [],
    //支行名称
    subBackNameStu:false,
    subBackName: null,
   
    //申请考试时间
    examDateStu:false,
    examDate: [],
    examAllownums: '',

    submitflag:false,

    checkEnd:"",
    
    region: ['宁夏回族自治区', '', ''],

    multiArray: [['银川','石嘴山','中卫','固原', '吴忠'], ['兴庆区', '金凤区', '西夏', '贺兰县', '中宁县']], 
    multiIndex: [0, 0],
    userInfo: {},
    user: {},
    ksstatus:'0',

    //考生地区
    kssource:[],
    kssourceStu:false,
    kssourceIndex:0,
    applyInfo:{}
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

    wx.request({
      url: app.globalData.globalUrl + "/apply",
      data: {
        method: "initApply",
        idcard: this.data.user.idcard
      },
      success: function (res) {
        if (!!res.data.kssource&&res.data.kssource.length>0){
          pasource = res.data.kssource[0]['originid'];
        }
        that.setData({
          nation: res.data.nation,
          ksstatus : res.data.ksstatus,
          kssource : res.data.kssource,
          kssourceStu: ((!!res.data.kssource&&res.data.kssource.length>0)?true:false),
          applyInfo: res.data.applyInfo
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
  
  },
  // 民族
  bindPickerNation: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      nationindex: e.detail.value
    })
    panation = this.data.nation[e.detail.value]['nationid'];
  },
  //
  bindRegionChange: function (e) {
    var that = this;
    console.log(e.detail.value)
    console.log(e.detail.value[1])
    console.log(e.detail.value[2])
    pazonename = e.detail.value[2]
    padiquname = e.detail.value[1]
    this.setData({
      region: e.detail.value,
      BackNameStu: false,
      BackNameStu: false,
      backName: [],
      //支行名称
      subBackNameStu: false,
      subBackName: null,

      //申请考试时间
      examDateStu: false,
      examDate: [],
      examAllownums: '',
      examDateindex: '',
      subBackNameindex:'',
      backNameindex:'',
      submitflag:false
    })

    wx.request({
      url: app.globalData.globalUrl + "/apply",
      data: {
        method: "queryBankType",
        zonename: pazonename,
        diquname: e.detail.value[1]
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.data.bankType);
        that.setData({
          backName : res.data.bankType,
          examDate : res.data.examDate
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
  // 银行名称
  bindPickerBackName: function (e) {
    console.log(this.data.backName[e.detail.value]);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var that = this;
    this.setData({
      backNameindex: e.detail.value,
      BackNameStu: true,
      //支行名称
      subBackNameStu: false,
      subBackName: null,

      //申请考试时间
      examDateStu: false,
      examAllownums: '',
      examDateindex: '',
      subBackNameindex: '',
      submitflag:false
    })
    wx.request({
      url: app.globalData.globalUrl + "/apply",
      data: {
        method: "queryBankName",
        zonename: pazonename,
        bankType: this.data.backName[e.detail.value]
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.data.subbankName);
        that.setData({
          subBackName: res.data.subbankName
        })
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
  },
  // 支行
  bindPickerSubBackName: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      subBackNameindex: e.detail.value,
      subBackNameStu:true,
      //申请考试时间
      examDateStu: false,
      examAllownums: '',
      examDateindex: '',
      submitflag:false
    })
    pabankName = this.data.subBackName[e.detail.value]
  },
  // 考生地区
  bindPickerKssource:function(e){
    var that = this;
    this.setData({
      kssourceIndex:e.detail.value,
      kssourceStu:true,
    });
    pasource = this.data.kssource[e.detail.value]['originid'];
  },
  // 申请考试地区时间
  bindPickerExamDate: function (e) {
    var that = this
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      examDateindex: e.detail.value,
      examDateStu:true,
      submitflag:true
    })
    paexamDate = this.data.examDate[e.detail.value]
    wx.request({
      url: app.globalData.globalUrl + "/apply",
      data: {
        method: "queryExamAllownums",
        examdatetime: this.data.examDate[e.detail.value]
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          examAllownums : res.data.allownums,
          checkEnd: res.data.checkEnd
        })
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
  },
  submitbind:function(){
    var that = this;
    wx.request({
      url: app.globalData.globalUrl + "/apply",
      data: {
        method: "insertApply",
        idcard : this.data.user.idcard,
        userName: this.data.user.username,
        telnum: this.data.user.telnum,
        diquname: padiquname,
        nation: panation,
        bankName: pabankName,
        examDate : paexamDate,
        kssource: pasource
      },
      success: function (res) {
        if (res.data.req == 'success'){
          wx.showToast({ title: '提交成功' })
          setTimeout(function () {
            wx.reLaunch({
              url: '/pages/apply/applyaudit/applyaudit'
            })
          }, 500);
        }else{
          wx.showModal({
            title: '提示',
            content: '提交失败，请联系管理员',
            success: function (res) {
            }
          })
        }
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
      }
    })
  }
})