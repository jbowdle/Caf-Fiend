const router = require('express').Router();
const { Drink, User, Rating, UserDrink } = require('../../models');

// Get all drinks with related user and rating information
router.get('/', async (req, res) => {
  try {
    const drinkData = await Drink.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
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

// finds the average of all currently existing ratings for a drink and updates the current_rating column
router.put('/:id', async (req, res) => {
  try {
    const drinkId = req.params.id;

    const drinkToUpdate = await Drink.findByPk(drinkId, {
      include: [{ model: Rating }],
    });

    const currentRatings = drinkToUpdate.ratings.map(rating => {
      return rating.rating;
    });
    
    const newAvgRating = ((currentRatings.reduce((a, b) => a + b, 0))
    / (drinkToUpdate.ratings.length));
    drinkToUpdate.current_rating = newAvgRating;

    await drinkToUpdate.save();

    res.status(200).json({ message: 'Drink rating successfully updated!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedDrink = await Drink.destroy({
      where: { id: req.params.id }
    });
    if (deletedDrink === 0) {
      res.status(404).json({ message: 'No drink found with that id.'});
      return;
    }
    res.status(200).json({ message: 'Drink successfully destroyed, you monster!'});
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;