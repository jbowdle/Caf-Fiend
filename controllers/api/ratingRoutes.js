const router = require('express').Router();
const { Rating, User, Drink } = require('../../models');

// Create a new rating
router.post('/', async (req, res) => {
  try {
    const newRating = await Rating.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newRating);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;