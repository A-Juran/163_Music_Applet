const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const timer=timestamp=>{
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    return Y+"年"+M+"月"+D+"日";
}


const dateFormat = Date.prototype.dateFormat = function (fmt) {
  let o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "H+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}



const network=(url,data)=>{   //网络请求
  var promise=new Promise(function(reslove,reject){
    wx.request({
      url: 'http://123.56.72.23:3000'+url, //接口地址
      method:"get",
      data:data,
      success:reslove,
      fail:()=>{
        console.log("请求失败")
      }
    })
  })
  return promise
}

function formatSeconds(time) {
  let timeStr = '';
    let stringFormat = (i) => {
        return i < 10 ? `0${i}` : `${i}`;
    }
    let minuteTime = 0;
    let secondTime = 0;
    let hourTime = 0;
    if(time < 60) {
        timeStr = `00:${stringFormat(time)}`
    } else if(time >= 60 && time < 3600) {
        minuteTime = parseInt(time / 60);
        secondTime = parseInt(time % 60);
        timeStr = `${stringFormat(minuteTime)}:${stringFormat(secondTime)}`;
    } else if(time >= 3600) {
        let _t = parseInt(time % 3600);
        hourTime = parseInt(time / 3600);
        minuteTime = parseInt(_t / 60);
        secondTime = parseInt(_t % 60);
        timeStr = `${stringFormat(hourTime)}:${stringFormat(minuteTime)}:${stringFormat(secondTime)}`
    }
    return timeStr;
}

module.exports = {
  formatTime,
  network,
  formatSeconds,
  timer
}