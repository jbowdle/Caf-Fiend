const router = require('express').Router();
const { User, Drink, Rating, UserDrink } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const drinkData = dbDrinkData.map((drink) => drink.get({ plain: true }));
        
        res.render('homepage', {
            drinks: drinkData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  router.get('/dashboard/:id', withAuth, async (req, res) => {
    try {
        const userDrinkData = await User.findOne({
            where: { id: req.params.id },
            include: [{ model: Drink }, { model: Rating }]
        });
        const user = userDrinkData.get({ plain: true });

        res.render('user-dashboard', { user, logged_in: req.session.logged_in, user_id: req.session.user_id })
    } catch (err) {
        res.status(500).json(err);
    }
  });

  router.get('/drink/:id', async (req, res) => {
    try {
        const drinkData = await Drink.findOne({
            where: { id: req.params.id },
            include: [{ model: User }, { model: Rating }]
        });

        const drink = drinkData.get({ plain: true });

        drink.ratings = drink.comments || [];
        if (Array.isArray(drink.ratings)) {
            for (let i = 0; i < drink.ratings.length; i++) {
                const ratingData = drink.ratings[i];
                const rating = await Rating.findOne({
                    where: { id: ratingData.id },
                    include: { model: User }
                });
                drink.ratings[i] = rating.get({ plain: true });
                drink.ratings[i].user.username = rating.user.username;
                drink.ratings[i].created_at_formatted = new Date(drink.rating[i].createdAt).toLocaleDateString;
            }
        }

        res.render('drink', { drink, logged_in: req.session.logged_in })
    } catch (err) {
        res.status(500).json(err);
    }
  });

  module.exports = router;