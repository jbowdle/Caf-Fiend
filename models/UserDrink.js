const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserDrink extends Model {}

UserDrink.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    drink_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'drink',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_drink',
  }
);

module.exports = UserDrink;
