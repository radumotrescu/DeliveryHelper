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
  }
}