// pmys/uptPd/uptPd.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowpwd:'',
    newpwd:'',
    agapwd:''
  },
  nowpwdIpt(e){
    this.setData({
      nowpwd:e.detail.value
    })
  },
  newpwdIpt(e){
    this.setData({
      newpwd:e.detail.value
    })
  },
  agapwdIpt(e){
    this.setData({
      agapwd:e.detail.value
    })
  },
  isOK(e){
    var that = this
    if(that.data.nowpwd == ''){
      wx.showToast({
        title: '请输入旧密码',
        icon: 'none'
      })
    }else if(that.data.nowpwd.length < 6){
      wx.showToast({
        title: '旧密码不正确',
        icon: 'none'
      })
    }else if(that.data.newpwd == ''){
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
    }else if(that.data.newpwd.length < 6){
      wx.showToast({
        title: '密码不安全，建议6位以上',
        icon: 'none'
      })
    }else if(that.data.nowpwd == that.data.newpwd){
      wx.showToast({
        title: '新密码和旧密码不能一样',
        icon: 'none'
      })
    }else if(that.data.newpwd != that.data.agapwd){
      wx.showToast({
        title: '新密码和确认密码不一致',
        icon: 'none'
      })
    }else{
      wx.showLoading({
        title: '修改中...',
      })
      wx.request({
        url: app.globalData.url + '/revisepwd',
        data:{
          userId:wx.getStorageSync('id'),
          oldpassword:that.data.nowpwd,
          newpassword:that.data.newpwd,
          password:that.data.agapwd
        },
        success(res){
          wx.hideLoading()
          if(res.data.code == 0){
            wx.showToast({
              title: '修改成功',
              icon: 'none'
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        },
        fail(err){
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
      title:'修改密码'
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