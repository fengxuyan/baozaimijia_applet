const app = getApp();

Page({
  data: {
    ChildName: '',
    ParentsName: '',
    Phone: ''
  },
  onLoad: function (options) {
    var that = this;
    that.data.id = options.id;
  },

  // 获取基本信息
  getUserInfo:function(){
    
  },

  listenChildName: function (e) {
    this.data.ChildName = e.detail.value;
  },
  listenParentsName: function (e) {
    this.data.ParentsName = e.detail.value;
  },
  listenPhone: function (e) {
    this.data.Phone = e.detail.value;
  },
  pay:function(){
    // var that = this;
    // var event_id = that.data.id;
    // var parent_name = that.data.ParentsName;
    // var child_name = that.data.ChildName;
    // var phone = that.data.Phone;
  
    // var access_token = wx.getStorageSync('access_token');
    // var token_type = wx.getStorageSync('token_type');

    // wx.request({
    //   url: app.url + '/events/pay',
    //   method: 'post',
    //   data: {
    //     event_id: event_id,
    //     parent_name: parent_name,
    //     child_name: child_name,
    //     phone: phone
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     'Authorization': token_type + ' ' + access_token,
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     if (res.data.code == 0) {
      
    //     } else {
    //       app.errorhandle(res.data)
    //     }
    //   }
    // })
  },
  pay1: function () {
    wx.navigateTo({
      url: '../my-orders/my-orders'
    })
  },
  pay2: function () {
    wx.navigateTo({
      url: '../group-orders/group-orders'
    })
  }
})