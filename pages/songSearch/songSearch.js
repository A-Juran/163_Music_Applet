const { network } = require("../../utils/util")

// pages/songSearch/songSearch.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    status: 0,
    navList: ['精品', '华语', '流行', '民谣', '电子', '轻音乐'],
    hotList: [],
    musicList:[],
    display:true
  },
  getStatus(e) {
    this.setData({
      status: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network('/search/hot/detail', ' ').then(res => {
      console.log(res);
      this.setData({
        hotList:res
      })
      console.log(this.data.hotList);
    })
  },
  // 搜索
  search(e){
   this.setData({
     content:e.detail.value,
     display:!this.data.display
   })
   network('/search',{keywords:this.data.content}).then(res=>{
    this.setData({
      musicList:res,
    })
    console.log(this.data.musicList);
  })
  },
  play(e){
    // console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.setStorageSync('ids',{id})
    wx.navigateTo({
      url: '../play/play'
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