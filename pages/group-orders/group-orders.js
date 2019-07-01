Page({
  data: {
    orders: [],
    per_page: 10,
    page: 1,
  },

  onLoad: function () {
    var that = this;
    that.orders();
  },


  orders: function () {
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    var token_type = wx.getStorageSync('token_type');

    // wx.request({
    //   url: '#',
    //   method: 'get',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'Authorization': token_type + ' ' + access_token,
    //   },
    //   data: {
    //     per_page: that.data.per_page,
    //     page: that.data.page
    //   },
    //   success: function (res) {
    //     var code = res.data.code;
    //     if (code == 0) {
    //       if (res.data.page <= res.data.pages) {
    //         var tempArray = that.data.orders;
    //         tempArray = tempArray.concat(res.data.orders);
    //         that.data.page = that.data.page + 1;
    //         that.setData({
    //           orders: tempArray
    //         })
    //         wx.hideLoading();
    //         wx.hideNavigationBarLoading();
    //       }
    //       else {
    //         wx.showToast({
    //           title: '加载完了',
    //           icon: 'none'
    //         })
    //         wx.hideLoading();
    //         wx.hideNavigationBarLoading();
    //       }
    //     } else {
    //       app.errorhandle(res.data)
    //     }

    //   }
    // })
  },

  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    that.data.page = 1;
    that.setData({
      orders: []
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
    that.orders();
  },

  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},


})