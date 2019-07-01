//app.js
App({
  onLaunch: function () {
    var access_token = wx.getStorageSync('access_token');
    var token_type = wx.getStorageSync('token_type');
    if (access_token) {
      wx.request({
        url: '#',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': token_type + ' ' + access_token,
        },
        data: {

        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.setStorageSync('access_token', res.data.data.access_token);
          }
        },
        fail: function () {
          console.log('系统错误')
        }
      })
    } else {

    }

  },
  onLoad: function () { },

  // 统一错误处理
  errorhandle: function (data) {
    if (data.code == 401) {
      wx.navigateTo({
        url: '../authorize/authorize'
      })
    } else {
      var msg = data.msg;
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return
    }
  },

  globalData: {
    userInfo: null
  },
  // 接口地址
  url: '#'
})