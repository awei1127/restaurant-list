const express = require('express')
const router = express.Router()
const passport = require('passport')

// 設定路由-facebook登入
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// 設定路由-facebook callback
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/users/login',
  successRedirect: '/'
}))


// 匯出路由模組
module.exports = router