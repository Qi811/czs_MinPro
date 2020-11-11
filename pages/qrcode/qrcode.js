// pages/pshare/qrcode/qrcode.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: ['http://m.qpic.cn/psc?/V50dOJzn1X8x9j30JRSn1m2wvI1zBnm3/ruAMsa53pVQWN7FLK88i5nLi1sIIu5.7eCpl5folP7WCXBqPfWI*t3RqNjs.Puw1MvX1pQY4f0kXWmn9vJ.qT0Jh*UV0Yw*FBlnclXuvlTQ!/b&bo=ggNFBgAAAAABB.I!&rf=viewer_4', 
     'http://m.qpic.cn/psc?/V50dOJzn1X8x9j30JRSn1m2wvI1zBnm3/ruAMsa53pVQWN7FLK88i5hPHDn.hWioWf8qgKmPGfptdbXR1VQCc3*T9coTXUoRHyM1JO3z.5VEYumiGJiiVWA1rXzmgxEanzNCiw2x3vJI!/b&bo=ggNABgAAAAABB.c!&rf=viewer_4'],
    timer: '',
    dataImg: [],
    url: '',
    teamPrice: '',
    teamSuccess: '',
  },

  lookFriend(e) {
    wx.navigateTo({
      url: '../../pshare/friend/friend',
    })
  },

  // copyText(e){
  //   if(this.data.url == '' || this.data.url == undefined){
  //     wx.showToast({
  //       title: '复制失败',
  //       icon:'none'
  //     })
  //   }else{
  //     wx.setClipboardData({
  //       data: this.data.url,
  //       success(res){

  //       }
  //     })
  //   }
  // },

  shareLink(e) {

  },

  onShareAppMessage: function (options) {
    let that = this
    return {
      title: '诚助手',
      desc: '一个做任务就能赚钱的小程序',
      path: '../../plors/setting/setting',
      success: function (res) {
        let shareTickets = res.shareTickets
        if (shareTickets && shareTickets.length === 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTicket[0],
          success: function (res) {
            let encryptedData = res.encryptedData
            let iv = res.iv
          }
        })
      }
    }
  },

  LookBig(e) {
    wx.previewImage({
      urls: this.data.dataImg
    })
  },

  save(e) {
    var that = this
    wx.getImageInfo({
      src: that.data.dataImg[0],
      success(res) {
        var path = res.path
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success(res) {
                  wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success(res) {
                      wx.showToast({
                        title: '保存成功',
                        icon: 'none'
                      })
                    },
                    faile: (err) => {
                      wx.showToast({
                        title: '保存失败',
                        icon: 'none'
                      })
                    }
                  })
                }
              })
            } else {
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success(res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'none'
                  })
                },
                faile: (err) => {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  getRandom(minNum, maxNum) {
    this.setData({
      num: Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
    })
  },

  quwei: function () {
    wx.setNavigationBarTitle({
      title: '我的二维码'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('id') == '' || wx.getStorageSync('id') == undefined) {
      wx.navigateTo({
        url: '../../plors/setting/setting',
      })
    }
    wx.showShareMenu({
      withShareTicket: true,
    })
    this.quwei()
    this.getRandom(0, this.data.imgList.length - 1)

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
    if (wx.getStorageSync('id')) {
      var that = this
      let lis = []
      wx.request({
        url: app.globalData.url + '/shareInfo',
        data: {
          userId: wx.getStorageSync('id')
        },
        success(res) {
          lis = lis.concat(res.data.data)
          that.setData({
            dataImg: lis,
            url: res.data.url
          })
        },
        fail(err) {
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      })
      wx.request({
        url: app.globalData.url + '/teamMoney',
        data: {
          userId: wx.getStorageSync('id')
        },
        success(res) {
          that.setData({
            teamPrice: res.data.teamMoney
          })
        },
        fail(err) {
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      })
      wx.request({
        url: app.globalData.url + '/inviteNum',
        data: {
          id: wx.getStorageSync('id')
        },
        success(res) {
          that.setData({
            teamSuccess: res.data.number
          })
        },
        fail(err) {
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '../../plors/setting/setting',
      })
    }
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