//最大博文长度
const MAX_WORDS_NUM = 168;
//最大图片张数
const MAX_IMG_NUM = 9;
const db = wx.cloud.database()
// 输入的文字内容
let content = ''
let userInfo = {}
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
    // sendAbel: true,
    images: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    userInfo = options
    this.setData({
      nickName: options.nickName,
      avatarUrl: options.avatarUrl,
      gender: options.gender
    })

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
      content = e.detail.value
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
        //console.log(res)// 有数据
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
        max = MAX_IMG_NUM - this.data.images.length
        this.setData({
          selectPhoto: max <= 0 ? false : true
        })
      }
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

  // 预览图片
  onPreviewPhoto(e) {
    wx.previewImage({
      current: e.target.dataset.imgsrc,
      urls: this.data.images
    });
  },


  //发布博客
  // 2、数据 -> 云数据库
    // 数据库：内容、图片fileID、openid、昵称、头像、时间
    // 1、图片 -> 云存储 fileID 云文件ID
  send() {
    if (content.trim() === '') {
      wx.showModal({
        title: '亲，您的内容空空如也',
        content: '😂😂😂',
      })
      return
    }
    wx.showLoading({
      title: '发布中',
      mask: true,
    })

    let promiseArr = []
    let fileIds = []
    // 图片上传
    for (let i = 0, len = this.data.images.length; i < len; i++) {
      let p = new Promise((resolve, reject) => {
        let item = this.data.images[i]
        // 文件扩展名
        let suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 1000000 + suffix,// 对文件名进行处理，保证文件名唯一
          filePath: item,// 临时路径
          success: (res) => {
            console.log(res.fileID)
            fileIds = fileIds.concat(res.fileID)
            resolve()
          },
          fail: (err) => {
            console.error(err)
            reject()
          }
        })
      })
      promiseArr.push(p)
    }
    // 存入到云数据库
    Promise.all(promiseArr).then((res) => {
      db.collection('blog').add({
        data: {
          ...userInfo,
          content,
          img: fileIds,
          createTime: db.serverDate(), // 服务端的时间

        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '😄发布成功',
        })

        // 返回blog页面，并且刷新
        wx.navigateBack({
          delta: 1
        });
        const pages = getCurrentPages()
        // console.log(pages)
        // 取到上一个页面
        const prevPage = pages[pages.length - 2]
        // 调用上一页面的刷新方法
        prevPage.onPullDownRefresh()
      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '发布失败',
      })
    })
  },
  onCancel() {
    if (content.trim() !== '') {
      wx.showModal({
        title: '亲，此操作可能不会保留您当前内容哦~',
        content: '🤯🤯🤯',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#ff6633',
      })
    }
    this.setData({
      content:''
    })
    return
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