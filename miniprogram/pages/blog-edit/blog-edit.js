//最大博文长度
const MAX_WORDS_NUM = 168
//最大图片张数
const MAX_IMG_NUM = 9
Page({
  options: {
    addGlobalClass: true
  },

  /**
   * 页面的初始数据
   */
  data: {
    wordsNum: 0, //监听博文字数
    selectPhoto: true, // 控制添加图片的框是否显示
    nickName: '',
    avatarUrl: '',
    gender: 1,
    sendAbel: true,
    images: []
  },
  //发布博客
  send() {
    //数据 --> 云数据库
    // 数据库：文字内容，图片，openid，用户昵称，头像，时间
    // 图片：云存储
    // wx.showLoading({
    //   title: '上传中...',
    // })
    let len = this.data.images.length
    console.log(len)
    for (let i = 0; i < len; i++) {
      let item = this.data.images[i]
      console.log(i)
      // 文件扩展名处理
      let suffix = /\.w+$/.exec(item)[0]
      wx.cloud.uploadFile({
        cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 1000000 + suffix, // 云端路径,保证文件名唯一
        filePath: item, //临时路径
        success: (res) => {
          Console.log(res)
          // wx.hideLoading()
        },
        fail: (err) => {
          console.log(err)
        },
      })
    }

  },
  // 预览图片
  onPreviewPhoto(e) {
    wx.previewImage({
      current: e.target.dataset.imgsrc,
      urls: this.data.images
    });
  },
  // 删除图片
  onDelImg(e) {
    let index = e.target.dataset.index
    this.data.images.splice(index, 1)
    this.setData({
      images: this.data.images
    })
    if (this.data.images.length <= MAX_IMG_NUM - 1) {
      this.setData({
        selectPhoto: true
      })
    }
  },
  //选择图片
  onChooseImg(e) {
    let max = MAX_IMG_NUM - this.data.images.length
    wx.chooseImage({
      count: max,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
        max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectPhoto: max <= 0 ? false : true
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  onInput(e) {
    let wordsNum = e.detail.cursor;
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `🤪字数不能超过${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
    if (wordsNum >= 1) {
      this.setData({
        sendAbel: false
      })
    }
  },

  // onFocus(e) {
  //   this.setData({
  //     footerBm: e.detail.height
  //   })
  // },
  // onBlur() {
  //   this.setData({
  //     footerBm: 0
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      nickName: options.nickName,
      avatarUrl: options.avatarUrl,
      gender: options.gender
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
  onShow: function (e) {},

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