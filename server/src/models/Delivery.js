module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define('Delivery', {
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber:{
      type: DataTypes.STRING,
      unique: true
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