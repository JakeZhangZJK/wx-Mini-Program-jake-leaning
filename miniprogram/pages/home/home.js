// miniprogram/pages/articles/articles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headTitle:"JAKE前端",//头部标题
    // 
    TabCur: 0,
    // 面试真经数据
    iconList: [{
      icon: '../../images/base.png',
      name: '基础'
    },
    {
      icon: '../../images/advanced.png',
      color: 'olive',
      name: '进阶'
      },
      {
        icon: '../../images/professional.png',
        color: 'cyan',
        name: '高级'
      },
      {
        icon: '../../images/leetcode.png',
        color: 'blue',
        name: 'leetCode'
      },
      {
        icon: '../../images/niuke.png',
        color: 'brown',
        name: '牛客网'
      },
      {
        icon: '../../images/VUE.png',
        color: 'green',
        name: 'Vue'
      },
      {
        icon: '../../images/react.png',
        color: 'green',
        name: 'React'
      },
      {
        icon: '../../images/node.png',
        color: 'cyan',
        name: 'Node'
      },
    ],
    
    // 好文推荐数据
    navList:['好文推荐','面试真经'],
    swiperList: [],
    goodArticleList:[]

  },
  getItem(e) {
    this.setData({
      TabCur:e.detail.TabCur
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'article',
      data: {
        status:1
      },
      complete: res => {
        console.log(res.result.data)
        this.setData({
          swiperList:res.result.data
        })
      }
    })

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
    wx.cloud.callFunction({
      name: 'article',
      data: {
        status:0
      },
      complete: res => {
        console.log(res.result.data)
        this.setData({
          goodArticleList:res.result.data
        })
      }
    })

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