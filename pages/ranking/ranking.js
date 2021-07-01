// pages/ranking/ranking.js
var {
  $network,
  network
} = require('../../utils/util');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rankinglist: [],
    subscribedCount: 0,
    sharecount: 0,
    commentCount: 0,
    spinShow: true,
  },
  close: function (e){
    wx.navigateBack()
  },
  playall:function(){
    var list=[];
    this.data.rankinglist.forEach((item)=>{
          list.push(item.id)
    })
    wx.setStorageSync("ids",list);
    wx.navigateTo({
      url: '../../pages/play/play',
    })
  },
  playmusic:function(envent){
    var list=[];
    list.push(envent.target.dataset.id);
    wx.setStorageSync("ids",list);
    wx.navigateTo({
      url: '../../pages/play/play',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network("/playlist/detail?id=3778678").then((res) => {
      var subscribedCount = res.data.playlist.subscribedCount;
      var sharecount = res.data.playlist.shareCount;
      var commentCount = res.data.playlist.commentCount;
      subscribedCount = subscribedCount < 10000 ? subscribedCount : (subscribedCount / 10000).toFixed(1) + "万";
      commentCount = commentCount < 10000 ? commentCount : (commentCount / 10000).toFixed(1) + "万";
      this.setData({
        rankinglist: res.data.playlist.tracks,
        subscribedCount,
        sharecount,
        commentCount,
        spinShow: false
      })
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