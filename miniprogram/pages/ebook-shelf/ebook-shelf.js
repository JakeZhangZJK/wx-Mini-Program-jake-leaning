// miniprogram/pages/ebook-shelf/ebook-shelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ebookList: [
      {
        id: 0,
        image: '../../images/js-s.jpeg',
        title:'你不知道的JavaScript（上卷）'
      },
      {
        id: 1,
        image: '../../images/js-z.jpeg' ,
        title:'你不知道的JavaScript（中卷）'
      },
      {
        id: 2,
        image:'../../images/js-x.jpeg',
        title:'你不知道的JavaScript（下卷）'
      },
      {
        id: 3,
        image:'../../images/h5-css3-s.jpeg',
        title:'html与css3'
        },
      ]

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