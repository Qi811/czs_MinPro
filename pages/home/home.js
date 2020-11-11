// pages/home/home.js
const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: 'tabs',
      path: 'page/weui/example/tabs/tabs'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      name: "赏金榜",
      url: "http://m.qpic.cn/psc?/V50dOJzn1X8x9j30JRSn1m2wvI1zBnm3/45NBuzDIW489QBoVep5mcesBqAPA*cJfxm2mQ3dbJO3luatI636KXl0iMNLnMv.Wx*1PYjO2TuqUc0tHHhaRSGLCV6QkF6K1V3UiMOIUFx8!/b&bo=SQBYAAAAAAADFyM!&rf=viewer_4&t=5"
    }, {
      name: "低价区",
      url: "http://m.qpic.cn/psc?/V50dOJzn1X8x9j30JRSn1m2wvI1zBnm3/45NBuzDIW489QBoVep5mcQV9xElmR5tvUJUhFNbB2Sv4iHUwnN.FfVmjbQIBbn8MUe0lRQvwnA9kICE1NiUPLdgbfsLuJs94tNCmpZqKeis!/b&bo=TQBNAAAAAAADFzI!&rf=viewer_4&t=5"
    }, {
      name: "高价区",
      url: "http://m.qpic.cn/psc?/V50dOJzn1X8x9j30JRSn1m2wvI1zBnm3/45NBuzDIW489QBoVep5mcQV9xElmR5tvUJUhFNbB2Su0UYi4wso3gOZ2NtCI2ZuUmHbWZvKbuQ3SK5AvoKyw6w0yQAv*TOBUXST.0veXjOE!/b&bo=TgBOAAAAAAADFzI!&rf=viewer_4&t=5"
    }],
    tabs: [],
    activeTab: 0,
    tabsheight: 0,
    taskdiv: true,
    nullson: true, //暂无更多
    overlength: 10,
    pagenum: 2,
  },

  quwei: function () {
    wx.setNavigationBarTitle({
      title: '全部任务'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.quwei()
    var that = this;
    const tabs = [{
        title: '全部任务',
        list: []
      },
      {
        title: '最新任务',
        list: []
      }
    ]

    if (wx.getStorageSync('id') == null || wx.getStorageSync('id') == undefined || wx.getStorageSync('id') == "") {
      that.setData({
        nullson: false
      })
    } else {
      wx.request({
        url: app.globalData.url + "/taskList",
        data: {
          page: 1,
          size: 100,
          price: "",
          userId: wx.getStorageSync('id')
        },
        header: {
          'content-type': 'opplication/json'
        },
        success(res) {
          var li = res.data.data;
          that.setData({
            'tabs[0].list': li
          })
          // for(var i=0;i<li.length;i++){
          //   tabs[0].list.push(li[i])
          // }
        }
      })
      wx.request({
        url: app.globalData.url + "/taskNewList",
        data: {
          userId: wx.getStorageSync('id')
        },
        header: {
          'content-type': 'opplication/json'
        },
        success(res) {
          var lists = res.data.data;
          that.setData({
            'tabs[1].list': lists
          })
        }
      })
    }
    that.setData({
      tabs: tabs
    })
    that.tabsheight();
  },

  // tabs事件
  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    if (index == 0) {
      wx.setNavigationBarTitle({
        title: '全部任务'
      })
    } else if (index == 1) {
      wx.setNavigationBarTitle({
        title: '最新任务'
      })
    }
  },
  tabsheight() {
    let index = this.data.activeTab;
    let h = this.data.tabs[index].list.length
    if (h == 0) {
      this.setData({
        taskdiv: true
      })
    } else {
      let hei = h * 72.1
      this.setData({
        tabsheight: hei,
        taskdiv: false
      })
    }
  },
  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
    this.tabsheight();
  },
  handleClick(e) {

  },
  // 标题栏点击跳转页面
  titleClick(e) {
    let tindex = e.currentTarget.dataset.index
    if (tindex == 0) {
      wx.request({
        url: app.globalData.url + '/unionLogin',
        header: {
          'content-type': 'application/json'
        },
        data: {
          userId: wx.getStorageSync('id')
        },
        success(res) {
          var url = res.data
          wx.setStorage({
            data: url,
            key: 'url',
            success(res) {
              wx.navigateTo({
                url: '../../phome/shangjb/shangjb',
              })
            }
          })
        }
      })
    } else if (tindex == 1) {
      wx.navigateTo({
        url: '../../phome/butomm/butomm',
      })
    } else if (tindex == 2) {
      wx.navigateTo({
        url: '../../phome/height/height',
      })
    }
  },
  // 任务详情
  taskClick(e) {
    let id = e.currentTarget.dataset.taskid
    wx.navigateTo({
      url: '../../phome/taskdetail/taskdetail?taskid=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
    let that = this;
    let size = 10;
    var listlength = this.data.tabs[0].list.length;
    var oversize = this.data.overlength;
    // console.log("数组长度："+listlength+"获取长度："+oversize);
    var num = this.data.pagenum;
    if (that.data.activeTab == 0) {
      if (listlength == oversize) {
        wx.request({
          url: app.globalData.url + "/taskList",
          data: {
            page: num,
            size: size,
            price: "",
            userId: wx.getStorageSync('id')
          },
          header: {
            'content-type': 'opplication/json'
          },
          success(res) {
            var li = res.data.data;
            if (li.length == 0) {
              that.setData({
                nullson: false
              })
            } else {
              for (let i = 0; i < li.length; i++) {
                var len = listlength + i;
                that.setData({
                  nullson: true,
                  ['tabs[0].list[' + len + ']']: li[i],
                  pagenum: num + 1,
                  overlength: len + 1
                })
                that.tabsheight();
              }
            }
          }
        })
      } else {
        that.setData({
          nullson: false
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})