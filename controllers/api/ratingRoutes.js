const router = require('express').Router();
const { Rating, User, Drink } = require('../../models');

// Create a new rating
router.post('/', async (req, res) => {
  try {
    const newRating = await Rating.create({
      rating: req.body.rating,
      review: req.body.review,
      drink_id: req.body.drink_id,
      user_id: req.body.user_id,
    });
    res.status(200).json(newRating);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;