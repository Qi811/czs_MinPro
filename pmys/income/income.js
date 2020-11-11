// pages/usermy/income/income.js
const app = getApp();
var timefor = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    moneycolor: true,
    rightmo: 'rightmo',
    rightney: 'rightney',
    timeBottom: 'timeBottom',
    size: 50,
    nullson: false,
    max:0
  },

  quwei:function(){
    wx.setNavigationBarTitle({
      title:'收支记录'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.quwei()
    var that = this
    wx.request({
      url: app.globalData.url + '/incomeInfo',
      data:{
        id:wx.getStorageSync('id'),
        page:1,
        size:that.data.size,
        nullson:false
      },
      success(res){
        that.setData({
          list:res.data.data
        })
        for (let i = 0; i < that.data.list.length; i++) {
          const aa = that.data.list[i].create_time;
          that.setData({
            ['list['+i+'].create_time']:timefor.formatTimeTwo(aa,'Y/M/D h:m:s'),
            max:that.data.max + that.data.list[i].price
          })
        }
        if(res.data.data.length == 0){
          that.setData({
            nullson:false
          })
        }else{
          
          that.setData({
            nullson:true
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