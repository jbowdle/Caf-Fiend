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