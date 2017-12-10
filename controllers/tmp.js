const path = require('path')
const express = require('express')
const config = require('../config/config.js')
// const Topic = require('../models/Topic')
// const dest = path.join(__dirname, '..', 'uploads/')
// const upload = multer({
//   dest,
//   size: 1024 * 1
// })
const router = module.exports = express.Router()

// router.get('/swipers', (req, res, next) => {
//   // http://qs.huoqishi.net

//   res.send({
//     errcode: 0,
//     errmsg: 'ok',
//     swipers: [
//       path.join(config.host, 'uploads', 'swiper01.jpeg'),
//       path.join(config.host, 'uploads', 'swiper02.jpeg'),
//       path.join(config.host, 'uploads', 'swiper03.jpeg')
//     ]
//   })
// })
