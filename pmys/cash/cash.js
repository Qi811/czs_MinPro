// pages/pmys/cash/cash.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '',
    content: '',
    user: '',
    bankNumber: '',
    tixianPrice: ''
  },

  getMoney(e){
    this.setData({
      money:e.detail.value
    })
  },

  getContent(e){
    this.setData({
      content:e.detail.value
    })
  },

  getCash(e) {
    var that = this
    if (that.data.money == '') {
      wx.showToast({
        title: '请输入要提现的金额',
        icon:'none'
      })
    } else if (Number(that.data.money) < 10) {
      wx.showToast({
        title: '提现金额最低额度10元',
        icon:'none'
      })
    } else if (Number(that.data.money) > Number(that.data.tixianPrice)) {
      wx.showToast({
        title: '余额不足',
        icon:'none'
      })
    } else if (!that.data.bankNumber) {
      wx.showToast({
        title: '请先设置提现账号',
        icon:'none'
      })
    } else {
      wx.request({
        url: app.globalData.url + '/tiXianSubmit',
        data:{
          member_id:wx.getStorageSync('id'),
          price:that.data.money,
          admin_remark:that.data.content
        },
        success(res){
          if (res.data.code == 0) {
            wx.showToast({
              title: '提现成功'
            })
            this.userInfo();
          } else {
            wx.showToast({
              title: res.data.message,
              icon:'none'
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

  getcashInfo(e){
    wx.navigateTo({
      url: '../cashInfo/cashInfo',
    })
  },

  gojr(e){
    wx.navigateTo({
      url: '../income/income',
    })
  },

  quwei:function(){
    wx.setNavigationBarTitle({
      title:'余额提现'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.quwei()
    var that = this
    wx.request({
      url: app.globalData.url + '/userInfo',
      data:{
        id:wx.getStorageSync('id')
      },
      success(res){
        that.setData({
          user:res.data,
          tixianPrice:res.data.price,
          bankNumber:res.data.bank_number
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