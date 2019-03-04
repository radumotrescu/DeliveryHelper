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

  return Restaurant
}