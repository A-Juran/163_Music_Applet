// components/small_player.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlay:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play(){
      console.log(this.data.isPlay)
      this.setData({
        isPlay:!this.data.isPlay
      })

    }
  }
})
