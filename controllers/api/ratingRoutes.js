const router = require('express').Router();
const { Rating, User, Drink } = require('../../models');

// Create a new rating
router.post('/', async (req, res) => {
  try {
    const existingRating = await Rating.findOne({
      where: { drink_id: req.body.drink_id, user_id: req.session.user_id }
    });

    console.log(req.session.user_id);

    console.log(existingRating);
    
    if (existingRating) {
      // allows user to update rating 
      await existingRating.update({
        rating: req.body.rating,
        review: req.body.review,
      });

      res.status(200).json(existingRating);
      // return res.status(409).json({ message: 'Rating already exists for this user and drink.' });
    } else {
      const newRating = await Rating.create({
        rating: req.body.rating,
        review: req.body.review,
        drink_id: req.body.drink_id,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newRating);
    }
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

router.delete('/delete/:id', async (req, res) => {
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