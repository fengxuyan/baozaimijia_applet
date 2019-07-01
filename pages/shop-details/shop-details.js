
Page({
  data: {
    height: "50px",
    info: 'shrink',
    show: true,
    imgUrls: [{
  
      src:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542189662365&di=e5f76e360e45d003ac7b3a424230a98e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F279759ee3d6d55fb0bb3321c66224f4a20a4dd97.jpg',
      name: ''
    }, {
        src:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542189615680&di=f11228898e930fecd537750c1a5fed0d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0129c159366685a8012193a3b3095e.jpg%401280w_1l_2o_100sh.jpg',
        name: ''
      }, {
        src:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542189892859&di=4d73bb7500de8f590c3485301f2d040b&imgtype=0&src=http%3A%2F%2Fpic1.shejiben.com%2Fi%2Fupload%2F2016%2F02%2F14%2F20160214170640-338b826d-2s.jpg',
        name: ''
      },
      ],
   

    teacher: [
      {
        cover_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542783980&di=264166bc15dd48735422b691491d42f9&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9a504fc2d5628535b6fccdd49aef76c6a7ef6322.jpg',
        name: 'Marry',
        skill: '多元智能',
        info: '3年教龄'
      },
      {
        cover_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542189295256&di=5ba61bc4aff636e81d9eb5dc8c8f6a14&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fe824b899a9014c082fd7ce38007b02087af4f4bb.jpg',
        name: '王老师',
        skill: '积木建构',
        info: '2年教龄'
      },
      {
        cover_url:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542189354813&di=2f895537cedc5d58008ed0e7672403b7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D3ba55a3a03f79052fb124f7d649abdbf%2F9922720e0cf3d7ca60ca165ff81fbe096b63a9de.jpg',
        name: '杜老师',
        skill: '思维数理',
        info: '5年教龄'
      },
      {
        cover_url:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542189450078&di=e2c238fa8c7aba0949c8021c156c08e7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D58c37553e1f81a4c323fe48abf430a2c%2F500fd9f9d72a605971dd263d2234349b023bbacc.jpg',
        name: '曾老师',
        skill: '全脑开发',
        info: '3年教龄'
      }
    ],

    orderTips:
    {
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530620804454&di=2f8a899dd93dbee211406b073901c32f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F57f9aee102abb.jpg',
      name: '一笑倾城',
      time: '浏览过此店铺'
    },
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
  },
  onLoad: function (options) {

  },
  clickDown: function () {
    this.setData({
      show: false,
      info: 'expand',
    })
  },
  clickUp: function () {
    this.setData({
      show: true,
      info: 'shrink',
    })
  },


  onReady: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation;
    var flag = false;
    setInterval(function () {
      if (!flag) {
        animation.opacity(0).step();
        flag = true;
      } else {
        animation.opacity(1).step();
        flag = false;
      }
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 2000)
  },
  // swiper
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  linkCourse: function () {
    wx.navigateTo({
      url: '../link-activity/link-activity'
    })
  },
  linkAudition: function () {
    wx.navigateTo({
      url: '../reserve-audition/reserve-audition'
    })
  },
  linkActivity: function () {
    wx.navigateTo({
      url: '../activity-details/activity-details'
    })
  },


  getPos: function (event) {
    var lng = event.currentTarget.dataset.lng;
    var lat = event.currentTarget.dataset.lat;
    var latitude = parseFloat(lat);
    var longitude = parseFloat(lng);

    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28
    })

  },
  calling: function (event) {

    wx.makePhoneCall({
      phoneNumber: '025-86102762',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

})