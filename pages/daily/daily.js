// pages/listdetails/listdetails.js
const {
  network,
  dateFormat
} = require('./../../utils/util');


Page({
  /**
   * 页面的初始数据
   */
  data: {
    bgpic: "../../static/bgpic.jpg",
    music: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    // 十秒后自动关闭, 或加载成功关闭
    setTimeout(function () {
      wx.hideLoading()
    }, 10000)

    let day = (new Date()).dateFormat("dd"),
      month = (new Date()).dateFormat("MM");
    this.setData({
      day,
      month
    });
    network('/recommend/songs', {
      cookie: wx.getStorageSync('token')
    }).then(
      back => {
        let music = back.data.data.dailySongs,
          ids = '';
        // 取出所有歌曲id
        for (let i in music)
          ids = ids.concat(i > 0 ? ',' : '', music[i].id)

        this.setData({
          music,
          ids: ids.split(",").sort((a, b) => {
            return a - b
          })
        })
        wx.hideLoading()
      }
    )
  },

  /**
   * 点击某一首音乐
   */
  musictap: function (e) {
    let id = e.currentTarget.dataset.musicid;
    wx.setStorageSync("ids", [id]);
    wx.navigateTo({
      url: "../play/play"
    });
  },

  /**
   * 点击播放列表全部
   */
  playAll: function (e) {
    let id = this.data.ids[0],
      ids = this.data.ids;
    wx.setStorageSync("ids", ids);
    wx.navigateTo({
      url: "../play/play"
    });
  },

  /**
   * 点击播放MV
   */
  mvtap: function (e) {
    let mvid = e.currentTarget.dataset.musicmv;
    console.log("播放MV " + mvid);
    wx.setStorageSync("mvid", mvid);
  },

  /**
   * 关闭
   */
  close: function (e) {
    wx.navigateBack()
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