const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose') // 載入 mongoose
const methodOverride = require('method-override')
const routes = require('./routes')

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
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)



// 啟動並監聽
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})