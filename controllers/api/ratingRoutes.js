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

router.put('/:id', async (req, res) => {
  try {
    const rating = await Rating.findOne({ where: { id: req.params.id } });
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    rating.rating = req.body.rating;
    rating.review = req.body.review;
    await rating.save();
    res.status(200).json(rating);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const rating = await Rating.findOne({ where: { id: req.params.id } });
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    await rating.destroy();
    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;