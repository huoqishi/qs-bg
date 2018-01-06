/**
 * 点赞处理
 */
const path = require('path')
const express = require('express')
const config = require('../config')
const ThumbUp = require('../models/ThumbUp.js')
const router = module.exports = express.Router()
router.prefix = '/thumbup'
router.patch('/:topicId', (req, res, next) => {
  // 是否点赞
  const {thumbUp} = req.body
  const {topicId} = req.params
  const {id: userId} = req.user
  if (!(thumbUp in [0, 1])) {
    return res.send({
      errcode: '10001',
      errmsg: 'thumbUp的值只能是 0 或者 1'
    })
  }
  ThumbUp.update({
    thumbUp
  }, {
    where: {
      id,
      topicId
    }
  }).then(rows => {
    console.log(rows)
    if (rows[0] === 0) {
      ThumbUp.create({
        userId,
        topicId,
        thumbUp
      }).then(user => {
        console.log(user)
        res.send({
          errcode: 0,
          errmsg: '初次点赞成功!'
        })
      })
      return
    }
    res.send({
      errcode: 0,
      errmsg: 'ok'
      // thumbUp:
    })
  })
})

// react-native-router
// 用这个路由写一个从，登陆到首页的核心步骤，以及代码，以及验证代码
