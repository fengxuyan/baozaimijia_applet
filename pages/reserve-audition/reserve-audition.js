const app = getApp();

Page({
  data: {
    courses: [
      { 'name': '多元智能' }, { 'name': '思维数理' }, 
      { 'name': '全脑开发' }, { 'name': '积木建构' }
      ],
    carModelsIndex:[],
    carModelsIndexId:'',


    UserName:'',
    UserPhone:'',
    Remarks:'',

    index: 0
  },
  onLoad: function (options) {
    var that = this; 
  },
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
      index: e.detail.value
    })
    that.data.carModelsIndexId = that.data.carModelsIndex[e.detail.value]
  
  },
  listenName: function (e) {
    this.data.UserName = e.detail.value;
  },
  listenPhone: function (e) {
    this.data.UserPhone = e.detail.value;
  },
  listenRemarks:function(e){
    this.data.Remarks = e.detail.value;
  },
  reserve:function(){
    var that = this;
    var access_token = wx.getStorageSync('access_token');
    var token_type = wx.getStorageSync('token_type');
    var course_id = that.data.carModelsIndexId;
    var name = that.data.UserName;
    var phone = that.data.UserPhone;
    var remark = that.data.Remarks;

    console.log(course_id + '-' + name + '-' + phone + '-' + remark);

    wx.request({
      url: app.url + '/courses/appoint',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token_type + ' ' + access_token,
      },
      data: {
        course_id: course_id,
        name: name,
        phone: phone,
        remark: remark
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '预约成功！',
            icon: 'none'
          })
          setTimeout(function(){
            wx.navigateBack(); 
          },1000)
          
        }else{
          app.errorhandle(res.data);
        }
      },
      fail: function () {
        console.log('系统错误')
      }
    })
  }
 
})