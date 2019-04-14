const {Restaurant} = require('../models')

module.exports = {
  async insert (req, res) {
    try {
      const restaurant = await Restaurant.create(req.body)
      res.send(restaurant.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'Unspecified error.'
      })
    }
  },

  async index(req, res) {
    try {
      let restaurants = null
      restaurants = await Restaurant.findAll()
      res.send(restaurants)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the restaurants'
      })
    }
  },
}