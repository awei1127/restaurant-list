const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {

  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

    // 找使用者email 檢查密碼 有錯誤處理錯誤 沒錯誤回傳user資料
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: '這個Email尚未註冊' })
        }
        // 用bcrypt檢查密碼
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return done(null, false, { message: '密碼錯誤' })
          }
        })
        return done(null, user)     // 驗證成功
      })
      .catch(err => done(err, false))
  }))

  // 設定序列化和反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}