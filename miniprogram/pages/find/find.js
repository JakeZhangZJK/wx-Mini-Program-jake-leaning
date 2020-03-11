// miniprogram/pages/find/find.js
// 搜索的关键字
let keyWord = ''
Page({
  options: {
    addGlobalClass:true
  },
  /**
   * 页面的初始数据
   */
  data: {
    // headTitle: "精彩一瞬",//头部标题
    placeholder: "搜一搜~",
    modalShow: false,// 控制底部模态框是否显示
    blogList: [],// 博客列表
    showTip:0
  },
  // 发布功能
  onPublish() {
    //判断用户是否授权
    wx.getSetting({
      success: (res)=>{
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({// 如果用户已经授权过，则调用onLoginSuccess方法
            success: (res)=>{
              this.onLoginSuccess({
                detail:res.userInfo
              })
            }
          });
        } else {
          this.setData({
            modalShow:true
        })
        }
      }
    });
  },
  
  onLoginSuccess(e) {
    const detail = e.detail
    wx.navigateTo({// 授权成功，跳转到编辑博客页面，并将用户信息传递过去
      url: `../blog-edit/blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}&gender=${detail.gender}`
    });
  },
  onLoginFail() {
    wx.showModal({
      title: '授权用户才能发布动态哦~',
      content: '🙃🙃🙃',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#ff6633',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadBlogList()

    // 小程序端调用云数据库
    /*  const db = wx.cloud.database()
     db.collection('blog').orderBy('createTime', 'desc').get().then((res)=>{
       console.log(res)
       const data = res.data
       for (let i = 0, len = data.length; i<len; i++){
         data[i].createTime = data[i].createTime.toString()
       }
       this.setData({
         blogList: data
       })
     }) */
  },
  // 搜索方法
  onSearch(event) {
    // console.log(event.detail.keyWord)
    this.setData({
      blogList: []
    })
    keyWord = event.detail.keyWord
    this._loadBlogList(0)
  },
  _loadBlogList(start = 0) {
    wx.showLoading({
      title: '🧐拼命加载中',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        keyWord,
        start,
        count: 10,
        $url: 'list',
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  //跳转到博客详情页
  goComment(event) {
    wx.navigateTo({
      url: '../../pages/blog-comment/blog-comment?blogId=' + event.target.dataset.blogid,
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
    this.setData({
      blogList: []
    })
    this._loadBlogList(0)// 刷新列表
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadBlogList(this.data.blogList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})