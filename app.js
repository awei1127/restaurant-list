const express = require('express')
const app = express()
const restaurants = require('./restaurant.json')
const exphbs = require('express-handlebars')
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// 設定路由-首頁
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

// 設定路由-餐廳詳細頁
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => {
    return restaurant.id.toString() === req.params.id
  })
  res.render('show', { restaurant: restaurant })
})

// 設定路由-搜尋頁
app.get('/search', (req, res) => {
  const serchRestaurants = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: serchRestaurants, keyword: req.query.keyword })
})

// 啟動並監聽
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})