// 載入種子資料
const restaurants = require('./restaurant.json')
const db = require('../../config/mongoose')
const Reataurant = require('../restaurant') // 載入 reataurant model
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

db.once('open', () => {

  const restaurantSeedData = restaurants.results
  const password = '12345678'
  const SEED_USER = [
    {
      name: 'user1',
      email: 'user1@example.com',
      password: password,
      restaurant: [0, 1, 2]
    },
    {
      name: 'user2',
      email: 'user2@example.com',
      password: password,
      restaurant: [3, 4, 5]
    }
  ]

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => Promise.all(Array.from(SEED_USER, seedUser =>
      User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
    ))
    .then(users => {
      return Promise.all(Array.from(users, (seedUser, i) =>
        Promise.all(Array.from(SEED_USER[i].restaurant, value =>
          Reataurant.create({
            name: restaurantSeedData[value].name,
            name_en: restaurantSeedData[value].name_en,
            category: restaurantSeedData[value].category,
            image: restaurantSeedData[value].image,
            location: restaurantSeedData[value].location,
            phone: restaurantSeedData[value].phone,
            google_map: restaurantSeedData[value].google_map,
            rating: restaurantSeedData[value].rating,
            description: restaurantSeedData[value].description,
            userId: seedUser._id
          })
        ))
      ))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})


