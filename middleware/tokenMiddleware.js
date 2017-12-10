// import { log } from 'util'

/**
 * 登陆的token验证中间件
 */
const User = require('../models/User.js')
module.exports = function (req, res, next) {
  if (req.url === '/user/signin' || req.url === '/user/signup') {
    return next()
  }
  const token = req.headers['access-token']
  User.findOne({
    where: {
      token
    }
  }).then(user => {
    if (!user) {
      return res.send({
        errcode: 1043,
        errmsg: '登陆后才允许请求: ' + req.url
      })
    }
    req.user = user
    next()
  })
}
