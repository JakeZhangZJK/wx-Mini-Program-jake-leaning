// miniprogram/pages/my-test/my-test.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  addImg: function () {
    wx.chooseImage({ //选择图片
      count: 1, //规定选择图片的数量，默认9
      sizeType: ['original', 'compressed'], //规定图片的尺寸， 原图/压缩图
      sourceType: ['album', 'camera'], //从哪里选择图片， 相册/相机
      success: (chooseres) => { //接口调用成功的时候执行的函数
        wx.cloud.uploadFile({
          cloudPath: "img/" + new Date().getTime() + "-" + Math.floor(Math.random() * 1000) + '.jpg', //云储存的路径及文件名
          filePath: chooseres.tempFilePaths[0], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
          success: (uploadres) => { //上传图片到云储存成功
            console.log(uploadres)
            wx.showLoading({ //显示加载提示框 不会自动关闭 只能wx.hideLoading关闭
              title: '图片上传中', //提示框显示的提示信息
              mask: true, //显示透明蒙层，防止触摸。为true提示的时候不可以对屏幕进行操作，不写或为false时可以操作屏幕
              success: function (res) {
                wx.hideLoading() //让提示框隐藏、消失
                console.log(res)
              }

            });

          },

          fail: (err) => {
            console.log(err)
          }

        })

      },

      fail: (err) => {
        console.log(err)
      }

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