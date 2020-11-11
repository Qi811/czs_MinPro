// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    price: null,
    pricenum: null,
    spanwidth: 100,
    du: 69,
    navleft: 200,
    hin: false,
    exit: false,
    tishi: "",
  },

  sonmoney(e){
    wx.navigateTo({
      url: '../../pmys/cashlist/cashlist',
    })
  },

  balance(e){
    wx.navigateTo({
      url: '../../pmys/cash/cash',
    })
  },

  received(e){
    wx.navigateTo({
      url: '../../pmys/all/all',
    })
  },

  beginner(e){
    wx.navigateTo({
      url: '../../pmys/beginner/beginner',
    })
  },

  uptdPaw(e){
    wx.navigateTo({
      url: '../../pmys/uptPd/uptPd',
    })
  },

  business(e){
    wx.navigateTo({
      url: '../../pmys/business/business',
    })
  },

  clearLogin(e){
    this.setData({
      exit:true
    })
  },
  cancelbtn(e){
    this.setData({
      exit:false
    })
  },
  surebtn(e){
    wx.removeStorageSync('id')
    wx.redirectTo({
      url: '../../plors/setting/setting',
    })
    this.setData({
      exit:false
    })
  },

  quwei:function(){
    wx.setNavigationBarTitle({
      title:'我的'
    })
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
    this.quwei()
    var that = this
    wx.request({
      url: app.globalData.url + '/userInfo',
      data:{
        id:wx.getStorageSync('id')
      },
      success(res){
        that.setData({
          list:res.data,
          price:res.data.price,
          pricenum:res.data.total_price,
          du:res.data.percentage, 
          spanwidth:220 * (res.data.percentage * 0.01),
          navleft:220 * (res.data.percentage * 0.01)-20,
        })
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
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