// pages/login/login.js
const {
  $Toast
} = require('../../dist/base/index');
var {
  $network,
  network
} = require('../../utils/util');
var {
  hex_md5
} = require('../../utils/md5');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: ""
  },
  alert: function () {
    $Toast({
      content: '未做功能，仅供参考',
      type: 'warning'

    });
  },
  get_user_info(event) {
    var state = event.currentTarget.dataset.name == "username" ? this.setData({
      username: event.detail.detail.value
    }) : this.setData({
      password: event.detail.detail.value
    });
  },
  login() {
    if (this.data.username == "" || this.data.password == "") {
      $Toast({
        content: '请输入用户名或密码',
        type: 'error'
      });
    } else {
      var md5_password = hex_md5(this.data.password);
      network("/login/cellphone", {
        phone: this.data.username,
        md5_password
      }).then((res) => {
        if (res.data.code == 200) {
           wx.setStorageSync("token",res.data.cookie);
           wx.setStorageSync("userid", res.data.account.id)
          $Toast({
            content: '登陆成功',
            type: 'success'
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/index/index',
            })
          }, 1000)
        } else if (res.data.code == 502) {
          $Toast({
            content: '手机号或密码错误',
            type: 'error'
          });
        } else {
          $Toast({
            content: '请求错误，请检查接口是否正常',
            type: 'error'
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面 加载
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