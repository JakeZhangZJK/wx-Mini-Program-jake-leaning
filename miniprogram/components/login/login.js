// components/login/login.js
Component({
  options: {
    addGlobalClass:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
   modalShow:Boolean

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(e) {
      const userInfo = e.detail.userInfo
      // 允许授权
      if (userInfo) {
        this.setData({
          modalShow:false
        })
        // 如果用户允许授权，就将用户信息传递到发现页面
        this.triggerEvent('loginsuccess',userInfo)
      } else {
        this.triggerEvent('loginfail')
      }
    }
  }
})
