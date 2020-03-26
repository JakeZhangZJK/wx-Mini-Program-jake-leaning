// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const articleCollection = db.collection('article')
// 云函数入口函数
exports.main = async (event, context) => {
  return articleCollection.where({
    status: event.status,
    _id:event.id
  }).get()
  
}