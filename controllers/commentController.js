/**
 * 评论处理
 */
const express = require('express')
const config = require('../config')
const Comment = require('../models/comment.js')
const router = module.exports = express.Router()
router.prefix = '/comments'

router.get('/:topicId', (req, res, next) => {
  const {topicId} = req.params
  let {start = 0, count = 5} = req.query
  start = parseInt(start)
  count = parseInt(count)
  start = isNaN(start) ? 0 : (start >= 0 ? start : 0)
  count = isNaN(count) ? 5 : (count > 0 ? count : 5)
  Comment.findAndCountAll({
    offset: start,
    limit: count,
    where: {
      topicId
    }
  }).then(result => {
    res.send({
      errcode: 0,
      errmsg: 'ok',
      total: result.count,
      comments: result.rows
    })
  })
})

router.post('/:topicId', (req, res, next) => {
  const {title, content} = req.body
  const {topicId} = req.params
  const {id: userId} = req.user
  let msg = 'ok'
  const result = (function () {
    // if (/.{5,100}/.test(title)) {
    //   msg = 'title需要是 2 - 100 字'
    //   return false
    // }
    console.log(content)
    if (!content || !/.{10,1000}/.test(content)) {
      console.log(content)
      msg = 'content需要是 10 - 1000 字'
      return false
    }
    return true
  })()
  if (!result) return res.send({errcode: 10004, errmsg: msg})
  Comment.create({
    title,
    content,
    topicId,
    userId
  }).then(user => {
    res.send({
      errcode: 0,
      errmsg: 'ok'
    })
  }, next)
})
