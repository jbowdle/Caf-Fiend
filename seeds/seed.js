const sequelize = require('../config/connection');
const { User, Drink, Rating} = require('../models');

const userData = require('./userData.json');
const drinkData = require('./drinkData.json');
const ratingData = require('./ratingData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Drink.bulkCreate(drinkData);
  await Rating.bulkCreate(ratingData);

  process.exit(0);
};

seedAll();