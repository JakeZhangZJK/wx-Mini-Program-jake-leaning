// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router')

const db = cloud.database()

const blogCollection = db.collection('blog')

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })

  // 搜索与获取博客列表
  app.router('list', async (ctx, next) => {
    const keyWord = event.keyWord
    let w = {}
    //关键字不为空时进行关键字匹配查询
    if (keyWord.trim() !== '') {
      w = {
        content: new db.RegExp({
          regexp: keyWord,
          options: 'i'
        })
      }
    }


    let blogList = await blogCollection.where(w).skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get().then((res) => {
        return res.data
      })
    ctx.body = blogList
  })

  //博客详情查询
  app.router('detail', async (ctx, next) => {
    let blogId = event.blogId
    // 详情查询
    let detail = await blogCollection.where({
      _id: blogId
    }).get().then((res) => {
      return res.data
    })
    // 评论查询
    const countResult = await blogCollection.count() // 评论总数
    const total = countResult.total
    let commentList = {
      data: []
    }
    if (total > 0) {
      const batchTimes = Math.ceil(total / MAX_LIMIT)// 查询次数
      const tasks = [] // 定义评论列表
      for (let i = 0; i < batchTimes; i++) {
        let promise = db.collection('blog-comment').skip(i * MAX_LIMIT)
          .limit(MAX_LIMIT).where({
            blogId
          }).orderBy('createTime', 'desc').get()
        tasks.push(promise)
      }
      if (tasks.length > 0) {
        commentList = (await Promise.all(tasks)).reduce((acc, cur) => {// 累加器
          return {
            data: acc.data.concat(cur.data)
          }
        })
      }

    }

    ctx.body = {
      commentList,
      detail,
    }

  })

  const wxContext = cloud.getWXContext()
  app.router('getListByOpenid', async (ctx, next) => {
    ctx.body = await blogCollection.where({
        _openid: wxContext.OPENID
      }).skip(event.start).limit(event.count)
      .orderBy('createTime', 'desc').get().then((res) => {
        return res.data
      })
  })



  return app.serve()
}