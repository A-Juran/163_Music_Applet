const { network } = require("../../utils/util")
const {createLrcObj}=require("../../utils/lyric")
const innerAudioContext = wx.createInnerAudioContext()
const {formatSeconds}=require('../../utils/util')
let timer=null
// pages/play/play.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isHidden:false,
    lyric:'',
    lyric_array:[],
    musci_url:'',
    isPlay:true,
    silde:0,
    lineNo:0,
    C_pos:6,
    duration:256,
    currentTime:0,
    currentSong:0,
    song_ids:[],
    picUrl:''
  },
  lyrics(){
    this.setData({
    isHidden:!this.data.isHidden
})
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    clearInterval(timer)
    this.drawing()

  },
  drawing(){
    this.setData({
      lyric:'',
      lyric_array:[],
      lineNo:0
    })
    let ids=wx.getStorageSync('ids')
    let ids_str=''
    if(ids.length<1){
      ids_str=ids[0]
    }
    else{
    for(let i in ids){
      ids_str+=ids[i]+','
    }
    ids_str=ids_str.substring(0,ids_str.length-1)
  }
    // console.log(ids_str);
    network('/song/detail',{ids:ids_str}).then(res=>{
      // console.log(res.data);
      // console.log(this.data.currentSong);
      //  console.log(res.data.songs[this.data.currentSong].al.picUrl);
      this.setData({
        song_ids:res.data.songs,
        picUrl:res.data.songs[this.data.currentSong].al.picUrl
      })
      // console.log(this.data.song_ids);
      network('/lyric',{id:this.data.song_ids[this.data.currentSong].id}).then(res=>{
        // console.log(res.data.lrc)
        if(res.data.lrc==undefined){
          lyric_array:[]
        }else{
        this.setData({
          lyric:res.data.lrc.lyric
        })

       const lyric_array=createLrcObj(this.data.lyric);
       this.setData({
        lyric_array:lyric_array
       })
       if(this.data.lyric_array.length<=0){
        this.setData({
          lyric_array:[
            {
              c:'此音乐当前没有歌词'
            }
          ]
        })
      }else{

        this.regarding()
      }
      //  console.log(this.data.lyric_array)
      }
      })
      network("/song/url",{id:this.data.song_ids[this.data.currentSong].id}).then(res=>{
        this.setData({
            musci_url:res.data.data[0].url
        })
              innerAudioContext.src =this.data.musci_url
              innerAudioContext.autoplay = true
              this.setData({
                duration:formatSeconds(parseInt(innerAudioContext.duration))
               })   
  })
    })
  },

  change(){
    this.setData({
      isPlay:!this.data.isPlay
    })
    if(this.data.isPlay){
      console.log('开始播放')
      this.regarding()
      innerAudioContext.play()
      
    }else{
      console.log('停止播放')
      clearInterval(timer)
      innerAudioContext.pause()
    }
  },

  regarding(){
    let myComponent = this.myComponent
   timer= setInterval(() => {
      this.setData({
        currentTime:formatSeconds(parseInt(innerAudioContext.currentTime)),
        duration:formatSeconds(parseInt(innerAudioContext.duration))
      })
      myComponent.setCurrentProgress(parseInt(innerAudioContext.currentTime))  // 调用自定义组件中的方法
      myComponent.init(parseInt(innerAudioContext.duration))  // 调用自定义组件中的方法
      if (parseFloat(this.data.lyric_array[this.data.lineNo].t) <= innerAudioContext.currentTime) {
        if (this.data.lineNo >this.data.C_pos) {
          this.setData({
            silde:(this.data.lineNo-this.data.C_pos)*(-60),
          })
      }
        this.setData({
          lineNo:this.data.lineNo+1
        })
    }
    innerAudioContext.onEnded(()=>{
      clearInterval(timer)
      this.next()
    })
    }, 100);
  },
  change_currenttime(e){
    const child = this.selectComponent('#progress');
    console.log(child)
  },
  onMyEvent: function(e){
    e.detail // 自定义组件触发事件时提供的detail对象
    console.log(e);
  },
  open_artists(){
    // console.log(this.data.song_ids[this.data.currentSong].ar[0].id);
    wx.setStorageSync('singerid', this.data.song_ids[this.data.currentSong].ar[0].id)
    wx.navigateTo({
      url: '/pages/artists/artists'
    })
  },
  open_comments(){

    wx.navigateTo({
      url: '/pages/comment/comment?id='+this.data.song_ids[this.data.currentSong].id
    })
  },
  back(){
    wx.navigateBack()
  },
  last(){
    if(this.data.song_ids.length<=1){
      wx.showToast({
        title: '当前只有单首音乐在播放清单',
        icon:'error',
        duration:1500
      })
    }else if(this.data.currentSong!=0){
      this.setData({
        currentSong:this.data.currentSong-1
      })
      clearInterval(timer)
      this.drawing()
    }else{
      wx.showToast({
        title: '当前已经是第一首了',
        icon:'error',
        duration:1500
      })
    }
  },
  next(){
    if(this.data.song_ids.length<=1){
      wx.showToast({
        title: '当前只有单首音乐在播放清单',
        icon:'error',
        duration:1500
      })
    }else if(this.data.currentSong!=this.data.song_ids.length){
      this.setData({
        currentSong:this.data.currentSong+1
      })
      clearInterval(timer)
      this.drawing()
    }else{
      wx.showToast({
        title: '当前已经是最后一首了',
        icon:'error',
        duration:1500
      })
    }
  },
  none_(){
    wx.showToast({
      title: '不想写了啊',
      icon:'error',
      duration:1500
    })
  },
  call_child(){
    let myComponent = this.myComponent
    myComponent.customMethod()  // 调用自定义组件中的方法
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.myComponent = this.selectComponent('#myComponent')
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