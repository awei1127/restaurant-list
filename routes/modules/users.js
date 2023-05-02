const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// 設定路由-登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 設定路由-送出登入表單
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

// 設定路由-註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 設定路由-送出註冊表單
router.post('/register', (req, res) => {

  // 把註冊資料存入資料庫
  const { name, email, password, confirmPassword } = req.body

  // 看資料庫裡面是否已存在該email 存在則重新渲染 不存在則在資料庫建立使用者資料
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('user exist')   // 預計要改成connect-flash訊息
        return res.render('register')   // 預計要把使用者輸入的資料傳回前端渲染
      }
      User.create({ name, email, password })
        .then(res.redirect('/users/login'))   // 註冊成功 導到登入頁面
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

// 匯出路由模組
module.exports = router