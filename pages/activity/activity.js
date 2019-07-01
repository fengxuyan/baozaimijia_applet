Page({
  data: {
    imgUrls: [
      {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530681611298&di=a1f281e19d21a0968e788fa9e78807de&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e349556868540000012716d62085.jpg%401280w_1l_2o_100sh.jpg',
        name: '69.9元包含600元名师1对1精品3节课程+338元冰丝养生凉席套装338元冰丝养生凉席套装338元冰丝养生凉席套装',
      },
      {
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530620804454&di=2f8a899dd93dbee211406b073901c32f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F57f9aee102abb.jpg',
        name: '69.9元包含1次儿童360牙齿清洁、1次儿童畸形筛查、338元冰丝养生凉席'
      },
      {
        src:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530620866308&di=4f18b93a0a0e5c36f340a27070159847&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F5744200be7026.jpg',
        name: '799元疯抢价值1900元24节精品课程+338元冰丝凉席'
      },
    ],
    indicatorDots: true,
    vertical:true,
    current: 0,
    autoplay: false,
    interval: 4000,
    duration: 1000,
    swiperTotal: 3,
    swiperCurrent: 1,
  },
  swiperChange: function (e) {
    console.log(e.detail.current);
    this.setData({
      swiperCurrent: e.detail.current + 1   //获取当前轮播图片的下标
    })
  },

})