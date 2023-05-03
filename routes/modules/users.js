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
  failureRedirect: '/users/login'
}))

// 設定路由-登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

// 設定路由-註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 設定路由-送出註冊表單
router.post('/register', (req, res) => {

  // 把註冊資料存入資料庫
  const { name, email, password, confirmPassword } = req.body

  // 裝錯誤訊息的陣列
  const errors = []

  // 是否有空欄
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }

  // 密碼與確認密碼是否一致
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }

  // 如果陣列內有錯誤訊息
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  // 看資料庫裡面是否已存在該email 存在則重新渲染 不存在則在資料庫建立使用者資料
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      User.create({ name, email, password })
        .then(res.redirect('/users/login'))   // 註冊成功 導到登入頁面
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

// 匯出路由模組
module.exports = router