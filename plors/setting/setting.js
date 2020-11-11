// pages/login/setting/setting.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    // memberid: 'http://www.hnchengben.com/new.html#/setting/register?userId=9680',
    memberid: '',
    newid: '',
    tel: '',
    pwd: '',
    nickname: '',
    tels: '',
    pwds: '',
    twopwd: '',
    memberId: '',
    motto: '诚助手',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
    if(e.detail.current == 0){
      wx.setNavigationBarTitle({
        title: '登录'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '注册'
      })
    }
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
  loginss(e) {
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
          if (res.data.code == 1) {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          } else {
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

  nicknameInp(e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  telsInp(e) {
    this.setData({
      tels: e.detail.value
    })
  },
  passInp(e) {
    this.setData({
      pwds: e.detail.value
    })
  },
  twopassInp(e) {
    this.setData({
      twopwd: e.detail.value
    })
  },
  regis(res) {
    var that = this
    if (that.data.nickname == '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      })
    } else if (that.data.tels == '') {
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
    } else if (that.data.pwds.length < 6) {
      wx.showToast({
        title: '密码不安全,建议6位或6位以上',
        icon: 'none'
      })
    } else if (that.data.twopwd == '') {
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none'
      })
    } else if (that.data.pwds != that.data.twopwd) {
      wx.showToast({
        title: '密码和确认密码输入不一致',
        icon: 'none'
      })
    } else if (that.data.memberId == '') {
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
        data: {
          username: that.data.tels,
          password: that.data.pwds,
          twopassword: that.data.twopwd,
          nickname: that.data.nickname,
          MemberId: that.data.memberId
        },
        success(res) {
          wx.hideLoading()
          if (res.data.code == 0) {
            // wx.setStorageSync('id', res.data.id)
            wx.showToast({
              title: '注册成功',
              icon: 'none'
            })
            that.setData({
              currentTab:0
            })
          } else {
            wx.showToast({
              title: '注册失败' + res.data.message,
              icon: 'none'
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if(options.q){
      let qrUrl = decodeURIComponent(options.q)
      let memberId = qrUrl.substring(qrUrl.lastIndexOf("=")+1, qrUrl.length);
      this.setData({
        memberId:memberId,
        currentTab:1
      })
    }

    if (wx.getStorageSync('id')) {
      wx.switchTab({
        url: '../../pages/home/home',
      })
    }
    // var mid = this.data.memberid.substring(this.data.memberid.indexOf("=") + 1, this.data.memberid.length)
    // if (mid.length > 9) {
    //   mid = ''
    // }else{
    //   this.setData({
    //     memberId:mid,
    //     currentTab:1
    //   })
    // }
  },

  getUserInfos: function(e){
    if(e.detail.errMsg == 'getUserInfo:ok'){
      this.loginss()
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }else{
      wx.showToast({
        title: '授权之后再能继续操作',
        icon:'none'
      })
    }
  },

  getUserInfo: function(e) {
    if(e.detail.errMsg == 'getUserInfo:ok'){
      this.regis()
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }else{
      wx.showToast({
        title: '授权之后再能继续操作',
        icon:'none'
      })
    }
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