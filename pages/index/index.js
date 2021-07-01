
const {network}=require('../../utils/util')
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:{},
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    index_incon:{},
    recommend:[],
    hot:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('token')==null||wx.getStorageSync('token')=='')
      wx.navigateTo({
        url: '/pages/login/login',
      })
		network('/homepage/block/page',{
    }).then(res=>{
      
      this.setData({
        res:res
      })
      // console.log(res);
    })
    network('/homepage/dragon/ball',{
    }).then(res=>{
      this.setData({
        index_incon:res.data
      })
    })
    network("/recommend/resource",{
      cookie:wx.getStorageSync('token')
    }).then(res=>{
      this.setData({
        recommend:res.data.recommend
      })
      // console.log(this.data.recommend)
    })

    network('/album/newest',{
    }).then(res=>{
      // console.log(res.data.albums);
      this.setData({
        hot:res.data.albums
      })
    })
  },
  goto(event){
    let url=''
    // console.log(event);
    switch(event.currentTarget.dataset.index){
      case 0:url="/pages/daily/daily";break;
      case 1:break;
      case 2:url="/pages/songClassify/songClassify";break;
      case 3:url="/pages/ranking/ranking";break;
      case 4:url="/pages/video/video";break;
    }
    if(url!=''){
    wx.navigateTo({
      url: url,
    })}
    else{
      wx.showToast({
        title: '再写头发就没了',
        icon:'error',
        duration:2000
      })
    }
  },
  open_input(){
    wx.navigateTo({
      url: '/pages/songSearch/songSearch',
    })
  },
  say_(){
    wx.showToast({
      title: '再写头发就没了',
      icon:'error',
      duration:2000
    })
  },
  gouser(){
    wx.navigateTo({
      url: '../songPersonal/songPersonal',
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