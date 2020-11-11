// pages/register/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    tels:'',
    pwds:'',
    twopwd:'',
    memberId:app.globalData.memberId
  },
  nicknameInp(e){
    this.setData({
      nickname:e.detail.value
    })
  },
  telInp(e){
    this.setData({
      tels:e.detail.value
    })
  },
  passInp(e){
    this.setData({
      pwds:e.detail.value
    })
  },
  twopassInp(e){
    this.setData({
      twopwd:e.detail.value
    })
  },
  regi(res){
    var that = this
    if(that.data.nickname == ''){
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
    }else if(that.data.tels == ''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else if (that.data.tels.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else if (!(/^1[3-9]{1}[0123456789]{9}$/.test(that.data.tels))) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
    } else if (that.data.pwds == '') {
      wx.showToast({
        title: '请设置密码',
        icon: 'none'
      })
    } else if (that.data.pwds.length < 6){
      wx.showToast({
        title: '密码不安全,建议6位或6位以上',
        icon: 'none'
      })
    } else if (that.data.twopwd == ''){
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none'
      })
    } else if (that.data.pwds != that.data.twopwd){
      wx.showToast({
        title: '密码和确认密码输入不一致',
        icon: 'none'
      })
    } else if (that.data.memberId == ''){
      wx.showToast({
        title: '邀请码不能为空',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '注册中...',
      })
      wx.request({
        url: app.globalData.url + '/register',
        data:{
          username:that.data.tels,
          password:that.data.pwds,
          twopassword:that.data.twopwd,
          nickname:that.data.nickname,
          MemberId:that.data.memberId
        },
        success(res){
          wx.hideLoading()
          if(res.data.code == 0){
            wx.setStorageSync('id', res.data.id)
            wx.showToast({
              title: '注册成功',
              icon: 'none'
            })
            app.globalData.currentTab = 0
          }else{
            wx.showToast({
              title: '注册失败' + res.data.message,
              icon: 'none'
            })
            app.globalData.currentTab = 1
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
    if(app.globalData.currentTab == 1){
      console.log(app.globalData.memberId)
    }
    this.setData({
      memberId:app.globalData.memberId
    })
    wx.setNavigationBarTitle({
      title:'注册'
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