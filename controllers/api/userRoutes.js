const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  // Handle user login, authenticate and create session
});

router.post('/logout', (req, res) => {
  // Handle user logout, destroy session
});

router.put('/:id', async (req, res) => {
  // Update user information
});

router.delete('/:id', async (req, res) => {
  // Delete a user
});

module.exports = router;