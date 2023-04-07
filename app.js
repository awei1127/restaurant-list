const express = require('express')
const app = express()
const restaurants = require('./restaurant.json')
const exphbs = require('express-handlebars')
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

