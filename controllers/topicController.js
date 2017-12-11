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

/**
 * @api {post} /topics/swipers 获取首页轮播图数据
 * @apiName /topics/swipers
 * @apiGroup Topic
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示获取成功
 * @apiSuccess {string} errmsg  错误的提示信息
 * @apiSuccess {Array}  swipers 轮播图数据
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
router.get('/swipers', (req, res, next) => {
  // http://qs.huoqishi.net

  res.send({
    errcode: 0,
    errmsg: 'ok',
    swipers: [
      {imgUri: path.join(config.host, 'uploads', 'swiper01.jpeg')},
      {imgUri: path.join(config.host, 'uploads', 'swiper02.jpeg')},
      {imgUri: path.join(config.host, 'uploads', 'swiper03.jpeg')}
    ]
  })
})

/**
 * @api {post} /topic/cover 上传话题图片
 * @apiDescription
 * 用于上传话题封面图片,并响应上传后的图片访问地址
 * (30分钟内，如果该图片未被应用于创建的话题封面，则会被系统删除)
 * @apiName /topic/cover
 * @apiGroup Topic
 *
 * @apiParam {file} cover 话题封面图片
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示上传成功
 * @apiSuccess {string} errmsg 错误的提示信息
 * @apiSuccess {string} preview 图片上传后的预览地址
 * @apiSuccess {string} path 上传的图片在服务器上的相对路径
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
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

/**
 * @api {patch} /topics/:id 更新话题内容
 * @apiName patchTopic
 * @apiGroup Topic
 *
 * @apiParma {string} title 话题标题
 * @apiParma {string} cover 话题图片地址
 * @apiParam {string} content 话题内容
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示更新成功
 * @apiSuccess {string} errmsg 错误的提示信息
 * @apiSuccess {string} path 上传图片的完整访问地址
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
router.patch('/:id', (req, res, next) => {
  const {title, cover, content, id} = req.body
  let errmsg = 'ok'
  const result = (function () {
    if (!title && !/(\S){2,50}/.test(title)) {
      errmsg = '标题必须是2 到 50:' + title
      return false
    }
    if (!content && !/(\S){15,1000}/.test(content)) {
      errmsg = '内容至少是15字'
      return false
    }
    if (!cover && !/(\S){1,255}/.test(cover)) {
      errmsg = '封面图片地址太长，不能超过255, 且不能为空'
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
  const updParams = {}
  const params = {title, cover, content}
  for (let key in params) {
    if (params[key]) updParams[key] = params[key]
  }
  Topic.update(updParams, {
    where: {id}
  }).then(rows => {
    if (rows[0].length !== 1) {
      return res.send({
        errcode: 10401,
        errmsg: 'not find the topic'
      })
    }
    res.send({
      errcode: 0,
      errmsg: 'ok'
    })
  }, next)
  // res.send({})
})

/**
 * @api {get} /topics/:id 获取话题内容
 * @apiName getTopic
 * @apiGroup Topic
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示获取成功
 * @apiSuccess {string} errmsg 错误的提示信息
 * @apiSuccess {Object} topic 话题的具体内容
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
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

/**
 * @api {get} /topics/:id 分页获取话题列表
 * @apiName getTopics
 * @apiGroup Topic
 *
 * @apiParam {number} start 从第几条数据开始读取(0为第一条)
 * @apiParam {number} count 连续读取多少条数据
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示获取成功
 * @apiSuccess {string} errmsg 错误的提示信息
 * @apiSuccess {Object} topic 话题的具体内容
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "errcode": 0,
 *     "errmsg": "ok",
 *     "topic": {
 *      ...
 *     }
 *   }
 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
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

/**
 * @api {post} /topics/:id 添加一个新的话题
 * @apiName postTopic
 * @apiGroup Topic
 *
 * @apiParam {string} title 话题的标题
 * @apiParam {string} cover 话题封面图片的地址
 * @apiParam {string} content 话题的具体内容
 *
 * @apiSuccess {string} errcode 错误标识码, 0表示添加成功
 * @apiSuccess {string} errmsg 错误的提示信息

 * @apiParamExample {javascript}  接口请求示例
 * ...
 */
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
    if (!/(\S){1,255}/.test(cover)) {
      errmsg = '封面图片地址太长，不能超过255, 且不能为空'
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
