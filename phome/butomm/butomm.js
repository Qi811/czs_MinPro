// pages/butomm/butomm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    obj: 1,
    nullson:false
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'低价区'
    })
    var that = this
    var obj = that.data.obj
    var size = 10
    var price = 5
    wx.request({
      url: app.globalData.url + '/taskList',
      data:{
        userId:wx.getStorageSync('id'),
        page:obj,
        size:size,
        price:price
      },
      success(res){
        that.setData({
          list:res.data.data
        })
        if (that.data.list.length == 0) {
          that.setData({
            nullson:false
          })
        } else {
          that.setData({
            nullson:true
          })
        }
      }
    })
  },
  goDetail(e){
    let id = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '../../phome/taskdetail/taskdetail?taskid=' + id,
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