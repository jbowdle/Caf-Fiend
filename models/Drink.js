const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Drink extends Model{}

Drink.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        beverage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bev_type: { // give them options for coffee, tea, energy drink, soda, or other? optional
            type: DataTypes.STRING,
            allowNull: false,
            // validate: { isBev() }
        }, 
        current_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'drink'
    }
);

module.exports = Drink;