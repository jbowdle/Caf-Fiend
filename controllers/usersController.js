const db = require('../models');

module.exports = {
  renderSignup: (req, res) => {
    res.render('signup');
  },

  renderLogin: (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/beverages');
      return;
    }
    res.render('login');
  },

  renderProfile: async (req, res) => {
    try {
      const userData = await db.User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });
      const user = userData.get({ plain: true });
      res.render('profile', { user });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};