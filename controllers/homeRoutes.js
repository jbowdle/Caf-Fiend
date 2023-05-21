const router = require('express').Router();
const { User, Drink, Rating} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbDrinkData = await Drink.findAll({});

        const drinkData = dbDrinkData.map((drink) => drink.get({ plain: true }));
        
        res.render('homepage', {
            drinks: drinkData,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        // debug
        console.log(err);

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

router.get('/dashboard/', withAuth, async (req, res) => {
  try {
    const userDrinkData = await User.findOne({
      where: { id: req.session.user_id },
      include: { all: true, nested: true }
    });

    const user = userDrinkData.get({ plain: true });

    user.drinks = user.drinks.map(drink => {
      drink.ratings = drink.ratings.filter(rating => rating.user_id === user.id);
      return drink;
    });

    res.render('user-dashboard', { user, logged_in: req.session.logged_in, user_id: req.session.user_id })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/drink/:id', async (req, res) => {
    try {
        const drinkData = await Drink.findOne({
            where: { id: req.params.id },
            include: {all: true, nested: true}
        });

        const drink = drinkData.get({ plain: true });

        // Not sure what this is used for, didn't need the code for rendering the 'drink' handlebars
        // drink.ratings = drink.comments || [];
        // if (Array.isArray(drink.ratings)) {
        //     for (let i = 0; i < drink.ratings.length; i++) {
        //         const ratingData = drink.ratings[i];
        //         const rating = await Rating.findOne({
        //             where: { id: ratingData.id },
        //             include: { model: User }
        //         });
        //         drink.ratings[i] = rating.get({ plain: true });
        //         drink.ratings[i].user.username = rating.user.username;
        //         drink.ratings[i].created_at_formatted = new Date(drink.rating[i].createdAt).toLocaleDateString;
        //     }
        // }

        console.log(drink);

        res.render('drink', { drink, logged_in: req.session.logged_in })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;