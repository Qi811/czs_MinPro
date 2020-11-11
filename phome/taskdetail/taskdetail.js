// pages/taskdetail/taskdetail.js
const app = getApp();
const timefor = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskpull: true, //领取任务
    tanull: "tanull", //放弃，提交任务的显示
    takpull: "takpull",
    takspull: "takspull",
    hint: false, //提示记得上传图片
    hin: false, //自定义提示
    tishi: "", //提示文字
    exit: false, //是否放弃任务弹框
    textva: "", //备注
    fucktask: true, //按钮，备注，上传图片的显示
    taskhit: false, //风险提示
    files: [], //图片
    list: [], //页面显示数组
    time: "", //时间处理
    taskid: 0, //任务id
    id: 0, //用户id
    userin: "", //备注
    upfile: "", //图片集
    files: [], //图片数据
    fileimg: [], //图片数组
    index: 0, //图片下标
    content: "",
  },

  quwei: function () {
    wx.setNavigationBarTitle({
      title: '任务详情'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.quwei()
    var that = this;
    this.setData({
      taskid: options.taskid,
      id: wx.getStorageSync('id')
    })
    wx.request({
      url: app.globalData.url + "/taskDetails",
      data: {
        taskID: that.data.taskid,
        userId: that.data.id
      },
      header: {
        'content-type': 'opplication/json'
      },
      success(res) {
        var statu = res.data.statusInfo; //状态
        var lists = res.data.data;
        let aa = lists.createTime;
        let bb = lists.endTime;
        that.setData({
          content: lists.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
        })
        WxParse.wxParse('content', 'html', that.data.content, that, 5);
        //计算时间
        var create = timefor.formatTimeTwo(aa, 'Y/M/D h:m:s');
        var end = timefor.formatTimeTwo(bb, 'Y/M/D h:m:s');
        var ti = timefor.shijiancha(create, end);
        that.setData({
          list: lists,
          time: ti
        })
        if (statu == 1) { //已领取
          that.setData({
            taskpull: false
          })
        } else if (statu == 2 || statu == 5 || statu == 3 || statu == 4) { //放弃||审核失败||等待审核||已完成
          that.setData({
            taskpull: true,
            fucktask: false
          })
        } else if (statu == 0) { //未领取
          that.setData({
            taskpull: true
          })
        }
      }
    })
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })

  },
  //上传图片
  chooseImage: function () {
    var that = this;
    var tempFilePaths = res.tempFilePaths
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      url: 'Userupload/addimage',
      filePath: tempFilePaths[0],
      name: 'files',
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // console.log(123)
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },


  previewImage(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
},
  selectFile(files) {
    // console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    let _this = this;
    // console.log('upload files', files.tempFilePaths);
    this.data.files.push(files.tempFilePaths[0])
    var that = this; // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      const tempFilePaths = files.tempFilePaths;
      that.setData({
        filesUrl: tempFilePaths
      })
      var object = {};
      object['urls'] = tempFilePaths;
      resolve(object);
    })
  },
  uploadError(e) {
    // console.log('upload error', e.detail)
  },

  uploadSuccess(e) {
    let _this = this;
    // console.log(this.data.files[0])
    // console.log(e.detail.urls[0])
    wx.uploadFile({
      url: app.globalData.url + "/upload",
      filePath: e.detail.urls[0],
      name: 'file',
      header: {
        'content-type': 'application/json',
      },
      formData: {
        file: e.detail.urls[0]
      },
      success: function (res) {
        var e = JSON.parse(res.data)
        // console.log(e.data);
        _this.setData({
          ['fileimg[' + _this.data.index + ']']: e.data,
          index: _this.data.index + 1
        })
      },
      fail: function (res) {
        console.log("错误")
      }
    })

  },

  //点击领取任务
  pull() {
    this.setData({
      taskhit: true
    })
  },
  //风险提示 取消
  taskcelbtn() {
    this.setData({
      taskhit: false
    })
  },
  //风险提示 确定
  tasksurebtn() {
    let that = this;
    wx.request({
      url: app.globalData.url + "/taskGain",
      data: {
        taskId: that.data.taskid,
        id: that.data.id,
      },
      header: {
        'content-type': 'opplication/json'
      },
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            taskhit: false,
            hin: true,
            tishi: "领取成功！快去完成任务吧",
          })
          setTimeout(() => {
            that.setData({
              hin: false,
              taskpull: false
            })
          }, 1500);
        } else {
          that.setData({
            taskhit: false,
            hin: true,
            tishi: res.data.message,
          })
          setTimeout(() => {
            that.setData({
              hin: false,
            })
          }, 1500);
        }
      }
    })

  },
  //放弃任务
  taskup() {
    this.setData({
      exit: true
    })
  },
  //放弃任务提示 取消
  cancelbtn() {
    this.setData({
      exit: false
    })
  },
  //备注
  textva(e) {
    // console.log(e.detail.value);
    this.setData({
      userin: e.detail.value
    })
  },
  //放弃任务提示 确定
  surebtn() {
    var that = this;
    wx.request({
      url: app.globalData.url + "/taskAbandon",
      data: {
        id: that.data.taskid,
        userId: that.data.id,
      },
      header: {
        'content-type': 'opplication/json'
      },
      success(res) {
        that.setData({
          exit: false,
          taskpull: true,
          fucktask: false,
        })
      }
    })
  },
  //提交任务
  taskupload() {
    let that = this;
    // console.log(that.data.fileimg.length);
    if (that.data.fileimg.length == 0) {
      that.setData({
        hint: true
      })
    } else {
      var filelists = that.data.fileimg.join(',')
      that.setData({
        upfile: filelists
      })
      wx.request({
        url: app.globalData.url + "/taskSubmit",
        data: {
          id: that.data.taskid,
          userId: that.data.id,
          file: that.data.upfile,
          userInfo: that.data.userin
        },
        header: {
          'content-type': 'opplication/json'
        },
        success(res) {
          // console.log(res);
          if (res.data.code == 0) {
            that.setData({
              hin: true,
              tishi: "提交成功！"
            })
            setTimeout(() => {
              that.setData({
                hin: false,
                taskpull: true,
                fucktask: false,
              })
            }, 1500);
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/home/home',
              })
            }, 1500);
          } else {
            that.setData({
              hin: true,
              tishi: "提交失败，请重试！"
            })
            setTimeout(() => {
              that.setData({
                hin: false
              })
            }, 1500);
          }
        }
      })

    }

  },
  //提示上传图片 确定
  hintbtn() {
    this.setData({
      hint: false
    })
  },
  // 返回
  back() {
    wx.switchTab({
      url: '../home/home',
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