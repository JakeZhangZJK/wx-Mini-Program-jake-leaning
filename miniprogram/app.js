//app.js
App({
  
  // 引入`towxml3.0`解析方法
  towxml: require('./towxml/index'),
  onLaunch: function () {
    this.checkUpate()
    // 初始化云环境 
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'jake-cloud-007',
        traceUser: true
      })
    }
    this.getOpenid()

    this.globalData = {
      // playingMusicId: -1,
      openid: -1,
    }

  },
  // 获取用户的openid
  getOpenid() {
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      const openid = res.result.openid
      this.globalData.openid = openid
      if (wx.getStorageSync(openid) == '') {
        wx.setStorageSync(openid, []) // 将openid存到本地缓存
      }
    })
  },
  checkUpate() {
    const updateManager = wx.getUpdateManager()
    // 检测版本更新
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用',
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  },
  globalData: {
    userInfo: null
  },
  
})