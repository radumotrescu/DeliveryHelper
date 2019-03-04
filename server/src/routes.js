const AuthenticationController = require('./controllers/AuthenticationController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

const DeliveriesController = require('./controllers/DeliveriesController')
const RestaurantsController = require('./controllers/RestaurantsController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/delivery',
    DeliveriesController.insert)
  app.get('/delivery/:deliveryId',
    DeliveriesController.show)
  app.get('/delivery',
    DeliveriesController.index)
  app.put('/delivery/:deliveryId',
    DeliveriesController.update)

  app.post('/restaurant',
    RestaurantsController.insert)


}
