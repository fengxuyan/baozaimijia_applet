Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo)
            }
          })
        }
      }
    })
  },



  bindGetUserInfo: function (event) {
    var that = this;
    console.log(event.detail.userInfo)
    //使用
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            success: function (res) {
              var code = res.code;//登录凭证
              if (code) {
                //2、调用获取用户信息接口
                wx.getUserInfo({
                  lang: 'zh_CN',
                  success: function (res) {
                    // console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                    //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                    wx.request({
                      url: 'http://112.74.127.99:8005/api/login',//自己的服务接口地址
                      method: 'post',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      data: {
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        code: code
                      },
                      success: function (res) {
                        console.log(JSON.stringify(res.data));
                        //4.解密成功后 获取自己服务器返回的结果
                        if (res.data.code == 0) {
                          var userInfo_ = JSON.stringify(res.data.data);

                          that.setData({
                            userInfo: userInfo_
                          })

                          wx.setStorageSync('access_token', res.data.data.access_token);
                          wx.setStorageSync('token_type', res.data.data.token_type);
                          wx.setStorageSync('user_id', res.data.data.user_id);

                          wx.showToast({
                            title: '授权成功',
                            icon: 'none'
                          })
                          setTimeout(function () {
                            wx.navigateBack();
                          }, 1000)

                        } else {

                        }

                      },
                      fail: function () {
                        console.log('系统错误')
                      }
                    })
                  },
                  fail: function () {
                    console.log('获取用户信息失败')
                  }
                })

              } else {
                console.log('获取用户登录态失败！' + r.errMsg)
              }
            },
            fail: function () {
              console.log('登陆失败')
            }
          })

        } else {
          console.log('获取用户信息失败')
        }

      }
    })

  }


})