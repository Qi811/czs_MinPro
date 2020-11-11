// pages/login/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: '',
    pwd: ''
  },
  telInp(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  pwdInp(e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  logins(e) {
    var that = this
    if (that.data.tel == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else if (that.data.tel.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else if (!(/^1[3-9]{1}[0123456789]{9}$/.test(that.data.tel))) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else if (that.data.pwd == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '登录中...',
      })
      wx.request({
        url: app.globalData.url + '/login',
        data: {
          username: that.data.tel,
          password: that.data.pwd
        },
        success(res) {
          wx.hideLoading()
          if(res.data.code == 1){
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }else{
            wx.setStorageSync('id', res.data.id)
            wx.showToast({
              title: '登录成功',
              icon: 'none'
            })
            wx.switchTab({
              url: '../../pages/home/home',
            })
          }
        },
        fail(err) {
          wx.hideLoading()
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'登录'
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