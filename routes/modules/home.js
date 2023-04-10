const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定路由-首頁
router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 設定路由-搜尋頁
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  // 回傳一個陣列 陣列內容為餐廳名符合搜尋字串的所有餐廳
  return Restaurant.find({ name: new RegExp(keyword, 'i') })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 設定路由-新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 匯出路由模組
module.exports = router