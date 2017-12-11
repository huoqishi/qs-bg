// import { log } from 'util'

/**
 * 登陆的token验证中间件
 */
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User.js')
module.exports = function (req, res, next) {
  // Authorization
  const token = req.headers['access-token']
  let payload
  try {
    payload = jwt.verify(token)
    req.setHeader(payload, config.tokenSecret, {expiresIn: '1h'})
  } catch (e) {
    // 没有token
  }
  if (!payload) {
    if (req.url === '/user/signin' || req.url === '/user/signup') {
      return next()
    }
  }
  return res.send({
    errcode: 10403,
    errmsg: '登陆后才允许请求: ' + req.url
  })
}
