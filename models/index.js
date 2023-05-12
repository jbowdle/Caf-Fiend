const User = require('./User');
const Drink = require('./Drink');
const Rating = require('./Rating');
const UserDrink = require('./UserDrink');

User.hasMany(Drink, {
    through: UserDrink,
    foreignKey: 'user_id'
});

Drink.belongsToMany(User, {
    through: UserDrink,
    foreignKey: 'drink_id'
});

UserDrink.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

UserDrink.belongsTo(Drink, {
    foreignKey: 'drink_id',
    onDelete: 'CASCADE'
});

User.hasMany(Rating, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Rating.belongsTo(User, {
    foreignKey: 'user_id'
});

Drink.hasMany(Rating, {
    foreignKey: 'drink_id',
    onDelete: 'CASCADE'
});

Rating.belongsTo(Drink, {
    foreignKey: 'drink_id'
})

module.exports = { User, Drink, Rating, UserDrink };
