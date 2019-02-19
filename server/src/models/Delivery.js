module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define('Delivery', {
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber:{
      type: DataTypes.STRING,
      unique: true
    }
  })

  Delivery.associate = function(models) 
  {
    Delivery.belongsTo(models.Restaurant)
  }
  return Delivery
}