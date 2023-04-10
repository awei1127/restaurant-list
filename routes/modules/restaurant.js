const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 設定路由-餐廳詳細頁
router.get('/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 設定路由-送出新增資料
router.post('/', (req, res) => {
  // 用request body來拿出使用者輸入的資料
  const data = req.body
  // 用Restaurant.create來把資料存到資料庫
  return Restaurant.create(data)
    // 重新導向一覽頁面
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定路由-送出刪除請求
router.delete('/:id', (req, res) => {
  // 用request params來拿出使用者要刪除的資料id
  const id = req.params.id
  // 用Restaurant.findById()來找到該筆資料
  return Restaurant.findById(id)
    // 用該筆資料.remove()方法來從資料庫移除該筆資料
    .then(restaurant => restaurant.remove())
    // 重新導向一覽頁面
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定路由-編輯餐廳頁面
router.get('/:id/edit', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// 設定路由-送出編輯內容
router.put('/:id', (req, res) => {
  // 用params拿出正在編輯的該筆資料的id
  const id = req.params.id
  // 用req.body拿出使用者輸入的修改後資料
  const data = req.body
  // 用Restaurant.findById()來找到該筆資料
  return Restaurant.findById(id)
    .then(restaurant => {
      // 把使用者輸入的資料賦值給這筆找到的資料
      Object.assign(restaurant, data)
      // 用這筆資料.save()來把資料儲存到資料庫
      return restaurant.save()
    })
    // 重新導向詳細頁面
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

module.exports = router