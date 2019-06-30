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

  async update(req, res) {
    try {
      await Restaurant.update(req.body, {
        where: {
          id: req.params.restaurantId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error occurred when trying to update a restaurant'
      })
    }
  },

  async delete(req, res) {
    try {
      response = await Restaurant.destroy({ where: { id: req.params.restaurantId } })
      res.send({number : response.toString()})
    } catch (err) {
      res.status(500).send({ error: 'an error occured when trying to delete a restaurant' })
    }
  }
}