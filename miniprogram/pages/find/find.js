// miniprogram/pages/find/find.js
Page({
  options: {
    addGlobalClass:true
  },
  /**
   * 页面的初始数据
   */
  data: {
    headTitle: "精彩一瞬",//头部标题
    placeholder: "搜一搜~",
    modalShow:false// 控制底部模态框是否显示
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
      confirmColor: '#3CC51F',
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