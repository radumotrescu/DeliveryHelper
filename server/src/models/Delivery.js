module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define('Delivery', {
    address: {
      type: DataTypes.STRING,
    },
    phoneNumber:{
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.SMALLINT
    }
  })

  Delivery.associate = function(models) 
  {
    Delivery.belongsTo(models.Restaurant)
  }
  return Delivery
}