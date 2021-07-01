// pages/comment/comment.js
var { $network, network }=require('../../utils/util');
var {$timer,timer}=require('../../utils/util');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    songid:33894312,
    comments:[]
  },
  change:function(event){
      this.setData({
        current:event.currentTarget.dataset.id
      })
      network('/comment/new?type=0?pageSize=100',{id:this.data.songid,sortType:this.data.current}).then((res)=>{
        this.setData({
          comments:res.data.data.comments
        })
        var array=this.data.comments;
        array.forEach((item,index)=>{
          array[index].time=timer(array[index].time);
        })
        this.setData({
          comments:array
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    
    
    this.setData({songid:options.id});
    network('/comment/new?type=0',{id:this.data.songid,sortType:this.data.current+1}).then((res)=>{
      this.setData({
        comments:res.data.data.comments
      })
      var array=this.data.comments;
      array.forEach((item,index)=>{
        array[index].time=timer(array[index].time);
      })
      this.setData({
        comments:array
      })
    }
    )
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