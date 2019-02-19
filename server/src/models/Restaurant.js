module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber:{
      type: DataTypes.STRING,
      unique: true
    }
  })

  Restaurant.associate = function (models) {
  }

  return Restaurant
}