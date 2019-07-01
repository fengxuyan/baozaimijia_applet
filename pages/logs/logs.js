const myaudio = wx.createInnerAudioContext()
Page({
  data: {
    is_play: true,
    currentPosition: 0,
    duration: 0,
    sliderValue: 0,
poster:'http://static.missevan.com/coversmini/201512/28/40896f3b1724dbb02a2d9c418b8dff80161140.jpg?x-oss-process=image/format,webp'
  },
  onLoad: function(options) {

  },
  onReady: function() {},
  onShow: function() {
    myaudio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46';
  },

  audio_play: function() {
    var that = this;
    console.log('audio_play')
    console.log(that.data.is_play)
    if (that.data.is_play === true) {
      myaudio.play();
      myaudio.onPlay((res) =>
        that.updateTime(that)
      )
      this.setData({
        is_play: false
      })
    } else {
      myaudio.pause();
      this.setData({
        is_play: true
      })
    }
  },
  //监听音频播放进度更新事件
  updateTime: function(that) {
    myaudio.onTimeUpdate((res) => {
      //更新时把当前的值给slide组件里的value值。slide的滑块就能实现同步更新
      // console.log("总时长", Math.floor(myaudio.duration));
      // console.log("当前播放进度", Math.floor(myaudio.currentTime)); 

      that.setData({
        currentPosition: that.stotime(Math.floor(myaudio.currentTime)),
        duration: that.stotime(Math.floor(myaudio.duration)),
        sliderValue: Math.floor(myaudio.currentTime * 100 / myaudio.duration),

        
        
      })
    })
    //播放到最后一秒
    if (myaudio.duration.toFixed(2) - myaudio.currentTime.toFixed(2) <= 0) {
      that.setStopState(that)
    }
    myaudio.onEnded(() => {
      that.setStopState(that)
    })
  },
  setStopState: function(that) {
    var that = this;
    that.setData({
      currentPosition: 0
    })
    myaudio.stop()
  },

  bindSliderchange: function(e) {
    // clearInterval(this.data.timer)
    var value = e.detail.value
    var that = this;
    console.log('滑动' + e.detail.value)
    that.setData({
      sliderValue: value
    })
  },
  stotime: function (s) {
    let t = '';
    if (s > -1) {
      // let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      // if (hour < 10) {
      //   t = '0' + hour + ":";
      // } else {
      //   t = hour + ":";
      // }
      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    return t;
  },

})