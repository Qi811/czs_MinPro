// pages/usermy/cashInfo/cashInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isbank:true,
    iszfb:true,
    zflx:['支付宝','银行卡'],
    zflxindex:wx.getStorageSync('zflxindex')?wx.getStorageSync('zflxindex'):0,
    bankName:'',
    subbranchName:'',
    bankUser: '',
    bankNumber: '',
    zfbUser:'',
    zfbkNumber:'',
    status:0
  },

  isSelect(e){
    this.setData({
      zflxindex:e.detail.value
    })
  },

  bankNameInp(e){
    this.setData({
      bankName:e.detail.value
    })
  },

  subbranchNameInp(e){
    this.setData({
      subbranchName:e.detail.value
    })
  },

  bankUserInp(e){
    this.setData({
      bankUser:e.detail.value
    })
  },

  bankNumberInp(e){
    this.setData({
      bankNumber:e.detail.value
    })
  },
  
  zfbUserInp(e){
    this.setData({
      zfbUser:e.detail.value
    })
  },

  zfbkNumberInp(e){
    this.setData({
      zfbkNumber:e.detail.value
    })
  },

  quwei:function(){
    wx.setNavigationBarTitle({
      title:'提现资料'
    })
  },

  save(e){
    var that = this
    if(that.data.zflxindex == 0){
      if(!that.data.zfbUser){
        wx.showToast({
          title: '请输入支付宝名称',
          icon:'none'
        })
      }else if(!that.data.zfbkNumber){
        wx.showToast({
          title: '请输入支付宝账号',
          icon:'none'
        })
      }else{
        wx.request({
          url: app.globalData.url + '/userInfoSave',
          data:{
            userId:wx.getStorageSync('id'),
            bankName:'支付宝',
            subbranchName:'',
            bankUser:that.data.zfbUser,
            bankNumber:that.data.zfbkNumber,
            status:2
          },
          success(res){
            if(res.data.code == 0){
              // that.setData({
              //   zflxindex:0
              // })
              wx.setStorageSync('zflxindex',0)
              wx.showToast({
                title: '修改成功',
                icon:'none'
              })
              wx.navigateTo({
                url: '../cash/cash'
              })
            }else{
              wx.showToast({
                title: res.data.message,
                icon:'none'
              })
            }
          }
        })
        console.log(that.data.zflxindex)
      }
    }else if(that.data.zflxindex == 1){
      if(!that.data.bankName){
        wx.showToast({
          title: '请输入银行名称',
          icon:'none'
        })
      }else if(!that.data.subbranchName){
        wx.showToast({
          title: '请输入支行名称',
          icon:'none'
        })
      }else if(!that.data.bankUser){
        wx.showToast({
          title: '请输入收款人姓名',
          icon:'none'
        })
      }else if(!that.data.bankNumber){
        wx.showToast({
          title: '请输入卡号',
          icon:'none'
        })
      }else{
        wx.request({
          url: app.globalData.url + '/userInfoSave',
          data:{
            userId:wx.getStorageSync('id'),
            bankName:that.data.bankName,
            subbranchName:that.data.subbranchName,
            bankUser:that.data.bankUser,
            bankNumber:that.data.bankNumber,
            status:3
          },
          success(res){
            if(res.data.code == 0){
              // that.setData({
              //   zflxindex:1
              // })
              wx.setStorageSync('zflxindex',1)
              wx.showToast({
                title: '修改成功',
                icon:'none'
              })
              console.log(that.data.zflxindex)
              wx.navigateTo({
                url: '../cash/cash'
              })
            }else{
              wx.showToast({
                title: res.data.message,
                icon:'none'
              })
            }
          }
        })
      }
      console.log(that.data.zflxindex)
    }
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.quwei()
    console.log('load',this.data.zflxindex)
    var that = this
    if(wx.getStorageSync('zflxindex') == 1){
      //银行卡
      wx.request({
        url: app.globalData.url + '/payInfo',
        data:{
          userId:wx.getStorageSync('id')
        },
        success(res){
          that.setData({
            bankName:res.data.bank_name,
            subbranchName:res.data.subbranch_name,
            bankUser:res.data.bank_user,
            bankNumber:res.data.bank_number
          })
        }
      })
    }else if(wx.getStorageSync('zflxindex') == 0){
      //支付宝
      wx.request({
        url: app.globalData.url + '/payInfo',
        data:{
          userId:wx.getStorageSync('id')
        },
        success(res){
          that.setData({
            zfbUser:res.data.bank_user,
            zfbkNumber:res.data.bank_number
          });
        }
      });
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