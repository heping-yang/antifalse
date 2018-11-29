var util = require('../../../utils/util.js')

var app = getApp()
var pazonename = '';
var paksdqid = '';
var panation = '01';
var pabankName = '';
var paksdate = '';
var pakstimesid = '';
var pakssource='';
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitflag:false,

    checkEnd:"",

    userInfo: {},
    user: {},
    ksstatus:'0',

    //考试地区
    ksdq:[],
    ksdqStu:false,
    ksdqIndex:-1,

    //考生地区
    kssource:[],
    kssourceStu:false,
    kssourceIndex:-1,

    //民族
    nation: [],
    nationindex: 0,

    //银行地区
    banksource:[],
    banksourceStu:false,
    banksourceIndex:-1,

    //银行名称
    bankNameStu: false,
    bankName: [],
    bankNameIndex:-1,

    //支行名称
    subBankNameStu: false,
    subBankName: [],
    subBankNameIndex:-1,

    //申请考试时间
    examDateStu: false,
    examDate: [],
    examDateIndex:-1,
    examAllownums: '',

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
       
        that.setData({
          nation: res.data.nation,
          ksstatus : res.data.ksstatus,
          ksdq: res.data.ksdq||[],
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
  //考试地区
  bindPickerKsdq: function (e) {
    var that =  this;
    var item = this.data.ksdq[e.detail.value];
    if(!!item){
      this.setData({
        ksdqIndex: e.detail.value,
        ksdqStu:true,

        kssource:[],
        kssourceStu:false,
        kssourceIndex:-1,

        banksource:[],
        banksourceStu:false,
        banksourceIndex:-1,

        bankName:[],
        bankNameStu:false,
        bankNameIndex:-1,


        subBankName:[],
        subBankNameStu:false,
        subBankNameIndex:-1,

        examDate:[],
        examDateStu:false,
        examDateIndex:-1,
      });
      paksdqid = item.areaid;
      console.log("考试地区：" + paksdqid);
      //查询考生所在地
      wx.request({
        url: app.globalData.globalUrl + "/apply",
        data: {
          method: "queryOrigin",
          ksdqid: paksdqid
        },
        success: function (res) {
          that.setData({
            kssource: res.data.origins,
            kssourceIndex:-1,
            kssourceStu:false,
            banksource:res.data.origins,
            banksourceIndex:-1,
            banksourceStu:false,
            examDate: res.data.examDate,
          })
        },
        fail: function (error) {
          console.log(error);
          that.setData({
            arr_res: '返回异常'
          })
        }
      });
    }
  },
  // 考生地区
  bindPickerKssource: function (e) {
    var that = this;
    var item = this.data.kssource[e.detail.value];
    if(!!item){
      this.setData({
        kssourceIndex: e.detail.value,
        kssourceStu: true,
      });
      pakssource = item['originid'];
    }
  },
  // 民族
  bindPickerNation: function (e) {
    var item = this.data.nation[e.detail.value];
    if(!!item){
      this.setData({
        nationindex: e.detail.value
      })
      panation = item['nationid'];
    }
  },
  //银行所在地
  bindPickerBanksource: function (e) {
    var that = this;
    var item = this.data.banksource[e.detail.value];
    if(!!item){
      this.setData({
        banksourceIndex:e.detail.value,
        banksourceStu:true,

        //银行
        bankNameStu: false,
        bankNameIndex:-1,
        backName: [],

        //支行名称
        subBankNameStu: false,
        subBankName: [],
        subBankNameIndex: -1,
      });

      pazonename = item['originname'];
      pakssource = item['originid'];

      wx.request({
        url: app.globalData.globalUrl + "/apply",
        data: {
          method: "queryBankType",
          zonename: pazonename
        },
        success: function (res) {
          that.setData({
            bankName : res.data.bankType,
          });
        },
        fail: function (error) {
          console.log(error);
          that.setData({
            arr_res: '返回异常'
          })
        }
      });
    }
  },
  
  // 银行名称
  bindPickerBankName: function (e) {
    var that = this;
    var bankType = this.data.bankName[e.detail.value];
    if (!!bankType){
      this.setData({
        bankNameIndex: e.detail.value,
        bankNameStu: true,

        //支行名称
        subBankNameStu: false,
        subBankName: [],
        subBankNameIndex:-1,
      })
      wx.request({
        url: app.globalData.globalUrl + "/apply",
        data: {
          method: "queryBankName",
          zonename: pazonename,
          bankType: bankType
        },
        success: function (res) {
          that.setData({
            subBankName: res.data.subbankName
          })
        },
        fail: function (error) {
          console.log(error);
          that.setData({
            arr_res: '返回异常'
          })
        }
      });
    }
  },
  // 支行
  bindPickerSubBankName: function (e) {
    pabankName = this.data.subBankName[e.detail.value]

    if(!!pabankName){
      this.setData({
        subBankNameIndex: e.detail.value,
        subBankNameStu:true,
      });
    }
  },
  
  // 申请考试地区时间
  bindPickerExamDate: function (e) {
    var that = this
    var item = this.data.examDate[e.detail.value];
    if(!!item){
      this.setData({
        examDateIndex: e.detail.value,
        examDateStu: true,
        submitflag: true
      });

      paksdate = item['kstimeid'];
      pakstimesid = item['detailid'];
      wx.request({
        url: app.globalData.globalUrl + "/apply",
        data: {
          method: "queryExamAllownums",
          dateid: item['kstimeid'],
          detailid: item['detailid'],
          allownums: item['allownums']
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
    }
  },
  
  submitbind:function(){
    var that = this;
    //数据检查
    if (!paksdqid || paksdqid==''){
      util.showMsg('请选择考试地区');
      return;
    }
    if (!pabankName || pabankName == '') {
      util.showMsg('请选择银行');
      return;
    }
    if (!paksdate || paksdate==''){
      util.showMsg('请选择考试时间');
      return;
    }
    util.showLoading('数据上传中');
    wx.request({
      url: app.globalData.globalUrl + "/apply",
      data: {
        method: "insertApply",
        idcard : this.data.user.idcard,
        userName: this.data.user.username,
        telnum: this.data.user.telnum,
        ksdqid: paksdqid,
        nation: panation,
        bankName: pabankName,
        dateid: paksdate,
        kstimesid:pakstimesid,
        kssource: pakssource
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
        util.hideLoading();
      },
      fail: function (error) {
        console.log(error);
        that.setData({
          arr_res: '返回异常'
        })
        util.hideLoading();
      }
    })
  }
})