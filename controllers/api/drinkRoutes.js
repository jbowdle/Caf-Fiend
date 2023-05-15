const router = require('express').Router();
const { Drink, User, Rating } = require('../../models');

// Get all drinks with related user and rating information
router.get('/', async (req, res) => {
  try {
    const drinkData = await Drink.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Rating,
          attributes: ['rating', 'review'],
        },
      ],
    });
    res.status(200).json(drinkData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new drink
router.post('/', async (req, res) => {
  try {
    const newDrink = await Drink.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newDrink);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;