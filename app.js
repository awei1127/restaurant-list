const express = require('express')
const app = express()
const Restaurant = require('./models/restaurant')
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose') // 載入 mongoose

// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 使用body-parser(以在接下來能夠解析使用者送出的post request body)
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

// 設定路由-首頁
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 設定路由-餐廳詳細頁
app.get('/restaurants/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 設定路由-搜尋頁
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  // 回傳一個陣列 陣列內容為餐廳名符合搜尋字串的所有餐廳
  return Restaurant.find({ name: new RegExp(keyword, 'i') })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 設定路由-新增餐廳頁面
app.get('/restaurant/new', (req, res) => {
  res.render('new')
})

// 設定路由-送出新增資料
app.post('/restaurant', (req, res) => {
  // 用request body來拿出使用者輸入的資料
  const data = req.body
  // 用Restaurant.create來把資料存到資料庫
  return Restaurant.create(data)
    // 重新導向一覽頁面
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 啟動並監聽
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})