const express = require('express')
const session = require('express-session')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 使用body-parser(以在接下來能夠解析使用者送出的post request body)

app.use(session({
  secret: 'ThisIsMySecret',
  resave: true,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)



// 啟動並監聽
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})