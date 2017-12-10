const path = require('path')
const express = require('express')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const User = require('../models/User')
const config = require('../config/config')
const dest = path.join(__dirname, '..', 'uploads/')
const upload = multer({
  dest,
  size: 1024 * 1
})
const router = module.exports = express.Router()

router.prefix = '/user'

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
    // const token = jwt.sign(userJSON, 'secret')
    const token = jwt.sign({id: userJSON.id}, 'secret')
    console.log(token.length, '----')
    User.update({
      token
    }, {
      where: {
        id: userJSON.id
      }
    }).then(user => {
      res.set({
        'access-token': token
      })
      delete userJSON.token
      res.send({errcode: 0, errmsg: 'ok', user: userJSON})
    }, next)
  }, next)
})

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

// 修改昵称
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

// 获取自己的信息
router.get('/', (req, res, next) => {
  res.send({
    errcode: 0,
    errmsg: 'ok',
    user: req.user.get({plain: true})
  })
})

router.get('/test', (req, res, next) => {
  res.send('test is ok')
})
