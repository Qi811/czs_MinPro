// pages/usermy/cashlist/cashlist.js
const app = getApp();
var timefor = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list: [],
      page:1,
      size:100,
      nullson: false,
      moneycolor: false,
      rightmo: 'rightmo',
      rightney: 'rightney',
      max:0
    },
  // 返回
  back(){
    wx.switchTab({
      url: '/pages/usermy/cash/cash',
    })
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
    var that = this;
    wx.request({
      url: app.globalData.url + '/tiXianInfo',
      data:{
        id:wx.getStorageSync('id'),
        page:that.data.page,
        size:that.data.size
      },
      success(res){
        that.setData({
          list:res.data.data
        })
        if(res.data.data.length == 0){
          that.setData({
            nullson:false
          })
        }else{
          for (let i = 0; i < that.data.list.length; i++) {
            const aa = that.data.list[i].create_time;
            that.setData({
              ['list['+i+'].create_time']:timefor.formatTimeTwo(aa,'Y/M/D h:m:s'),
              max:that.data.max + that.data.list[i].price
            })
          }
          that.setData({
            nullson:true
          })
        }
        for(var i=0;i<res.data.data.length;i++){
          if(res.data.data[i].statusName == '已转款'){
            that.setData({
              moneycolor:true
            })
          }else{
            that.setData({
              moneycolor:false
            })
          }
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