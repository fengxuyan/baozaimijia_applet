const app = getApp();

Page({
  data: {
    total_commission:'',
    today_commission:'',
    max_commission:'',


    commissions:[],
    per_page: 10,
    page: 1,
  },
  onLoad: function (options) {
    var that = this;
    that.profit();
    that.commissions();
  },

  // 我的收益
  profit: function () {
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    var token_type = wx.getStorageSync('token_type');

    wx.request({
      url: app.url + '/profit',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token_type + ' ' + access_token,
      },
      data: {},
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            total_commission: res.data.total_commission,
            today_commission: res.data.today_commission,
            max_commission: res.data.max_commission
          })
        } else {
          app.errorhandle(res.data);
        }
      },
      fail: function () {
        console.log('系统错误')
      }
    })

  },
  // 收益记录
  commissions:function(){
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    var token_type = wx.getStorageSync('token_type');

    wx.request({
      url: app.url + '/commissions',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token_type + ' ' + access_token,
      },
      data: {
        per_page: that.data.per_page,
        page: that.data.page
      },
      success: function (res) {
        var code = res.data.code;
        if (code == 0) {
          if (res.data.page <= res.data.pages) {
            var tempArray = that.data.commissions;
            tempArray = tempArray.concat(res.data.commissions);
            that.data.page = that.data.page + 1;
            that.setData({
              commissions: tempArray
            })
            wx.hideLoading();
            wx.hideNavigationBarLoading();
          }
          else {
            wx.showToast({
              title: '加载完了',
              icon: 'none'
            })
            wx.hideLoading();
            wx.hideNavigationBarLoading();
          }
        } else {
          app.errorhandle(res.data)
        }

      }
    })
  },

  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    that.data.page = 1;
    that.setData({
      commissions: []
    })
    that.getMerchant();
    // 停止下拉动作  
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function () {
    var that = this;
    //显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    that.commissions();
  },


  myOrder: function () {
    wx.navigateTo({
      url: '../my-orders/my-orders'
    })
  },
})