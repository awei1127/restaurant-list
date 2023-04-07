const express = require('express')
const app = express()
const restaurants = require('./restaurant.json')
const exphbs = require('express-handlebars')
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// 設定路由
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/restaurants/:id', (req, res) => {
  res.render('show')
})

app.get('/search', (req, res) => {
  res.render('index')
})

// 啟動並監聽
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})