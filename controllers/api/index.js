const router = require('express').Router();
const userRoutes = require('./userRoutes');
const drinkRoutes = require('./drinkRoutes');
const ratingRoutes = require('./ratingRoutes');

router.use('/users', userRoutes);
router.use('/drinks', drinkRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;