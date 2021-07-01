// components/progress/progress.js
var startPoint;
const min = 74;
const max = 288;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentProgress: {
      type: Number,
      value: 0
    },
    maxProgress: {
      type: Number,
      value: 100
    },
    canSlide: {
      type: Boolean,
      value: true
    },
    currentDur: {
      type: String,
      value: "00:00"
    },
    totalDur: {
      type: String,
      value: "04:30"
    },
    slideImg: {
      type: String,
      value: "../../static/progress_m.png"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    buttonLeft: 80,
    progress: 0,
    percentage: 20
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        buttonLeft: this.properties.currentProgress * (max - min) / this.properties.maxProgress + min,
        progress: this.properties.currentProgress * (max - min) / this.properties.maxProgress
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    buttonStart: function (e) {
      startPoint = e.touches[0]
    },
    buttonMove: function (e) {
      if (!this.properties.canSlide) return;

      let endPoint = e.touches[e.touches.length - 1],
        translateX = endPoint.clientX - startPoint.clientX,
        translateY = endPoint.clientY - startPoint.clientY

      startPoint = endPoint;
      let buttonLeft = this.data.buttonLeft + translateX;
      if (buttonLeft > max) return
      if (buttonLeft < min) return
      this.setData({
        buttonLeft: buttonLeft,
        progress: buttonLeft - min,
        percentage: ((buttonLeft - min) / (max - min) * this.properties.maxProgress).toFixed(1)
      })
    },

    buttonEnd: function (e) {

    },

    formatTime(s) {
      let time = s | 0;
      if (time >= 60 && time <= 3600) {
        time = addZero(parseInt(time / 60)) + ":" + addZero(time % 60);
      } else {
        if (time > 3600) {
          time = addZero(parseInt(time / 3600)) + ":" + addZero(parseInt(((time % 3600) / 60))) + ":" + addZero(time % 60);
        } else {
          time = '00:' + addZero(time);
        }
      }
      return time;
    },

    addZero(num) {
      return (Array(2).join('0') + num).slice(-2);
    },

    /**
     * 初始化总时长
     */
    init(total) {
      this.properties.currentProgress = 0;
      this.properties.maxProgress = total;
      // this.properties.totalDur = this.formatTime(total);
    },

    /**
     * 获取进度
     */
    getCurrentProgress() {
      return this.data.percentage
    },
    customMethod(){
      console.log('hello world! I am learning 微信小程序')
    },

    /**
     * 设置进度
     */
    setCurrentProgress(progress) {
      // console.log(progress);
      this.setData({
        currentProgress: progress,
        buttonLeft: progress * (max - min) / this.properties.maxProgress + min,
        progress: progress * (max - min) / this.properties.maxProgress
      })
      // this.properties.currentDur = this.formatTime(progress);
    }
  }
})
