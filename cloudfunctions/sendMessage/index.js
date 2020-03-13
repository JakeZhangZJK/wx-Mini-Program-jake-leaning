// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // 此处请填入环境 ID, 环境 ID 可打开云控制台查看
  env:'jake-cloud-007'
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid,// 要推送的用户
      page: `/pages/blog-comment/blog-comment?blogId=${event.blogId}`,// 跳转的页面
      data: {// 推送的内容
        time1: {
          value:event.time
        },
        phrase2: {
          value:'评论成功'
        },
        thing3: {
          value:event.content
        }
      },
      templateId: 'VXI0ZTUEKrvHP_9QBXEz2lc7-Jk5PW7LR4SqWPUuPkA',// 模板id
    })
    // console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }

 
  
}