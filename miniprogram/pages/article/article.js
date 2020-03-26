// miniprogram/pages/article/article.js
//获取应用实例
const app = getApp();
// let WxParse = require('../../wxParse/wxParse.js')
Page({
  options: {
    addGlobalClass:true
  },

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    title: '',
    image: '',
    time: '',
    view: 0,
    content: '',
    tag: '',
    count:0
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.cloud.callFunction({
      name: 'article',
      data: {
        id:options.id
      },
      complete: res => {
        // console.log(res)
        const detail = res.result.data[0]
        this.setData({
          title: detail.title,
          image: detail.image,
          time: detail.time,
          view: detail.view,
          content: detail.content,
          tag: detail.tag,
        })
      }
    })
    wx.hideLoading();
    // let result = app.towxml(this.data.article, 'markdown', {
		// 	theme:'light'
		// });

    // // 更新解析数据
    // wx.hideLoading();
		// this.setData({
    //   article: result,
		// });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options ) {
console.log(options)
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