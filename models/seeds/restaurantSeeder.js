const restaurants = require('./restaurant.json')

const mongoose = require('mongoose')
const Reataurant = require('../restaurant') // 載入 reataurant model
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')

  const restaurantSeedData = restaurants.results
  // 新增資料
  for (let i = 0; i < restaurantSeedData.length; i++) {
    Reataurant.create({
      name: restaurantSeedData[i].name,
      name_en: restaurantSeedData[i].name_en,
      category: restaurantSeedData[i].category,
      image: restaurantSeedData[i].image,
      location: restaurantSeedData[i].location,
      phone: restaurantSeedData[i].phone,
      google_map: restaurantSeedData[i].google_map,
      rating: restaurantSeedData[i].rating,
      description: restaurantSeedData[i].description
    })
  }
  console.log('done')
})


