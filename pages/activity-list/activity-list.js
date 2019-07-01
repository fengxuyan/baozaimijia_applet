Page({
  data: {
    name:'',
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      name: options.name
    })
    console.log(options.name)
  },
  activityDetails: function () {
    wx.navigateTo({
      url: '../activity-details/activity-details'
    })
  },
})