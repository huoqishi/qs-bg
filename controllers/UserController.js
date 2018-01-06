const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
// const Sequelize = require('sequelize')
const User = require('../models/User')
const config = require('../config')
// const Op = Sequelize.Op
const dest = path.join(__dirname, '..', 'uploads/')
const upload = multer({
  dest,
  size: 1024 * 1
})
const router = module.exports = express.Router()

router.prefix = '/user'
/**
 * @api {post} /user/signin 登陆
 * @apiName /user/status
 * @apiGroup User
 *
 * @apiParam {string} username 用户名
 * @apiParam {string} password 用户密码
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示登陆成功
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
router.post('/signin', (req, res, next) => {
  const {username, password} = req.body
  User.findOne({
    where: {username, password}
  }).then(user => {
    if (!user) {
      res.send({errcode: 10403, errmsg: '用户名或密码不正确'})
      return
    }
    // console.log('d')
    // 生成token，并响应
    const userJSON = user.get({plain: true})
    // 客户端刷新token还是服务器端刷新token
    const token = jwt.sign({id: userJSON.id}, config.tokenSecret, {expiresIn: '1h'})
    res.set({
      'access-token': token
    })
    res.send({errcode: 0, errmsg: 'ok', user: userJSON})
  }, next)
})

/**
 * @api {post} /user/signup 注册
 * @apiName /user/signup
 * @apiGroup User
 *
 * @apiParam {string} username 用户名(要求是2-16长度的字符)
 * @apiParam {string} password 用户密码(要求是2-16长度的字符)
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示注册成功
 * @apiSuccess {string} errmsg  错误的提示信息
 */
router.post('/signup', (req, res, next) => {
  const {username, password} = req.body
  // 参数验证（Parameter verification）
  const regExp = /(\S){2,16}/
  let errmsg = 'ok'
  const result = (function () {
    if (!regExp.test(username)) {
      errmsg = '用户名必须是 2 - 16长度的字符'
      return false
    }
    if (!regExp.test(password)) {
      errmsg = '密码必须是 2 - 16 长度的字符'
      return false
    }
    return true
  })()
  if (!result) {
    res.send({
      errcode: 1001,
      errmsg
    })
  }

  // console.log(username, password, '='.repeat(40))
  // 数据库验证
  User.findOne({
    where: {username: username}
  }).then((user) => {
  // User.findAll().then((res) => {
    // console.log(11112)
    // console.log(user)
    if (user) return res.send({errcode: 1403, errmsg: '用户已存在'})
    User.create({
      username, password, nickname: username
    }).then(user => {
      // console.log('创建用户完成')
      res.send({errcode: 0, errmsg, user: user.get({plain: true})})
    }, next)
  }, next)
})

/**
 * @api {post} /user/avatar 修改头像
 * @apiName /user/avatar
 * @apiGroup User
 *
 * @apiParam {file} avatar 头像文件
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示修改成功
 * @apiSuccess {string} errmsg  错误的提示信息
 */
// 修改头像
router.patch('/avatar', upload.single('avatar'), (req, res, next) => {
  if (!req.file) {
    return res.send({
      errcode: 1001,
      errmsg: '图片上传出错'
    })
  }
  User.update({
  //   path: path.join(config.host, 'uploads', req.file.filename)
    avatar: path.join('uploads', req.file.filename)
  }, {
    where: {
      id: req.user.id
    }
  }).then(rows => {
    // rows <=> [3]
    res.send({
      errcode: 0,
      errmsg: '图片说的都是真的的吗',
      path: path.join(config.host, 'uploads', req.file.filename)
    })
  })
})

/**
 * @api {patch} /user/nickname 修改昵称
 * @apiName /user/nickname
 * @apiGroup User
 *
 * @apiParam {string} nickname 新的昵称(要求是2-16长度的字符)
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示修改成功
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
router.patch('/nickname', (req, res, next) => {
  const {nickname} = req.body
  const regExp = /(\S){2,16}/
  let errmsg = 'ok'
  if (!nickname || !regExp.test(nickname)) {
    errmsg = '昵称必须是 2 - 16长度的字符'
    return res.send({
      errcode: 10004,
      errmsg
    })
  }
  User.update({
    nickname
  }, {
    where: {
      id: req.user.id
    }
  }).then(rows => {
    req.user.nickname = nickname
    console.log(req.user)
    res.send({
      errcode: 0,
      errmsg,
      user: req.user
    })
  })
})

/**
 * @api {get} /user 获取个人信息
 * @apiName /user
 * @apiGroup User
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示获取成功
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
router.get('/', (req, res, next) => {
  res.send({
    errcode: 0,
    errmsg: 'ok',
    user: req.user.get({plain: true})
  })
})
