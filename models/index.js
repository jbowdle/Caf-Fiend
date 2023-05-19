const User = require('./User');
const Drink = require('./Drink');
const Rating = require('./Rating');

User.hasMany(Drink, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Drink.belongsTo(User, {
    foreignKey: 'user_id',
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

module.exports = { User, Drink, Rating};
