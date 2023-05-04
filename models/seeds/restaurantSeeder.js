// 載入種子資料
const restaurants = require('./restaurant.json')
const db = require('../../config/mongoose')
const Reataurant = require('../restaurant') // 載入 reataurant model
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

db.once('open', () => {

  const restaurantSeedData = restaurants.results
  const SEED_USER = {
    name: 'root',
    email: 'root@example.com',
    password: '12345678'
  }

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user.id

      return Promise.all(Array.from({ length: 8 }, (v, i) =>
        Reataurant.create({
          name: restaurantSeedData[i].name,
          name_en: restaurantSeedData[i].name_en,
          category: restaurantSeedData[i].category,
          image: restaurantSeedData[i].image,
          location: restaurantSeedData[i].location,
          phone: restaurantSeedData[i].phone,
          google_map: restaurantSeedData[i].google_map,
          rating: restaurantSeedData[i].rating,
          description: restaurantSeedData[i].description,
          userId
        })
      ))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})


