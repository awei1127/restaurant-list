// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入路由器
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')

router.use('/', home)
router.use('/restaurant', restaurant)

// 匯出路由器
module.exports = router