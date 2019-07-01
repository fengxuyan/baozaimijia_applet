const app = getApp();
Page({
  data: {
    imgUrls: [
      {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542280900606&di=bc2c5de81caf160bc32e10a02d70add2&imgtype=0&src=http%3A%2F%2Fwww.hebsport.gov.cn%2Fuploads%2Fallimg%2F161214%2F1-161214104435137.jpg',
  
      },
      {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530620737629&di=2728d37857762ceb8b103c02b9542604&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F05%2F094437hnnxwqroq2on2oof.jpg',
     
      },
      {
        src:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530620866308&di=4f18b93a0a0e5c36f340a27070159847&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F5744200be7026.jpg',

      },
    ],
   
    indicatorDots: true,
    current: 0,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    swiperTotal: 3,
    swiperCurrent: 1,
    animationData: {},

    id: '',
    title:'',
    event: {},
    shop: {},
    others: [],
    sales:[],
    sales_num: '',
    views:[],
    promoter_id:'',

    vindex: '',
    vshow: false,
    rticle_content:'',

    shop_n:'',
    actionSheetHidden: true,

    share_img_small: '',
    share_img_big: '',
    avatar_url:'',
    nickname: '',
    hidden: true,

    event_name:'',
    event_price:'',
    options:'',
    viewsp:'',
    shop_tel:'',

    //活动状态  1:未开始 2:进行中 3:已结束
    event_status: '',
   
  },
  listenerButton: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  listenerActionSheet: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onLoad: function (options) {
    var that = this;
    that.data.options = options;
    wx.setStorageSync('promoter_id', options.promoter_id);
    that.data.id = options.id;
    var access_token = wx.getStorageSync('access_token');
    var token_type = wx.getStorageSync('token_type');

    wx.request({
      url: app.url + '/info',
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': token_type + ' ' + access_token,
      },
      success: function (res) {

        if (res.data.code === 0) {
          console.log(res)
          that.data.avatar_url = res.data.user.avatar_url
          that.data.nickname = res.data.user.nickname
        } else {
          app.errorhandle(res.data)
        }
      }
    })

  },
  onShow:function(){
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    var token_type = wx.getStorageSync('token_type');
    wx.request({
      // + that.data.id
      url: app.url + '/events/' + that.data.id,
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': token_type + ' ' + access_token,
      },
      success: function (res) {
      
        console.log(res.data)

        if (res.data.code === 0) {
          that.data.shop_n = res.data.shop.shop_name
          WxParse.wxParse('detiel', 'html', JSON.parse(JSON.stringify(res.data.event.content).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')), that, 5);
          that.data.event_name = res.data.event.title;
          that.data.event_price = res.data.event.price;
          that.data.share_img_small = res.data.wxacode;
          that.data.share_img_big = res.data.event.cover_url;

          that.data.viewsp = res.data.shop.views;
          that.data.shop_tel = res.data.shop.shop_tel;
          wx.setNavigationBarTitle({
            title: res.data.event.title
          });
          that.setData({
            event: JSON.parse(JSON.stringify(res.data.event).replace(/\u00A0|\u2028|\u2029|\uFEFF/g, '')),
            shop: res.data.shop,
            others: res.data.others,
            sales: res.data.sales,
            views: res.data.views,
        
          });

          wx.downloadFile({
            url: that.data.share_img_big,
            success: function (res) {// 背景图
              wx.downloadFile({
                url: that.data.share_img_small,
                success: function (res1) {//  小程序二维码图
                  that.convas(res.tempFilePath, res1.tempFilePath);
                },
                fail: function () {}
              });
            },
            fail: function () {

            }
          });

          var i = 0;
          var animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'linear',
          })
          that.animation = animation;
          setInterval(function () {
            if (i < res.data.sales.length) {
              animation.opacity(1).step();
              that.setData({
                vindex: i,
                vshow: true
              });
              i++;
            } else {
              i = 0;
            }
            animation.opacity(0).step();
            that.setData({
              animationData: animation.export()
            })
          }, 2000)
        } else {
          app.errorhandle(res.data)
        }
      }
    })
  },

  onReady: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation;
  },
  shopDetails: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var promoter_id = wx.getStorageSync('promoter_id');
    wx.navigateTo({
      url: '../shop-details/shop-details?id=' + id + '&title=' + title + '&promoter_id=' + promoter_id
    })
  },
  linkActivity: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    var title = event.currentTarget.dataset.title;
    var promoter_id = wx.getStorageSync('promoter_id');
    wx.navigateTo({
      url: '../activity-details/activity-details?id=' + id + '&title=' + title + '&promoter_id=' + promoter_id
    })
  },
  linkIncome: function () {
    wx.navigateTo({
      url: '../my-income/my-income'
    })
  },
  linkfillUserInfo: function (event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../fill-userinfo/fill-userinfo?id=' + id
        // url: '../fill-userinfo/fill-userinfo?id=' + id + '&promoter_id=' + that.data.promoter_id
    })
  },
  onShareAppMessage: function (res) {
    var that = this;

    var user_id = wx.getStorageSync('user_id');

    if (!user_id) {
      wx.navigateTo({
        url: '../authorize/authorize'
      })
    } else {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: that.data.event_name,
        path: 'pages/activity-details/activity-details?promoter_id=' + user_id + '&id=' + that.data.id + "&title=" + that.data.title
      }
    }
  },
  convas: function (bgImg, ewrImg) {
    var that = this;
    const ctx = wx.createCanvasContext('shareImg');
    //主要就是计算好各个图文的位置
    ctx.drawImage('../../image/canvas-bg-01.png', 0, 0, 545, 771);
    // ctx.drawImage(headImg, 30, 30, 50, 50);
    // ctx.setTextAlign('left');
    // ctx.setFillStyle('black');
    // ctx.setFontSize(18)
    // ctx.fillText("@ "+that.data.nickname, 100, 50)

    // ctx.setTextAlign('left');
    // ctx.setFillStyle('#999');
    // ctx.setFontSize(14)
    // ctx.fillText('参与了一个有趣的活动，邀请你一起加入～', 100, 75, 200)

    ctx.drawImage(bgImg, 14, 13, 516, 300);
    ctx.drawImage(ewrImg, 215, 595, 120, 120);
    ctx.setTextAlign('left');
    ctx.setFillStyle('black');
    ctx.setFontSize(26)

    var str = that.data.event_name;
    var lineWidth = 0;
    var canvasWidth = 500;//计算canvas的宽度
    var initHeight = 360;//绘制字体距离canvas顶部初始的高度
    var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        ctx.fillText(str.substring(lastSubStrIndex, i), 30, initHeight);//绘制截取部分
        initHeight += 40;//20为字体的高度
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == str.length - 1) {//绘制剩余部分
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), 30, initHeight);
      }
    }

    ctx.setTextAlign('left');
    ctx.setFillStyle('#f75c5a');
    ctx.setFontSize(38)
    ctx.fillText("¥" + that.data.event_price, 30, 425, 200)

    ctx.setTextAlign('left');
    ctx.setFillStyle('#3b3b3b');
    ctx.setFontSize(18)
    ctx.fillText(that.data.viewsp + '人浏览过', 410, 430, 200)

    ctx.setTextAlign('center');
    ctx.setFillStyle('#3b3b3b');
    ctx.setFontSize(18)
    ctx.fillText('长按参与活动', 270, 745, 200)
    ctx.stroke()
    ctx.draw()
  },
  /**
  * 生成分享图
  */
  share: function () {

    var that = this
    this.setData({
      actionSheetHidden: !that.data.actionSheetHidden
    })
    wx.showLoading({
      title: '努力生成中...'
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 545,
        height: 771,
        destWidth: 545,
        destHeight: 771,
        canvasId: 'shareImg',
        success: function (res) {
          that.setData({
            prurl: res.tempFilePath,
            hidden: false
          })
          wx.hideLoading()
        },
        fail: function (res) {

        }
      })
    },5000)
   
  },
  /**
   * 保存到相册
  */
  save: function () {
    var that = this
    //生产环境时 记得这里要加入获取相册授权的代码
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })
  },

  calling: function () {
    var that = this;
    var tel = that.data.shop_tel;
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function () {
   
      },
      fail: function () {
      
      }
    })
  },
  contact: function (event) {
  
    wx.navigateTo({
      url: '../contact/contact'
    })
  },

})
