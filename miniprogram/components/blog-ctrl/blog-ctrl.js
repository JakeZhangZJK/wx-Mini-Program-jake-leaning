let userInfo = {} // 用户信息
const db = wx.cloud.database()// 云数据库初始化
Component({
  options: {
    addGlobalClass:true
  },
  data: {
    loginShow: false, // 登录授权组件是否显示
    modalShow: false, // 评论组件是否显示
    sendShow:false,// 订阅通知框是否显示
    content:''// 评论的内容
  },
  properties: {
    blogId: String,
    blog:Object
  },
  methods: {
    onComment() {
      // 判断用户是否有授权
      wx.getSetting({
        success: (res)=>{
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res)=>{
                userInfo = res.userInfo
                // 显示评论弹出层
                this.setData({
                  modalShow:true
                })
              }
            });
          } else {
            this.setData({
              loginShow:true
            })
          }
        }
      });
    },
    // 授权登录成功
    onLoginSuccess(e) {
      userInfo = e.detail
      // 底部授权框消失，换成评论框弹出
      this.setData({
        loginShow:false
      }, () => {
          this.setData({
            modalShow:true
        })
      })
      
    },
    // 授权失败
    onLoginFail() {
      wx.showModal({
        title: '授权用户才能评论哦~',
        content: '🙃🙃🙃',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#ff6633',
      })
    },
    onInput(e) {
      this.setData({// 获取文本域输入的值
        content:e.detail.value
      })
    },
    onSend() {
      // 1. 将评论信息插入云数据库
      let content = this.data.content
      if (content.trim() == '') {
        wx.showModal({
          title: '您还没写呢~',
          content: '🤪🤪🤪',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#ff6633'
        })
        return
      }
      wx.showLoading({
        title: '😊评价中...',
        mask: true
      })
      db.collection('blog-comment').add({
        data: {
          content,// 评价内容
          createTime: db.serverDate(),// 时间
          blogId: this.properties.blogId,// 对应博客id
          nickName: userInfo.nickName,// 用户昵称
          avatarUrl: userInfo.avatarUrl,// 用户头像
          gender:userInfo.gender//用户性别 
          
        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '评论成功'
        })
        this.setData({
          modalShow: false,
          content:''
        })
        //父元素刷新评论列表
        this.triggerEvent('refreshCommentList')
        // this.showSendModal()
      })

    },
    //向用户推荐订阅消息通知
    sendMessage(e) {
      // 申请授权
        wx.requestSubscribeMessage({
          tmplIds: ['VXI0ZTUEKrvHP_9QBXEz2lc7-Jk5PW7LR4SqWPUuPkA'],
          success: (res => {
            console.log('授权成功',res)
          }),
          fail:(err => {
            console.log('授权失败',err)
          })
        })
        wx.cloud.callFunction({
          name: 'sendMessage',
          data: {
            openid: 'oWzcL4_Et2F5Ye-p5ev-uzRvWqrQ',
            time: db.serverDate(),
            content:this.data.content,
            blogId:this.properties.blogId

          }
        }).then(res => {
          
          wx.showToast({
            title: '订阅成功'
          })
          this.hideSendModal()
          
        }).catch(err => {
          console.log(err)
        })
    },
    
    // 此2方法先保留，后期做优化
    // showSendModal() {
    //   this.setData({
    //     sendShow:true
    // })
    // },
    // hideSendModal() {
    //   this.setData({
    //     sendShow:false
    // })
    // },
    
  }
})