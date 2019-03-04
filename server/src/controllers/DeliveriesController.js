const { Delivery, Restaurant } = require('../models')

module.exports = {
  async insert(req, res) {
    try {
      const delivery = await Delivery.create(req.body)
      res.send(delivery.toJSON())
    } catch (err) {
      res.status(400).send({
        error: 'Unspecified error.'
      })
    }
  },

  async show(req, res) {
    try {
      const delivery = await Delivery.findById(req.params.deliveryId)
      res.send(delivery)
    } catch (err) {
      res.status.send({
        error: "an errror ocurred when getting the delivery"
      })
    }
  },

  async index(req, res) {
    try {
      let deliveries = null
      deliveries = await Delivery.findAll({
        limit: 10,
        include:[ {model: Restaurant}]
      })
      res.send(deliveries)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch the deliveries'
      })
    }
  },

  async update(req, res) {
    try {
      await Delivery.update(req.body, {
        where: {
          id: req.params.deliveryId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error occurred when trying to update a delivery'
      })
    }
  }
}