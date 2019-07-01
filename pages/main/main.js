const app = getApp()

Page({
  data: {
    imgUrls: [{
        src: '../../image/b2.jpg',
        // src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530620804454&di=2f8a899dd93dbee211406b073901c32f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F57f9aee102abb.jpg',
        name: '积木课程全新升级，优质爆款强势来袭'
      },
      {
        src: '../../image/b4.jpg',
        // src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530620737629&di=2728d37857762ceb8b103c02b9542604&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201408%2F05%2F094437hnnxwqroq2on2oof.jpg',
        name: '有声读物，暖暖上新',
      },
      {
        src: '../../image/b3.jpg',
        // src:
        //   'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530620866308&di=4f18b93a0a0e5c36f340a27070159847&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F5744200be7026.jpg',
        name: '全脑开发，家庭教学视频'
      },
    ],
    indicatorDots: false,
    current: 0,
    autoplay: true,
    interval: 4000,
    duration: 1000,
    swiperTotal: 3,
    swiperCurrent: 1,
  },
  swiperChange: function(e) {
    // console.log(e.detail.current);
    this.setData({
      swiperCurrent: e.detail.current + 1 //获取当前轮播图片的下标
    })
  },

  onLoad: function() {},
 
  //跳转到商家详情页
  shopDetails: function() {
    wx.navigateTo({
      url: '../shop-details/shop-details'
    })
  },
})