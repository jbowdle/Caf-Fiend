const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
  // This render the homepage
  res.render('homepage');
});

router.get('/login', (req, res) => {
  // This render the login page
  res.render('login');
});

router.get('/signup', (req, res) => {
  // Render the signup page
  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
  // Render the user's dashboard, protected by authentication middleware
  const userData = await User.findOne({ where: { id: req.session.user_id } });
  res.render('dashboard', { user: userData });
});

module.exports = router;