const path = require('path')
const express = require('express')
const multer = require('multer')
const Topic = require('../models/Topic')
const config = require('../config/config')
const dest = path.join(__dirname, '..', 'uploads/')
const upload = multer({
  dest,
  size: 1024 * 1
})
const router = module.exports = express.Router()

router.prefix = '/topics'

// 轮播图
router.get('/swipers', (req, res, next) => {
  // http://qs.huoqishi.net

  res.send({
    errcode: 0,
    errmsg: 'ok',
    swipers: [
      path.join(config.host, 'uploads', 'swiper01.jpeg'),
      path.join(config.host, 'uploads', 'swiper02.jpeg'),
      path.join(config.host, 'uploads', 'swiper03.jpeg')
    ]
  })
})

// 上传话题图片
router.post('/cover', upload.single('cover'), (req, res, next) => {
  // console.log(res)
  if (!req.file) {
    return res.send({
      errcode: 1001,
      errmsg: '图片上传出错'
    })
  }
  res.send({
    errcode: 0,
    errmsg: '图片说的都是真的的吗',
    path: path.join(config.host, 'uploads', req.file.filename)
  })
})

// 获取详情
router.get('/:id', (req, res, next) => {
  const {id} = req.params
  Topic.findById(id)
    .then(topic => {
      res.send({
        errcode: 0,
        errmsg: 'ok',
        topic
      })
    })
})
// 分页获取数据
router.get('/', (req, res, next) => {
  let {start = 0, count = 5} = req.query
  start = parseInt(start)
  count = parseInt(count)
  start = isNaN(start) ? 0 : (start >= 0 ? start : 0)
  count = isNaN(count) ? 5 : (count > 0 ? count : 5)
  console.log(start, count, '========')
  Topic.findAndCountAll({
    offset: start, // 开始的索引
    limit: count // 条数
  }).then((result) => {
    const count = result.count
    const topics = result.rows
    // console.log(result)
    // console.log(topics)
    topics.forEach(item => {
      item.content = item.content.substr(0, 108)
    })
    res.send({
      errcode: 0,
      errmsg: 'ok',
      total: count,
      topics: topics
    })
  }, next)
})

// 上传一个新的话题
router.post('/', (req, res, next) => {
  const {title = '', content = '', cover = ''} = req.body
  let errmsg = 'ok'
  const result = (function () {
    if (!/(\S){2,50}/.test(title)) {
      errmsg = '标题必须是2 到 50:' + title
      return false
    }
    if (!/(\S){15,1000}/.test(content)) {
      errmsg = '内容至少是15字'
      return false
    }
    if (!/(\S){1,255}/.test(content)) {
      errmsg = '上到过年'
      return false
    }
    return true
  })()
  if (!result) {
    return res.send({
      errcode: 10401,
      errmsg
    })
  }
  Topic.create({
    title,
    content,
    cover
  }).then(() => {
    res.send({
      errcode: 0,
      errmsg: 'ok'
    })
  })
})

// const formData = new FormData();
// formData.append('file',
// {uri: imageUri, name: imageName, type: 'image/jpeg'})
