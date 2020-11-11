// pages/ptask/all/all.js
const app = getApp();
var timefor = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alltab: 0,
    dwcList: [],
    shzList: [],
    yshList: [],
    shsbList: [],
    dwc:false,
    shz:false,
    ysh:false,
    shsb:false,
    page: 1,
    size: 100,
    swiperHeight: 0,
    list: [],
    sblist: [],
    yilist: [],
    zhlist: [],
    scrollTop: 50
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.alltab === e.target.dataset.allrent) {
      return false
    } else {
      that.setData({
        alltab: e.target.dataset.allrent
      })
    }
  },

  swiperChange(e) {
    var that = this
    var shzList = {}
    var yshList = {}
    var shsbList = {}
    if (e.detail.current == 0) {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
      wx.setNavigationBarTitle({
        title: '待完成',
      })
      this.setData({
        alltab: 0
      })
    } else if (e.detail.current == 1) {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
      wx.setNavigationBarTitle({
        title: '审核中',
      })
      this.setData({
        alltab: 1
      })
      wx.request({
        url: app.globalData.url + '/pickTask',
        data: {
          id: wx.getStorageSync('id'),
          page: that.data.page,
          size: 100,
          status: e.detail.current
        },
        success(res) {
          for (var i = 0; i < res.data.data.length; i++) {
            shzList[i] = res.data.data[i]
            const aa = shzList[i].end_time;
            that.setData({
              ['zhlist[' + i + '].end_time']: timefor.formatTimeTwo(aa, 'Y/M/D')
            })
          }
          if(res.data.data.length == 0){
            that.setData({
              shz:true
            })
          }else{
            that.setData({
              shzList: shzList,
              shz:false
            })
          }
        }
      })
    } else if (e.detail.current == 2) {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
      wx.setNavigationBarTitle({
        title: '已审核',
      })
      this.setData({
        alltab: 2
      })
      wx.request({
        url: app.globalData.url + '/pickTask',
        data: {
          id: wx.getStorageSync('id'),
          page: that.data.page,
          size: that.data.size,
          status: e.detail.current
        },
        success(res) {
          for (var i = 0; i < res.data.data.length; i++) {
            yshList[i] = res.data.data[i]
            const aa = yshList[i].end_time;
            that.setData({
              ['yilist[' + i + '].end_time']: timefor.formatTimeTwo(aa, 'Y/M/D')
            })
          }
          if(res.data.data.length == 0){
            that.setData({
              ysh:true
            })
          }else{
            that.setData({
              yshList: yshList,
              ysh:false
            })
          }
        }
      })
    } else if (e.detail.current == 3) {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
      wx.setNavigationBarTitle({
        title: '审核失败',
      })
      this.setData({
        alltab: 3
      })
      wx.request({
        url: app.globalData.url + '/pickTask',
        data: {
          id: wx.getStorageSync('id'),
          page: that.data.page,
          size: that.data.size,
          status: e.detail.current
        },
        success(res) {
          for (var i = 0; i < res.data.data.length; i++) {
            shsbList[i] = res.data.data[i]
            const aa = shsbList[i].end_time;
            that.setData({
              ['sblist[' + i + '].end_time']: timefor.formatTimeTwo(aa, 'Y/M/D')
            })
          }
          if(res.data.data.length == 0){
            that.setData({
              shsb:true
            })
          }else{
            that.setData({
              shsbList: shsbList,
              shsb:false
            })
          }
        }
      })
    }
  },

  quwei: function () {
    wx.setNavigationBarTitle({
      title: '待完成',
    })
  },

  taskClick(e) {
    let id = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '../../phome/taskdetail/taskdetail?taskid=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.quwei()
    var that = this
    var dwcList = {}
    wx.request({
      url: app.globalData.url + '/pickTask',
      data: {
        id: wx.getStorageSync('id'),
        page: that.data.page,
        size: that.data.size,
        status: 0
      },
      success(res) {
        let rpxHeight = res.data.data.length * 120; 
        that.setData({
          swiperHeight:rpxHeight
        })
        for (var i = 0; i < res.data.data.length; i++) {
          dwcList[i] = res.data.data[i]
          const aa = dwcList[i].end_time;
          that.setData({
            ['list[' + i + '].end_time']: timefor.formatTimeTwo(aa, 'Y/M/D')
          })
        }
        if(res.data.data.length == 0){
          that.setData({
            dwc:true
          })
        }else{
          that.setData({
            dwcList: dwcList,
            dwc:false
          })
        }
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