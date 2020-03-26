// miniprogram/pages/mine/mine.js
Page({
  options: {
    addGlobalClass:true
  },

  /**
   * 页面的初始数据
   */
  data: {
    headTitle:"我的",//头部标题
    userName:"JakeZhang"

  },
  onTapQrCode() { 
    wx.showLoading({
      title: '生成中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getQrcode'
      
    }).then(res => {
      // console.log(res)
      const fileId = res.result
      wx.previewImage({
        current: fileId,
        urls: [fileId],
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      wx.hideLoading();
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})