const { DataTypes } = require('sequelize');
const sequelize = require('/Users/user/se-soucier-academy/config/db');

const Subscriber = sequelize.define('Subscriber', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Subscriber;
