const {
  network,
  dateFormat
} = require("../../utils/util")

// pages/singer/singer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}, // 歌手信息
    music: {}, // 音乐详情列表
    ids: [] // 音乐ID列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = wx.getStorageSync('singerid') * 1;
    console.log(id);
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    // 十秒后自动关闭, 或加载成功关闭
    setTimeout(function () {
      wx.hideLoading()
    }, 10000)

    // 获取歌手信息
    network('/artist/detail', {
      id
    }).then(back => {
      if (back.data.data.code == 404) {
        wx.navigateBack()
        return
      }
      back.data.data.user.birthday = (new Date(back.data.data.user.birthday)).dateFormat("yyyy-MM-dd")
      this.setData({
        detail: back.data.data
      })
    })

    // 获取歌手歌曲列表
    network('/artist/songs', {
      id
    }).then(back => {
      let ids_ = back.data.songs;
      let ids = '';
      // 取出所有歌曲id
      for (let i in ids_)
        ids = ids.concat(i > 0 ? ',' : '', ids_[i].id)
      this.setData({
        ids: ids.split(",").sort((a, b) => {
          return a - b
        })
      })

      // 获取所有歌曲详细信息
      network('/song/detail', {
        ids
      }).then((back) => {
        let music = {}
        // 格式化数据, 将歌曲id设为key
        for (let i in back.data.songs)
          music[back.data.songs[i].id] = back.data.songs[i]

        this.setData({
          music
        })
        wx.hideLoading()
      });
    })
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